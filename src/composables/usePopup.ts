import { shallowReactive, markRaw, type Component } from 'vue'

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface PopupOptions {
  component: Component
  props?: Record<string, unknown>
  anchor: HTMLElement
  placement?: Placement
  closable?: boolean
}

interface PopupInstance extends PopupOptions {
  id: number
  resolve: (value: unknown) => void
}

const popups = shallowReactive<PopupInstance[]>([])
let uid = 0

function open<T = unknown>(options: PopupOptions): Promise<T | null> {
  return new Promise<T | null>((resolve) => {
    popups.push({
      ...options,
      component: markRaw(options.component),
      closable: options.closable ?? true,
      id: ++uid,
      resolve: resolve as (v: unknown) => void,
    })
  })
}

function close(id: number, value: unknown = null) {
  const i = popups.findIndex((p) => p.id === id)

  popups[i].resolve(value)
  popups.splice(i, 1)
}

export function usePopup() {
  return { popups, open, close }
}
