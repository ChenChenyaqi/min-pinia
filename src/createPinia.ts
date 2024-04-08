import { effectScope, ref, markRaw } from "vue"
import { setActivePinia } from "./rootStore"
import { piniaSymbol } from "./rootStore"

export function createPinia() {
  const scope = effectScope(true)

  let _p: any[] = []
  let toBeInstalled: any[] = []
  const state = scope.run(() => ref<Record<string, any>>({}))

  const pinia = markRaw({
    _p,
    _a: null,
    _e: scope,
    _s: new Map<string, any>(),
    state,
    install(app) {
      setActivePinia(pinia)

      pinia._a = app
      app.provide(piniaSymbol, pinia)
      app.config.globalProperties.$pinia = pinia
      toBeInstalled.forEach((plugin) => _p.push(plugin))
      toBeInstalled = []
    },

    use(plugin) {
      if (!this._a) {
        toBeInstalled.push(plugin)
      } else {
        _p.push(plugin)
      }
      return this
    },
  })

  return pinia
}
