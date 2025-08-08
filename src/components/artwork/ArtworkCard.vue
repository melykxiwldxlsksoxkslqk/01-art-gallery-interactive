<script setup lang="ts">
import type { Artwork } from '@/stores/artwork'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

interface Props {
  artwork: Artwork
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const imageError = ref(false)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price)
}

const addToCart = () => {
  cartStore.addToCart(props.artwork)
}

const handleImageError = () => {
  imageError.value = true
}

// Fallback image URL
const fallbackImage = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop'
</script>

<template>
  <div class="artwork-card card-premium">
    <div class="artwork-image-container">
      <div class="image-wrapper">
        <img 
          :src="imageError ? fallbackImage : artwork.image" 
          :alt="artwork.title"
          class="artwork-image"
          loading="lazy"
          @error="handleImageError"
        >
        <div class="image-gradient"></div>
        <div class="artwork-category-badge">{{ artwork.category }}</div>
        <div class="artwork-year-badge">{{ artwork.year }}</div>
      </div>
      
      <div class="artwork-overlay">
        <div class="overlay-content">
          <button class="btn-primary quick-add" @click="addToCart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
          <router-link 
            :to="`/artwork/${artwork.id}`" 
            class="btn-secondary view-details"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View Details
          </router-link>
        </div>
      </div>
      
      <div class="artwork-glow"></div>
    </div>
    
    <div class="artwork-info">
      <div class="artwork-header">
        <h3 class="artwork-title">{{ artwork.title }}</h3>
        <div class="artwork-price">{{ formatPrice(artwork.price) }}</div>
      </div>
      
      <p class="artwork-artist">by {{ artwork.artist }}</p>
      
      <div class="artwork-details">
        <div class="detail-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
          <span>{{ artwork.material }}</span>
        </div>
        <div class="detail-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          <span>{{ artwork.dimensions }}</span>
        </div>
      </div>
      
      <div class="artwork-description">
        {{ artwork.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.artwork-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: var(--background-card);
  border: 1px solid var(--border-color);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-gold);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.artwork-card:hover::before {
  opacity: 1;
}

.artwork-card:hover {
  transform: translateY(-12px) scale(1.02);
  border-color: var(--accent-color);
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(212, 175, 55, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.artwork-image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--background-dark);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.artwork-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0;
}

.artwork-card:hover .artwork-image {
  transform: scale(1.08);
  filter: brightness(1.1) contrast(1.05);
}

.image-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
    180deg, 
    transparent 0%, 
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.artwork-card:hover .image-gradient {
  opacity: 1;
}

.artwork-category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: var(--accent-color);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.artwork-year-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.artwork-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card:hover .artwork-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card:hover .overlay-content {
  transform: translateY(0);
}

.quick-add {
  padding: 0.8rem 1.8rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  justify-content: center;
}

.view-details {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-primary);
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.view-details::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--text-primary);
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.view-details:hover::before {
  left: 0;
}

.view-details:hover {
  color: var(--background-dark);
  transform: translateY(-2px);
}

.artwork-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.artwork-card:hover .artwork-glow {
  opacity: 0.03;
}

.artwork-info {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--background-card);
}

.artwork-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.artwork-title {
  font-size: 1.4rem;
  margin: 0;
  font-style: italic;
  line-height: 1.3;
  color: var(--text-primary);
  flex: 1;
  font-weight: 600;
}

.artwork-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent-color);
  font-family: var(--font-serif);
  font-style: italic;
  white-space: nowrap;
}

.artwork-artist {
  color: var(--text-secondary);
  margin: 0;
  font-weight: 400;
  font-size: 1rem;
  font-style: italic;
}

.artwork-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.detail-item svg {
  color: var(--accent-color);
  opacity: 0.7;
}

.artwork-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  font-weight: 300;
  margin-top: auto;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .artwork-card {
    margin: 0;
  }
  
  .artwork-card:hover {
    transform: translateY(-4px) scale(1.01);
  }
  
  .artwork-overlay {
    opacity: 0;
    display: none;
  }
  
  .artwork-info {
    padding: 1.5rem;
  }
  
  .artwork-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .artwork-title {
    font-size: 1.2rem;
  }
  
  .artwork-price {
    font-size: 1.1rem;
  }
  
  .artwork-artist {
    font-size: 0.9rem;
  }
  
  .artwork-details {
    gap: 0.375rem;
  }
  
  .detail-item {
    font-size: 0.8rem;
  }
  
  .artwork-description {
    font-size: 0.8rem;
    -webkit-line-clamp: 3;
  }
  
  .quick-add,
  .view-details {
    padding: 0.7rem 1.5rem;
    font-size: 0.8rem;
    min-width: 120px;
  }
  
  .artwork-category-badge,
  .artwork-year-badge {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .artwork-card:hover {
    transform: translateY(-2px);
  }
  
  .artwork-image-container {
    aspect-ratio: 1/1;
  }
  
  .artwork-info {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .artwork-header {
    gap: 0.375rem;
  }
  
  .artwork-title {
    font-size: 1.1rem;
    line-height: 1.2;
  }
  
  .artwork-price {
    font-size: 1rem;
  }
  
  .artwork-artist {
    font-size: 0.85rem;
  }
  
  .artwork-details {
    gap: 0.25rem;
  }
  
  .detail-item {
    font-size: 0.75rem;
  }
  
  .detail-item svg {
    width: 12px;
    height: 12px;
  }
  
  .artwork-description {
    font-size: 0.75rem;
    line-height: 1.4;
    -webkit-line-clamp: 2;
  }
  
  .artwork-category-badge {
    top: 0.75rem;
    left: 0.75rem;
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
  }
  
  .artwork-year-badge {
    top: 0.75rem;
    right: 0.75rem;
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
  }
}

@media (max-width: 360px) {
  .artwork-info {
    padding: 0.875rem;
    gap: 0.625rem;
  }
  
  .artwork-title {
    font-size: 1rem;
  }
  
  .artwork-price {
    font-size: 0.95rem;
  }
  
  .artwork-artist {
    font-size: 0.8rem;
  }
  
  .detail-item {
    font-size: 0.7rem;
  }
  
  .detail-item svg {
    width: 10px;
    height: 10px;
  }
  
  .artwork-description {
    font-size: 0.7rem;
  }
  
  .artwork-category-badge,
  .artwork-year-badge {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
  }
}
</style> 