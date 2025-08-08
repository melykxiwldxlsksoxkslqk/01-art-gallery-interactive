<script setup lang="ts">
import { ref, computed } from 'vue'
import { useArtworkStore } from '@/stores/artwork'
import AppHeader from '@/components/common/AppHeader.vue'
import ArtworkCard from '@/components/artwork/ArtworkCard.vue'
import type { Artwork } from '@/stores/artwork'

const artworkStore = useArtworkStore()
const sortBy = ref('newest')

// Состояния для выпадающих списков
const categoryDropdownOpen = ref(false)
const sortDropdownOpen = ref(false)

const sortOptions = [
  { value: 'newest', label: 'Newest First', icon: '🆕' },
  { value: 'price-low', label: 'Price: Low to High', icon: '💰' },
  { value: 'price-high', label: 'Price: High to Low', icon: '💎' },
  { value: 'name', label: 'Alphabetical', icon: '🔤' }
]

const categoryOptions = computed(() => [
  { value: 'all', label: 'All Categories', icon: '🎨', count: artworkStore.artworks.length },
  { value: 'abstract', label: 'Abstract Art', icon: '🌀', count: artworkStore.artworks.filter((a: Artwork) => a.category.toLowerCase() === 'abstract').length },
  { value: 'portrait', label: 'Portraits', icon: '👤', count: artworkStore.artworks.filter((a: Artwork) => a.category.toLowerCase() === 'portrait').length },
  { value: 'landscape', label: 'Landscapes', icon: '🏞️', count: artworkStore.artworks.filter((a: Artwork) => a.category.toLowerCase() === 'landscape').length }
])

const selectedCategoryOption = computed(() => {
  return categoryOptions.value.find(option => option.value === artworkStore.selectedCategory) || categoryOptions.value[0]
})

const selectedSortOption = computed(() => {
  return sortOptions.find(option => option.value === sortBy.value) || sortOptions[0]
})

// Функции для управления выпадающими списками
const toggleCategoryDropdown = () => {
  categoryDropdownOpen.value = !categoryDropdownOpen.value
  if (categoryDropdownOpen.value) {
    sortDropdownOpen.value = false
  }
}

const toggleSortDropdown = () => {
  sortDropdownOpen.value = !sortDropdownOpen.value
  if (sortDropdownOpen.value) {
    categoryDropdownOpen.value = false
  }
}

const selectCategory = (value: string) => {
  artworkStore.selectedCategory = value
  categoryDropdownOpen.value = false
}

const selectSort = (value: string) => {
  sortBy.value = value
  sortDropdownOpen.value = false
}

// Закрытие при клике вне
const closeDropdowns = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.custom-dropdown')) {
    categoryDropdownOpen.value = false
    sortDropdownOpen.value = false
  }
}

// Добавляем обработчик события
document.addEventListener('click', closeDropdowns)

// Сортировка произведений
const sortedArtworks = computed(() => {
  let sorted = [...artworkStore.filteredArtworks]
  
  switch (sortBy.value) {
    case 'price-low':
      return sorted.sort((a: Artwork, b: Artwork) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a: Artwork, b: Artwork) => b.price - a.price)
    case 'name':
      return sorted.sort((a: Artwork, b: Artwork) => a.title.localeCompare(b.title))
    case 'newest':
    default:
      return sorted.sort((a: Artwork, b: Artwork) => parseInt(b.year) - parseInt(a.year))
  }
})
</script>

