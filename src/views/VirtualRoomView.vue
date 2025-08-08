<script setup lang="ts">
import { ref, computed } from 'vue'
import { useArtworkStore } from '@/stores/artwork'
import AppHeader from '@/components/common/AppHeader.vue'

const artworkStore = useArtworkStore()
const selectedRoom = ref('living-room')
const selectedLighting = ref(75)
const selectedSize = ref('medium')
const selectedArtwork = ref<string | null>(null)
const isPlaced = ref(false)

const roomTypes = [
  { 
    value: 'living-room', 
    label: 'Living Room', 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format&q=80',
    fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjM0EzQTNBIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmaWxsPSIjOUE5QTlBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0Ij5MaXZpbmcgUm9vbTwvdGV4dD4KPC9zdmc+',
    description: 'Modern living room with yellow chair'
  },
  { 
    value: 'bedroom', 
    label: 'Bedroom', 
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&auto=format&q=80',
    fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNEE0QTRBIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmaWxsPSIjOUE5QTlBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0Ij5CZWRyb29tPC90ZXh0Pgo8L3N2Zz4=',
    description: 'Cozy bedroom interior'
  },
  { 
    value: 'office', 
    label: 'Home Office', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format&q=80',
    fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNTA1MDUwIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmaWxsPSIjOUE5QTlBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0Ij5Ib21lIE9mZmljZTwvdGV4dD4KPC9zdmc+',
    description: 'Professional home office'
  },
  { 
    value: 'kitchen', 
    label: 'Kitchen', 
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format&q=80',
    fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjA2MDYwIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmaWxsPSIjOUE5QTlBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0Ij5LaXRjaGVuPC90ZXh0Pgo8L3N2Zz4=',
    description: 'Modern kitchen space'
  }
]

const currentRoom = computed(() => {
  return roomTypes.find(room => room.value === selectedRoom.value)
})

const selectedArtworkData = computed(() => {
  if (!selectedArtwork.value) return null
  return artworkStore.getArtworkById(selectedArtwork.value)
})

// Вычисляем правильную прозрачность для overlay (инвертируем логику)
const lightingOverlay = computed(() => {
  // Чем больше света (selectedLighting), тем меньше темного overlay
  return (100 - selectedLighting.value) / 100
})

const selectArtwork = (artworkId: string) => {
  selectedArtwork.value = artworkId
  isPlaced.value = false
}

const placeArtwork = () => {
  if (selectedArtwork.value) {
    isPlaced.value = true
  }
}

const removeArtwork = () => {
  isPlaced.value = false
  selectedArtwork.value = null
}

// Функция для обработки ошибок загрузки изображений
const handleRoomImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const room = roomTypes.find(r => r.image === img.src)
  if (room && room.fallback) {
    img.src = room.fallback
  }
}

const handleArtworkImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Простой fallback для произведений искусства
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMkEyQTJBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZpbGw9IiNENEFGMzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiPkFydHdvcms8L3RleHQ+Cjwvc3ZnPg=='
}
</script>

