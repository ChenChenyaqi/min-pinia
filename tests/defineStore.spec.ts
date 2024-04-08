import { it, expect, describe, beforeEach } from "vitest"
import { defineStore } from "../src/store"
import { ref } from "vue"
import { setActivePinia } from "../src/rootStore"
import { createPinia } from "../src/createPinia"

describe("defineStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it("should create useStore successful", () => {
    const useCountStore = defineStore("count", () => {
      const count = ref(1)
      function addCount() {
        count.value++
      }

      return {
        count,
        addCount,
      }
    })

    expect(useCountStore.$id).toBe("count")
  })

  it("should return state when call useStore", () => {
    const useCountStore = defineStore("count", () => {
      const count = ref(1)

      function addCount() {
        count.value++
      }
      return {
        count,
        addCount,
      }
    })

    const countStore = useCountStore()
    const { count, addCount } = countStore
    expect(count).toBe(1)
    addCount()
    expect(count).toBe(1)
    expect(countStore.count).toBe(2)
  })
})
