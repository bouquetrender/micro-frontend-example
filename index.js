import { createApp } from './app.js'

// shared stitching layer 缝合层(基座) 用于链接子应用
export function createLayer() {
  const layer = {
    apps: [],
    registerMicroApps,
    start
  }

  // 注册子应用
  function registerMicroApps(options) {
    options.forEach(opt => {
      layer.apps.push(createApp(opt))
    })
  }

  function createContainer(container) {
    const el = document.querySelector(container)
    el.innerHTML = ''
    const newDiv = document.createElement('div')
    el.appendChild(newDiv)
    return newDiv
  }

  // 子应用挂载，拿到mount和unmount
  async function runMount(app) {
    if (app.isMount) return

    const { props, name, entry, container, sandbox } = app

    if (!app.mount) {
      const scripts = await Promise.all(
        entry.map(script => fetch(script).then(res => res.text()))
      )
      scripts.forEach(script => {
        // eval(script)
        sandbox.run(script)
      })
      
      app.mount = sandbox.global[name].mount
      app.unmount = sandbox.global[name].unmount
      
      // 拿到子应用的mount与unmount方法
      // const { mount, unmount } = window[name]
      // app.mount = mount
      // app.unmount = unmount
    }

    await app.mount({
      ...props,
      container: createContainer(container)
    })
    app.isMount = true
  }

  // 子应用卸载
  async function runUnMount(app) {
    if (!app.unmount) return

    await app.unmount({
      ...app.props,
      container: createContainer(app.container)
    })
    app.sandbox.stop()
    app.isMount = false
  }

  // 启动基座
  function start() {
    window.__POWER_BY_MICRO_APP__ = true

    layer.apps.sort(app => app.isActive()).forEach(async (app) => {
      const { isActive } = app
      if (!isActive()) {
        await runUnMount(app)
      } else {
        await runMount(app)
      }
    })
  }

  return layer
}





