import { it, expect, describe } from "vitest"
import { createPinia } from "../src"
import { createApp } from "vue"
import { activePinia } from "../src/rootStore"

describe("happy path", () => {
  it("should create pinia", () => {
    const App = {
      render() {},
      setup() {
        return {}
      },
    }
    const pinia = createPinia()

    const app = createApp(App)
    const root = document.createElement("root")
    app.use(pinia).mount(root)
    expect(activePinia).toBe(pinia)
  })
})
