import { effectScope, isReactive, isRef, reactive, toRaw } from "vue"
import { setActivePinia, activePinia, Pinia } from "./rootStore"

function createSetupStore($id, setup, options, pinia: Pinia) {
  const initialState = pinia.state.value[$id]

  if (!initialState) {
    pinia.state.value[$id] = {}
  }

  const partialStore = {
    _p: pinia,
    $id,
  }
  const store = reactive(partialStore)

  const setupStore = pinia._e.run(() => setup())

  for (const key in setupStore) {
    const prop = setupStore[key]
    if (isRef(prop) || isReactive(prop)) {
      pinia.state.value[$id][key] = prop
    }
  }

  Object.assign(store, setupStore)
  Object.assign(toRaw(store), setupStore)

  pinia._s.set($id, store)
}

export function defineStore(idOrOptions: any, setup?: any, setupOptions?: any) {
  let id: string
  let options
  const isSetupStore = typeof setup === "function"
  if (typeof idOrOptions === "string") {
    id = idOrOptions
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }

  function useStore(pinia?: Pinia) {
    if (pinia) {
      setActivePinia(pinia)
    }
    pinia = activePinia!

    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia)
      } else {
        // createOptionsStore(id, options, pinia)
      }
    }

    const store = pinia._s.get(id)

    return store
  }

  useStore.$id = id

  return useStore
}
