import { ref } from 'vue'
import { markRaw, type Component } from 'vue'

type OverlayOptions = {
  component: Component
}

interface OverlayInstance extends OverlayOptions {
  resolve: (value: unknown) => void
}
const overlay = ref<OverlayInstance | null>(null)

export default function useOverlay() {
  function open<T = unknown>(options: OverlayOptions): Promise<T | null> {
    return new Promise<T | null>((resolve) => {
      if (!overlay) {
        console.error('overlay is oppened, close first to use it')
        return null
      }

      overlay.value = {
        component: markRaw(options.component),
        resolve: resolve as (v: unknown) => void,
      }
    })
  }

  function close(value) {
    overlay.value.resolve(value)
    overlay.value = null
  }
  return { overlay, open, close }
}