<template>
  <div class="virtual-room">
    <AppHeader />
    
    <div class="virtual-room-container">
      <div class="virtual-room-header fade-in-up">
        <h1 class="text-shimmer">Virtual Room Experience</h1>
        <p>Try artworks in your space before you buy</p>
        <div class="header-accent"></div>
      </div>

      <div class="room-experience">
        <!-- Main 3D Room Preview -->
        <div class="room-preview-section fade-in-up">
          <div class="room-canvas">
            <div class="room-background">
              <img 
                :src="currentRoom?.image" 
                :alt="currentRoom?.description"
                class="room-image"
                @error="handleRoomImageError"
              >
              <div class="room-overlay" :style="{ opacity: lightingOverlay }"></div>
              
              <!-- Placed Artwork -->
              <div 
                v-if="isPlaced && selectedArtworkData" 
                class="placed-artwork"
                :class="{ 'animate-placement': isPlaced }"
              >
                <div class="artwork-frame-3d">
                  <img 
                    :src="selectedArtworkData.image" 
                    :alt="selectedArtworkData.title"
                    class="artwork-in-room"
                    @error="handleArtworkImageError"
                  >
                  <div class="artwork-info-overlay">
                    <h4>{{ selectedArtworkData.title }}</h4>
                    <p>{{ selectedArtworkData.artist }}</p>
                  </div>
                </div>
                <button class="remove-artwork-btn" @click="removeArtwork">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <!-- Room Features -->
              <div class="room-features">
                <div class="feature-point" style="top: 20%; left: 15%;">
                  <div class="point-indicator"></div>
                  <div class="point-tooltip">Perfect lighting for art viewing</div>
                </div>
                <div class="feature-point" style="top: 60%; right: 20%;">
                  <div class="point-indicator"></div>
                  <div class="point-tooltip">Optimal viewing distance</div>
                </div>
              </div>

              <!-- Lighting Indicator -->
              <div class="lighting-indicator">
                <div class="lighting-icon">💡</div>
                <span>{{ selectedLighting }}% Light</span>
              </div>
            </div>

            <!-- Room Controls Overlay -->
            <div class="room-controls-overlay">
              <div class="control-item">
                <label>Room:</label>
                <select v-model="selectedRoom" class="control-select">
                  <option v-for="room in roomTypes" :key="room.value" :value="room.value">
                    {{ room.label }}
                  </option>
                </select>
              </div>
              
              <div class="control-item">
                <label>Lighting:</label>
                <input 
                  v-model="selectedLighting" 
                  type="range" 
                  min="20" 
                  max="100" 
                  class="control-slider"
                >
                <span class="slider-value">{{ selectedLighting }}%</span>
              </div>
              
              <div class="control-item">
                <label>Size:</label>
                <select v-model="selectedSize" class="control-select">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="room-actions">
            <button 
              v-if="selectedArtwork && !isPlaced" 
              class="btn-primary place-artwork"
              @click="placeArtwork"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              Place in Room
            </button>
            
            <button class="btn-secondary save-view">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17,21 17,13 7,13 7,21"></polyline>
                <polyline points="7,3 7,8 15,8"></polyline>
              </svg>
              Save View
            </button>
          </div>
        </div>

        <!-- Artwork Selection Panel -->
        <div class="artwork-selection-panel fade-in-up" style="animation-delay: 0.2s">
          <h3>Choose Artwork</h3>
          <div class="artwork-grid">
            <div 
              v-for="artwork in artworkStore.artworks" 
              :key="artwork.id"
              class="artwork-option"
              :class="{ 'selected': selectedArtwork === artwork.id }"
              @click="selectArtwork(artwork.id)"
            >
              <div class="artwork-thumbnail">
                <img 
                  :src="artwork.image" 
                  :alt="artwork.title"
                  @error="handleArtworkImageError"
                >
                <div class="selection-indicator">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
              </div>
              <div class="artwork-details">
                <h4>{{ artwork.title }}</h4>
                <p>{{ artwork.artist }}</p>
                <span class="artwork-size">{{ artwork.dimensions }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-showcase fade-in-up" style="animation-delay: 0.4s">
        <h3>Virtual Room Features</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🏠</div>
            <h4>Multiple Room Types</h4>
            <p>Try your artwork in living rooms, bedrooms, offices, and more</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h4>Realistic Lighting</h4>
            <p>Adjust lighting conditions to see how your art looks at different times</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📐</div>
            <h4>Size Visualization</h4>
            <p>See exactly how the artwork will fit in your space</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h4>Easy Placement</h4>
            <p>Drag and drop artworks to find the perfect spot</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-room {
  min-height: 100vh;
  padding-top: 80px;
  background: radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
}

.virtual-room-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

.virtual-room-header {
  text-align: center;
  margin-bottom: 3rem;
}

.virtual-room-header h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  font-style: italic;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.virtual-room-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 300;
  margin-bottom: 2rem;
}

.header-accent {
  width: 80px;
  height: 2px;
  background: var(--gradient-gold);
  margin: 0 auto;
  border-radius: 2px;
}

