import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Artwork } from './artwork'

export interface CartItem {
  id: string
  artwork: Artwork
  quantity: number
  selectedFrame?: string
  selectedSize?: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.artwork.price * item.quantity), 0)
  )

  const itemCount = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  function addToCart(artwork: Artwork, options: { frame?: string; size?: string } = {}) {
    const existingItem = items.value.find(item => 
      item.artwork.id === artwork.id &&
      item.selectedFrame === options.frame &&
      item.selectedSize === options.size
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        id: `${artwork.id}-${Date.now()}`,
        artwork,
        quantity: 1,
        selectedFrame: options.frame,
        selectedSize: options.size
      })
    }
  }

  function removeFromCart(itemId: string) {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items,
    isOpen,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }
}) 