<template>
  <div class="gallery">
    <AppHeader />
    
    <div class="gallery-container">
      <div class="gallery-header fade-in-up">
        <h1 class="text-shimmer">Curated Collection</h1>
        <p>Discover exceptional artworks from world-renowned artists</p>
        <div class="header-accent"></div>
      </div>

      <div class="gallery-controls card-premium fade-in-up">
        <div class="search-section">
          <div class="search-wrapper">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="21 21l-4.35-4.35"></path>
            </svg>
            <input 
              v-model="artworkStore.searchQuery"
              type="text" 
              placeholder="Search by title, artist, or description..."
              class="search-input"
            >
            <div v-if="artworkStore.searchQuery" class="search-clear" @click="artworkStore.searchQuery = ''">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="filters-section">
          <!-- Custom Category Dropdown -->
          <div class="custom-dropdown" :class="{ 'active': categoryDropdownOpen }">
            <button class="dropdown-trigger" @click="toggleCategoryDropdown">
              <div class="dropdown-content">
                <span class="dropdown-icon">{{ selectedCategoryOption.icon }}</span>
                <span class="dropdown-label">{{ selectedCategoryOption.label }}</span>
                <span class="dropdown-count">({{ selectedCategoryOption.count }})</span>
              </div>
              <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            <div class="dropdown-menu" :class="{ 'open': categoryDropdownOpen }">
              <div class="dropdown-header">
                <span>Choose Category</span>
                <div class="dropdown-divider"></div>
              </div>
              <div 
                v-for="option in categoryOptions" 
                :key="option.value"
                class="dropdown-item"
                :class="{ 'selected': artworkStore.selectedCategory === option.value }"
                @click="selectCategory(option.value)"
              >
                <span class="item-icon">{{ option.icon }}</span>
                <span class="item-label">{{ option.label }}</span>
                <span class="item-count">{{ option.count }}</span>
                <div class="item-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Custom Sort Dropdown -->
          <div class="custom-dropdown" :class="{ 'active': sortDropdownOpen }">
            <button class="dropdown-trigger" @click="toggleSortDropdown">
              <div class="dropdown-content">
                <span class="dropdown-icon">{{ selectedSortOption.icon }}</span>
                <span class="dropdown-label">{{ selectedSortOption.label }}</span>
              </div>
              <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            <div class="dropdown-menu" :class="{ 'open': sortDropdownOpen }">
              <div class="dropdown-header">
                <span>Sort By</span>
                <div class="dropdown-divider"></div>
              </div>
              <div 
                v-for="option in sortOptions" 
                :key="option.value"
                class="dropdown-item"
                :class="{ 'selected': sortBy === option.value }"
                @click="selectSort(option.value)"
              >
                <span class="item-icon">{{ option.icon }}</span>
                <span class="item-label">{{ option.label }}</span>
                <div class="item-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="gallery-content">
        <div class="gallery-stats fade-in-up">
          <div class="stats-item">
            <span class="stats-number">{{ sortedArtworks.length }}</span>
            <span class="stats-label">Artworks Found</span>
          </div>
          <div class="stats-divider"></div>
          <div class="stats-item">
            <span class="stats-number">{{ new Set(sortedArtworks.map((a: Artwork) => a.artist)).size }}</span>
            <span class="stats-label">Artists</span>
          </div>
          <div class="stats-divider"></div>
          <div class="stats-item">
            <span class="stats-number">{{ new Set(sortedArtworks.map((a: Artwork) => a.category)).size }}</span>
            <span class="stats-label">Categories</span>
          </div>
        </div>
        
        <div v-if="sortedArtworks.length === 0" class="no-results fade-in-up">
          <div class="no-results-icon">🔍</div>
          <h3>No artworks found</h3>
          <p>Try adjusting your search criteria or browse different categories</p>
          <button class="btn-secondary" @click="artworkStore.searchQuery = ''; artworkStore.selectedCategory = 'all'">
            Clear Filters
          </button>
        </div>
        
        <div v-else class="artworks-grid">
          <ArtworkCard 
            v-for="(artwork, index) in sortedArtworks" 
            :key="artwork.id"
            :artwork="artwork"
            class="fade-in-up"
            :style="{ 'animation-delay': `${index * 0.1}s` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  min-height: 100vh;
  padding-top: 80px;
  background: radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
}

.gallery-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

