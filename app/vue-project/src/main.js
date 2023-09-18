import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let instance = null

function render(props = {}) {
  const { container, publicPath } = props

  // webpack hack 设置子应用publicPath避免主应用无法访问访问子应用路由页面
  // eslint-disable-next-line
  __webpack_public_path__ = publicPath

  instance = createApp(App).use(router)
  instance.mount(container || '#app')
}

if (!window.__POWER_BY_MICRO_APP__) {
  render()
}

// export的方法会到window全局
// 主应用通过window调用子应用mount传值
export function mount(props) {
  render(props)
  console.log('[vue app] mount')
}

export function unmount() {
  if (instance) {
    instance.unmount();
    instance = null;
    console.log('[vue app] unmount')
  }
}
