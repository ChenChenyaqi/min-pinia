import { EffectScope, Ref } from "vue"

export const piniaSymbol = Symbol("pinia")

export type Pinia = {
  _s: Map<string, any>
  _p: any[]
  _e: EffectScope
  _a: any
  state: Ref<Record<string, any>>
}
export let activePinia: Pinia | undefined

export function setActivePinia(pinia) {
  activePinia = pinia
}