.gallery-header {
  text-align: center;
  margin-bottom: 4rem;
}

.gallery-header h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  font-style: italic;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.gallery-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 300;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.header-accent {
  width: 80px;
  height: 2px;
  background: var(--gradient-gold);
  margin: 0 auto;
  border-radius: 2px;
}

.gallery-controls {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  background: rgba(20, 20, 38, 0.8);
  border-radius: 24px;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.search-section {
  flex: 1;
}

.search-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  z-index: 2;
  transition: all 0.3s ease;
}

.search-input:focus + .search-icon {
  color: var(--accent-color);
}

.search-input {
  width: 100%;
  padding: 1.25rem 4rem 1.25rem 3.5rem;
  background: var(--background-dark);
  border: 2px solid var(--border-color);
  border-radius: 50px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-sans);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-light);
  background: var(--background-card);
}

.search-input::placeholder {
  color: var(--text-muted);
  font-style: italic;
}

.search-clear {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--accent-color);
  color: var(--background-dark);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.search-clear:hover {
  background: #ff4757;
  transform: translateY(-50%) scale(1.1);
}

.filters-section {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* Custom Dropdown Styles */
.custom-dropdown {
  position: relative;
  min-width: 220px;
  z-index: 1000;
}

.custom-dropdown.active {
  z-index: 10000;
}

.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--background-dark);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-sans);
  position: relative;
  overflow: hidden;
}

.dropdown-trigger::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
  transition: left 0.5s ease;
}

.dropdown-trigger:hover::before {
  left: 100%;
}

.dropdown-trigger:hover,
.custom-dropdown.active .dropdown-trigger {
  border-color: var(--accent-color);
  background: var(--background-elevated);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
}

.dropdown-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  z-index: 2;
  position: relative;
}

.dropdown-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.dropdown-label {
  font-weight: 500;
  flex: 1;
  text-align: left;
}

.dropdown-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  background: rgba(212, 175, 55, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.dropdown-arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  color: var(--accent-color);
  z-index: 2;
  position: relative;
}

.custom-dropdown.active .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--background-card);
  border: 2px solid var(--accent-color);
  border-radius: 16px;
  margin-top: 0.5rem;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-menu::-webkit-scrollbar {
  width: 4px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: var(--background-dark);
  border-radius: 2px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 2px;
}

.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header {
  padding: 1rem 1.5rem 0.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
}

.dropdown-header span {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dropdown-divider {
  width: 30px;
  height: 2px;
  background: var(--accent-color);
  margin-top: 0.5rem;
  border-radius: 1px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color), transparent);
  transition: width 0.3s ease;
}

.dropdown-item:hover::before,
.dropdown-item.selected::before {
  width: 4px;
}

.dropdown-item:hover {
  background: rgba(212, 175, 55, 0.1);
  transform: translateX(4px);
}

.dropdown-item.selected {
  background: rgba(212, 175, 55, 0.15);
  color: var(--accent-color);
}

.item-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  z-index: 2;
  position: relative;
}

.item-label {
  flex: 1;
  font-weight: 500;
  z-index: 2;
  position: relative;
}

.item-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  z-index: 2;
  position: relative;
}

.dropdown-item.selected .item-count {
  background: rgba(212, 175, 55, 0.3);
  color: var(--accent-color);
}

.item-indicator {
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--accent-color);
  z-index: 2;
  position: relative;
}

.dropdown-item.selected .item-indicator {
  opacity: 1;
  transform: scale(1);
}

/* Gallery Stats */
.gallery-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.stats-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stats-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
  font-style: italic;
}

.stats-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

.stats-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, var(--border-color), transparent);
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--background-card);
  border-radius: 20px;
  border: 2px dashed var(--border-color);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.no-results p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Artworks Grid */
.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding-top: 1rem;
}

/* Animations */
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

