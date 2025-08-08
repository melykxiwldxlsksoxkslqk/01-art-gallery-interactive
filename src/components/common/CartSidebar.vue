<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price)
}

const totalFormatted = computed(() => formatPrice(cartStore.total))
</script>

<template>
  <div class="cart-sidebar" :class="{ 'open': cartStore.isOpen }">
    <div class="cart-overlay" @click="cartStore.toggleCart()"></div>
    
    <div class="cart-panel">
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button class="cart-close" @click="cartStore.toggleCart()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="cart-content">
        <div v-if="cartStore.items.length === 0" class="cart-empty">
          <div class="empty-icon">🛒</div>
          <h4>Your cart is empty</h4>
          <p>Add some beautiful artworks to get started</p>
        </div>
        
        <div v-else class="cart-items">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="cart-item"
          >
            <div class="item-image">
              <img :src="item.artwork.image" :alt="item.artwork.title">
            </div>
            
            <div class="item-details">
              <h4>{{ item.artwork.title }}</h4>
              <p>{{ item.artwork.artist }}</p>
              <div class="item-options">
                <span v-if="item.selectedFrame">Frame: {{ item.selectedFrame }}</span>
                <span v-if="item.selectedSize">Size: {{ item.selectedSize }}</span>
              </div>
            </div>
            
            <div class="item-actions">
              <div class="quantity-controls">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              
              <div class="item-price">
                {{ formatPrice(item.artwork.price * item.quantity) }}
              </div>
              
              <button class="remove-item" @click="cartStore.removeFromCart(item.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="cartStore.items.length > 0" class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span>Items ({{ cartStore.itemCount }})</span>
            <span>{{ totalFormatted }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>{{ totalFormatted }}</span>
          </div>
        </div>
        
        <div class="cart-actions">
          <button class="btn-secondary" @click="cartStore.clearCart()">
            Clear Cart
          </button>
          <button class="btn-primary">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-sidebar.open {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.cart-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  cursor: pointer;
}

.cart-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background: var(--background-card);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-sidebar.open .cart-panel {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--background-dark);
}

.cart-header h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.cart-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.cart-close:hover {
  color: var(--text-primary);
  background: var(--background-elevated);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-content::-webkit-scrollbar {
  width: 6px;
}

.cart-content::-webkit-scrollbar-track {
  background: var(--background-dark);
  border-radius: 3px;
}

.cart-content::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
}

.cart-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.cart-empty h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-dark);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.cart-item:hover {
  border-color: var(--accent-color);
  transform: translateY(-1px);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-details h4 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-details p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
}

.item-options {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.item-options span {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--background-elevated);
  border-radius: 8px;
  padding: 0.25rem;
}

.quantity-controls button {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.quantity-controls button:hover {
  background: var(--accent-color);
  color: var(--background-dark);
}

.quantity-controls span {
  min-width: 24px;
  text-align: center;
  font-weight: 500;
  color: var(--text-primary);
}

.item-price {
  font-weight: 600;
  color: var(--accent-color);
  font-size: 1rem;
}

.remove-item {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.remove-item:hover {
  color: #ff4757;
  background: rgba(255, 71, 87, 0.1);
}

.cart-footer {
  padding: 2rem;
  border-top: 1px solid var(--border-color);
  background: var(--background-dark);
}

.cart-summary {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: var(--text-secondary);
}

.summary-row.total {
  border-top: 1px solid var(--border-color);
  margin-top: 0.5rem;
  padding-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.summary-row.total span:last-child {
  color: var(--accent-color);
  font-size: 1.3rem;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.cart-actions .btn-secondary,
.cart-actions .btn-primary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .cart-panel {
    max-width: 100%;
    width: 100%;
  }
  
  .cart-header,
  .cart-footer {
    padding: 1.5rem;
  }
  
  .cart-header h3 {
    font-size: 1.3rem;
  }
  
  .cart-item {
    padding: 0.875rem;
    gap: 0.875rem;
  }
  
  .item-image {
    width: 70px;
    height: 70px;
  }
  
  .item-details h4 {
    font-size: 0.9rem;
  }
  
  .item-details p {
    font-size: 0.8rem;
  }
  
  .item-actions {
    gap: 0.375rem;
  }
  
  .quantity-controls {
    padding: 0.2rem;
    gap: 0.375rem;
  }
  
  .quantity-controls button {
    padding: 0.2rem;
  }
  
  .quantity-controls span {
    min-width: 20px;
    font-size: 0.9rem;
  }
  
  .item-price {
    font-size: 0.9rem;
  }
  
  .cart-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .cart-actions .btn-secondary,
  .cart-actions .btn-primary {
    padding: 0.875rem 1rem;
  }
}

@media (max-width: 480px) {
  .cart-header,
  .cart-footer {
    padding: 1rem;
  }
  
  .cart-header h3 {
    font-size: 1.2rem;
  }
  
  .cart-content {
    padding: 0.75rem;
  }
  
  .cart-item {
    padding: 0.75rem;
    gap: 0.75rem;
    flex-direction: column;
    align-items: stretch;
  }
  
  .item-image {
    width: 100%;
    height: 150px;
    align-self: stretch;
  }
  
  .item-details {
    text-align: center;
  }
  
  .item-details h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .item-details p {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
  
  .item-options {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
  
  .item-actions {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .quantity-controls {
    order: 2;
  }
  
  .item-price {
    order: 1;
    font-size: 1.1rem;
    font-weight: 700;
  }
  
  .remove-item {
    order: 3;
  }
  
  .cart-empty {
    padding: 2rem 1rem;
  }
  
  .empty-icon {
    font-size: 3rem;
  }
  
  .cart-empty h4 {
    font-size: 1.2rem;
  }
  
  .cart-empty p {
    font-size: 0.9rem;
  }
  
  .summary-row {
    padding: 0.375rem 0;
  }
  
  .summary-row.total {
    padding-top: 0.75rem;
    font-size: 1rem;
  }
  
  .summary-row.total span:last-child {
    font-size: 1.2rem;
  }
}

@media (max-width: 360px) {
  .cart-header,
  .cart-footer {
    padding: 0.75rem;
  }
  
  .cart-content {
    padding: 0.5rem;
  }
  
  .cart-item {
    padding: 0.5rem;
  }
  
  .item-image {
    height: 120px;
  }
  
  .item-details h4 {
    font-size: 0.9rem;
  }
  
  .item-details p {
    font-size: 0.8rem;
  }
  
  .quantity-controls {
    gap: 0.25rem;
    padding: 0.15rem;
  }
  
  .quantity-controls span {
    min-width: 18px;
    font-size: 0.8rem;
  }
  
  .item-price {
    font-size: 1rem;
  }
  
  .cart-actions .btn-secondary,
  .cart-actions .btn-primary {
    padding: 0.75rem 0.875rem;
    font-size: 0.9rem;
  }
}
</style> 