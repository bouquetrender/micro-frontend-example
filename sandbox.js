// 沙箱
const rawWindow = window

function exeCode(script, sandbox) {
  window.__POWER_BY_MICRO_CONTENT__ = sandbox.global;
  const _code = `;(function(window, self){
    with(window) {
      ${script}
    }
  }).call(window.__POWER_BY_MICRO_CONTENT__, window.__POWER_BY_MICRO_CONTENT__)`

  try {
    // hack 规避 with 严格模式
    (0, eval)(_code)

    sandbox.isRun = true
  } catch (e) {
    console.error(e)
  }
}

export function createSandBox() {
  const fakeWindow = {}

  const sandbox = {
    global: {}, // 沙盒全局对象，赋值给 window.__POWER_BY_MICRO_CONTENT__
    run,
    stop,
    isRun: false
  }

  function run(script) {
    // 访问fakeWindow属性，如果没用从window取
    // 设置fakeWindow属性
    sandbox.global = new Proxy(fakeWindow, {
      get(target, key) {
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key)
        }
        const rawValue = Reflect.get(rawWindow, key)

        // 处理在子应用上调用console alert等真window的方法
        if (typeof rawValue === 'function') {
          const valueStr = rawValue.toString()

          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(rawWindow)
          }
        }

        return rawValue
      },
      set(target, key, value) {
        target[key] = value
        return true
      }
    })
    exeCode(script, sandbox)
  }

  function stop() {
    sandbox.isRun = false
  }

  return sandbox
}