.text-shimmer {
  background: linear-gradient(135deg, var(--text-primary), var(--accent-color), #ffd700);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .gallery-container {
    padding: 1.5rem;
  }
  
  .gallery-controls {
    padding: 2rem;
    gap: 1.5rem;
  }
  
  .filters-section {
    gap: 1rem;
  }
  
  .custom-dropdown {
    min-width: 200px;
  }
  
  .artworks-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .gallery {
    padding-top: 70px;
  }
  
  .gallery-container {
    padding: 1rem;
  }
  
  .gallery-header {
    margin-bottom: 2rem;
  }
  
  .gallery-header h1 {
    font-size: 2.5rem;
  }
  
  .gallery-header p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .gallery-controls {
    padding: 1.5rem;
    gap: 1.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
  }
  
  .search-wrapper {
    max-width: 100%;
  }
  
  .search-input {
    padding: 1rem 3.5rem 1rem 3rem;
    font-size: 0.9rem;
  }
  
  .search-icon {
    left: 1rem;
  }
  
  .search-clear {
    right: 1rem;
    width: 20px;
    height: 20px;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .custom-dropdown {
    width: 100%;
    max-width: none;
    min-width: auto;
  }
  
  .dropdown-trigger {
    padding: 1rem 1.25rem;
  }
  
  .dropdown-menu {
    max-height: 250px;
  }
  
  .gallery-stats {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .stats-divider {
    display: none;
  }
  
  .stats-item {
    flex: 1;
    min-width: 80px;
  }
  
  .stats-number {
    font-size: 1.8rem;
  }
  
  .stats-label {
    font-size: 0.8rem;
  }
  
  .artworks-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .no-results {
    padding: 3rem 1.5rem;
  }
  
  .no-results-icon {
    font-size: 3rem;
  }
  
  .no-results h3 {
    font-size: 1.3rem;
  }
  
  .no-results p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery {
    padding-top: 60px;
  }
  
  .gallery-container {
    padding: 0.75rem;
  }
  
  .gallery-header {
    margin-bottom: 1.5rem;
  }
  
  .gallery-header h1 {
    font-size: 2rem;
  }
  
  .gallery-header p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .header-accent {
    width: 60px;
  }
  
  .gallery-controls {
    padding: 1rem;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .search-input {
    padding: 0.875rem 3rem 0.875rem 2.5rem;
    font-size: 0.85rem;
  }
  
  .search-icon {
    left: 0.75rem;
    width: 18px;
    height: 18px;
  }
  
  .search-clear {
    right: 0.75rem;
    width: 18px;
    height: 18px;
  }
  
  .dropdown-trigger {
    padding: 0.875rem 1rem;
    font-size: 0.85rem;
  }
  
  .dropdown-content {
    gap: 0.5rem;
  }
  
  .dropdown-icon {
    font-size: 1rem;
  }
  
  .dropdown-count {
    display: none;
  }
  
  .dropdown-item {
    padding: 0.75rem 1rem;
  }
  
  .item-icon {
    font-size: 1rem;
  }
  
  .item-label {
    font-size: 0.9rem;
  }
  
  .gallery-stats {
    padding: 0.75rem;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .stats-number {
    font-size: 1.5rem;
  }
  
  .stats-label {
    font-size: 0.7rem;
    letter-spacing: 0.5px;
  }
  
  .artworks-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .no-results {
    padding: 2rem 1rem;
  }
  
  .no-results-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .no-results h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
  
  .no-results p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 360px) {
  .gallery-container {
    padding: 0.5rem;
  }
  
  .gallery-header h1 {
    font-size: 1.75rem;
  }
  
  .gallery-controls {
    padding: 0.75rem;
  }
  
  .search-input {
    padding: 0.75rem 2.5rem 0.75rem 2rem;
  }
  
  .dropdown-trigger {
    padding: 0.75rem 0.875rem;
  }
  
  .gallery-stats {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-item {
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .stats-item:last-child {
    border-bottom: none;
  }
}
</style> 