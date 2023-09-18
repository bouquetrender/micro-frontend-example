import { createSandbox } from './sandbox'

// user options
// {
//   name: string // 子应用名称
//   entry: string[] // 入口文件
//   container: string // 容器
//   isActive: () => {} // 是否激活
// }

// 内部状态
// isMount: Boolean 是否挂在
// mount: () => {} 挂载
// unmonut: () => {} 卸载

export function createApp(options) {
  isValidateOptions(options)

  const { name, container, publicPath } = options

  const app = {
    ...options,
    isMount: false,
    // 每次调用都是新的作用域
    sandbox: createSandbox(),
    props: {
      name,
      container,
      publicPath
    }
  }

  return app
}

function isValidateOptions(options) {
  if (!options) throw new Error('[micro] options is required')
}