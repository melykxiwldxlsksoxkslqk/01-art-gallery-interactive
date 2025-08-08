<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useArtworkStore } from '@/stores/artwork'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/common/AppHeader.vue'

const route = useRoute()
const artworkStore = useArtworkStore()
const cartStore = useCartStore()

const artwork = computed(() => {
  const id = route.params.id as string
  return artworkStore.getArtworkById(id)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price)
}

const addToCart = () => {
  if (artwork.value) {
    cartStore.addToCart(artwork.value)
  }
}
</script>

<template>
  <div class="artwork-detail">
    <AppHeader />
    
    <div v-if="artwork" class="artwork-detail-container">
      <div class="artwork-gallery">
        <div class="main-image">
          <img :src="artwork.image" :alt="artwork.title" class="artwork-image">
          <div class="image-actions">
            <button class="btn-secondary view-3d">View in 3D</button>
          </div>
        </div>
      </div>

      <div class="artwork-info">
        <div class="artwork-header">
          <h1>{{ artwork.title }}</h1>
          <router-link to="/artists" class="artist-link">{{ artwork.artist }}</router-link>
        </div>

        <div class="artwork-price">
          {{ formatPrice(artwork.price) }}
        </div>

        <div class="artwork-description">
          <p>{{ artwork.description }}</p>
        </div>

        <div class="artwork-specs">
          <h3>Specifications</h3>
          <div class="spec-grid">
            <div class="spec-item">
              <span class="spec-label">Material:</span>
              <span class="spec-value">{{ artwork.material }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Dimensions:</span>
              <span class="spec-value">{{ artwork.dimensions }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Year of Creation:</span>
              <span class="spec-value">{{ artwork.year }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Category:</span>
              <span class="spec-value">{{ artwork.category }}</span>
            </div>
          </div>
        </div>

        <div class="artwork-actions">
          <button class="btn-primary add-to-cart" @click="addToCart">
            Add to Cart
          </button>
          <button class="btn-secondary try-virtual">
            Try in Virtual Room
          </button>
        </div>

        <div class="artwork-features">
          <div class="feature">
            <span class="feature-icon">🚚</span>
            <span>Free Shipping</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🔒</span>
            <span>Authenticity Guarantee</span>
          </div>
          <div class="feature">
            <span class="feature-icon">↩️</span>
            <span>Return within 30 days</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Artwork not found</h2>
      <router-link to="/gallery" class="btn-primary">Return to Gallery</router-link>
    </div>
  </div>
</template>

<style scoped>
.artwork-detail {
  min-height: 100vh;
  padding-top: 80px;
}

.artwork-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.artwork-gallery {
  position: sticky;
  top: 100px;
}

.main-image {
  position: relative;
  background: var(--secondary-color);
  border-radius: 12px;
  overflow: hidden;
}

.artwork-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

.image-actions {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image:hover .image-actions {
  opacity: 1;
}

.artwork-info {
  padding: 1rem 0;
}

.artwork-header {
  margin-bottom: 1.5rem;
}

.artwork-header h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.artist-link {
  color: var(--accent-color);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.artist-link:hover {
  color: var(--text-primary);
}

.artwork-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 2rem;
}

.artwork-description {
  margin-bottom: 3rem;
}

.artwork-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  font-weight: 300;
}

.artwork-specs {
  margin-bottom: 3rem;
}

.artwork-specs h3 {
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.spec-grid {
  display: grid;
  gap: 1rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}

.spec-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.spec-value {
  color: var(--text-primary);
  font-weight: 400;
}

.artwork-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.add-to-cart {
  flex: 1;
  min-width: 200px;
}

.try-virtual {
  flex: 1;
  min-width: 200px;
}

.artwork-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: var(--secondary-color);
  border-radius: 12px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.feature-icon {
  font-size: 1.2rem;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.not-found h2 {
  font-size: 2rem;
  font-style: italic;
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .artwork-detail-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
  
  .artwork-gallery {
    position: static;
  }
  
  .artwork-actions {
    flex-direction: column;
  }
  
  .add-to-cart,
  .try-virtual {
    width: 100%;
  }
  
  .artwork-features {
    margin-top: 2rem;
  }
}
</style> 