.room-experience {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.room-preview-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.room-canvas {
  position: relative;
  background: var(--background-card);
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 16/10;
  border: 2px solid var(--border-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.room-background {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.6s ease;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: all 0.3s ease;
}

.room-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.placed-artwork {
  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.placed-artwork.animate-placement {
  animation: placeArtwork 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes placeArtwork {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5) rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotateY(0deg);
  }
}

.artwork-frame-3d {
  position: relative;
  background: var(--background-card);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(212, 175, 55, 0.2);
  border: 3px solid var(--accent-color);
  transform: perspective(1000px) rotateY(-5deg);
}

.artwork-in-room {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.artwork-info-overlay {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
  z-index: 20;
}

.artwork-info-overlay h4 {
  margin: 0 0 0.2rem 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.artwork-info-overlay p {
  margin: 0;
  color: var(--text-secondary);
}

.remove-artwork-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--accent-color);
  color: var(--background-dark);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 30;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.remove-artwork-btn:hover {
  background: #ff4757;
  transform: scale(1.1);
}

.room-features {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.feature-point {
  position: absolute;
  pointer-events: all;
}

.point-indicator {
  width: 12px;
  height: 12px;
  background: var(--accent-color);
  border-radius: 50%;
  cursor: pointer;
  animation: pulse-point 2s infinite;
  position: relative;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

@keyframes pulse-point {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.point-tooltip {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 100;
}

.feature-point:hover .point-tooltip {
  opacity: 1;
}

.lighting-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  z-index: 15;
  transition: all 0.3s ease;
}

.lighting-icon {
  font-size: 1.2rem;
  filter: brightness(var(--lighting-brightness, 1));
}

.lighting-indicator span {
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 500;
}

.room-controls-overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.85);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  z-index: 20;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 220px;
}

.control-item label {
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 70px;
  color: var(--text-primary);
}

.control-select {
  flex: 1;
  padding: 0.5rem;
  background: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.control-select:focus {
  border-color: var(--accent-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.control-slider {
  flex: 1;
  -webkit-appearance: none;
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  outline: none;
  transition: all 0.3s ease;
}

.control-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: var(--accent-color);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.control-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
}

.slider-value {
  font-size: 0.8rem;
  color: var(--accent-color);
  min-width: 40px;
  text-align: center;
  font-weight: 600;
}

.room-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.place-artwork {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.place-artwork:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

.save-view {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.artwork-selection-panel {
  background: var(--background-card);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid var(--border-color);
  max-height: 600px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.artwork-selection-panel::-webkit-scrollbar {
  width: 6px;
}

.artwork-selection-panel::-webkit-scrollbar-track {
  background: var(--background-dark);
  border-radius: 3px;
}

.artwork-selection-panel::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
}

.artwork-selection-panel h3 {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: var(--accent-color);
  font-weight: 400;
}

.artwork-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.artwork-option {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--background-dark);
}

.artwork-option:hover {
  border-color: var(--border-color);
  background: var(--background-elevated);
  transform: translateY(-1px);
}

.artwork-option.selected {
  border-color: var(--accent-color);
  background: var(--accent-light);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
}

.artwork-thumbnail {
  position: relative;
  flex-shrink: 0;
}

.artwork-thumbnail img {
  width: 70px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.artwork-option:hover .artwork-thumbnail img {
  transform: scale(1.05);
}

.selection-indicator {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--accent-color);
  color: var(--background-dark);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.artwork-option.selected .selection-indicator {
  opacity: 1;
  transform: scale(1);
}

.artwork-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.artwork-details h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.artwork-details p {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.artwork-size {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 400;
}

.features-showcase {
  margin-top: 4rem;
}

.features-showcase h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--accent-color);
  font-weight: 300;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--background-card);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h4 {
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 500;
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .room-experience {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .artwork-selection-panel {
    max-height: 400px;
  }
  
  .room-controls-overlay {
    position: relative;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .virtual-room {
    padding-top: 70px;
  }
  
  .virtual-room-container {
    padding: 1rem;
  }
  
  .virtual-room-header {
    margin-bottom: 2rem;
  }
  
  .virtual-room-header h1 {
    font-size: 2.5rem;
  }
  
  .virtual-room-header p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .room-experience {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .room-canvas {
    aspect-ratio: 4/3;
  }
  
  .room-controls-overlay {
    position: static;
    margin-top: 1rem;
    background: var(--background-card);
    border-radius: 16px;
    padding: 1.25rem;
    backdrop-filter: none;
  }
  
  .control-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .control-item label {
    min-width: auto;
    font-size: 0.85rem;
  }
  
  .control-select {
    width: 100%;
  }
  
  .control-slider {
    width: 100%;
  }
  
  .room-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .room-actions button {
    width: 100%;
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .placed-artwork {
    top: 50%;
    left: 50%;
  }
  
  .artwork-in-room {
    width: 120px;
    height: 90px;
  }
  
  .artwork-selection-panel {
    max-height: 350px;
    padding: 1.5rem;
  }
  
  .artwork-option {
    padding: 0.875rem;
  }
  
  .artwork-thumbnail img {
    width: 60px;
    height: 75px;
  }
  
  .lighting-indicator {
    top: 5px;
    right: 5px;
    padding: 0.3rem 0.8rem;
  }
  
  .lighting-indicator span {
    font-size: 0.75rem;
  }
  
  .features-showcase {
    margin-top: 2rem;
  }
  
  .features-showcase h3 {
    font-size: 1.8rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .feature-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .virtual-room {
    padding-top: 60px;
  }
  
  .virtual-room-container {
    padding: 0.75rem;
  }
  
  .virtual-room-header {
    margin-bottom: 1.5rem;
  }
  
  .virtual-room-header h1 {
    font-size: 2rem;
  }
  
  .virtual-room-header p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .header-accent {
    width: 60px;
  }
  
  .room-experience {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .room-canvas {
    aspect-ratio: 3/4;
    border-radius: 16px;
  }
  
  .room-controls-overlay {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .control-item {
    gap: 0.375rem;
  }
  
  .control-item label {
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .control-select {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
  
  .slider-value {
    font-size: 0.75rem;
  }
  
  .room-actions {
    gap: 0.5rem;
  }
  
  .room-actions button {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
  
  .placed-artwork {
    top: 45%;
    left: 50%;
  }
  
  .artwork-in-room {
    width: 100px;
    height: 75px;
  }
  
  .artwork-frame-3d {
    padding: 0.75rem;
  }
  
  .artwork-info-overlay {
    bottom: -35px;
    padding: 0.375rem;
    font-size: 0.7rem;
  }
  
  .artwork-info-overlay h4 {
    font-size: 0.8rem;
  }
  
  .remove-artwork-btn {
    width: 24px;
    height: 24px;
    top: -8px;
    right: -8px;
  }
  
  .lighting-indicator {
    padding: 0.25rem 0.6rem;
  }
  
  .lighting-icon {
    font-size: 1rem;
  }
  
  .lighting-indicator span {
    font-size: 0.7rem;
  }
  
  .artwork-selection-panel {
    max-height: 300px;
    padding: 1rem;
  }
  
  .artwork-selection-panel h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .artwork-option {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .artwork-thumbnail img {
    width: 50px;
    height: 65px;
  }
  
  .artwork-details h4 {
    font-size: 0.85rem;
  }
  
  .artwork-details p {
    font-size: 0.75rem;
  }
  
  .artwork-size {
    font-size: 0.65rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .features-showcase h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .feature-card {
    padding: 1.25rem;
  }
  
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  .feature-card h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .feature-card p {
    font-size: 0.85rem;
    line-height: 1.5;
  }
}

@media (max-width: 360px) {
  .virtual-room-container {
    padding: 0.5rem;
  }
  
  .virtual-room-header h1 {
    font-size: 1.75rem;
  }
  
  .room-canvas {
    aspect-ratio: 1/1;
    border-radius: 12px;
  }
  
  .room-controls-overlay {
    padding: 0.75rem;
  }
  
  .control-select {
    padding: 0.625rem;
  }
  
  .room-actions button {
    padding: 0.75rem 0.875rem;
    font-size: 0.85rem;
  }
  
  .placed-artwork {
    top: 40%;
  }
  
  .artwork-in-room {
    width: 80px;
    height: 60px;
  }
  
  .artwork-selection-panel {
    padding: 0.75rem;
  }
  
  .artwork-option {
    padding: 0.625rem;
  }
  
  .artwork-thumbnail img {
    width: 45px;
    height: 55px;
  }
  
  .feature-card {
    padding: 1rem;
  }
  
  .feature-card h4 {
    font-size: 0.95rem;
  }
  
  .feature-card p {
    font-size: 0.8rem;
  }
}

/* Анимации появления */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Shimmer эффект для заголовка */
.text-shimmer {
  background: linear-gradient(135deg, var(--text-primary), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style> 