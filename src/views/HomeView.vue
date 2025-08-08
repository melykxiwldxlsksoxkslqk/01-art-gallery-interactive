<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useArtworkStore } from '@/stores/artwork'
import AppHeader from '@/components/common/AppHeader.vue'
import ArtworkCard from '@/components/artwork/ArtworkCard.vue'

const router = useRouter()
const artworkStore = useArtworkStore()

const navigateToGallery = () => {
  router.push('/gallery')
}

const navigateToVirtualRoom = () => {
  router.push('/virtual-room')
}

const artists = [
  {
    name: 'Alexander Petrov',
    specialty: 'Abstract Art',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    count: 12
  },
  {
    name: 'Maria Sokolova',
    specialty: 'Portrait Painting',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
    count: 8
  },
  {
    name: 'Dmitry Volkov',
    specialty: 'Modern Landscapes',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    count: 15
  }
]
</script>

<template>
  <div class="home">
    <AppHeader />
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content fade-in-up">
        <h1 class="hero-title text-shimmer">Discover the World of Art in a New Dimension</h1>
        <p class="hero-description">
          Explore masterpieces in 3D, try them in your own interior with virtual reality
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="navigateToVirtualRoom">
            Virtual Fitting Room
          </button>
          <button class="btn-secondary" @click="navigateToGallery">
            View Gallery
          </button>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">{{ artworkStore.artworks.length }}+</span>
            <span class="stat-label">Artworks</span>
          </div>
          <div class="stat">
            <span class="stat-number">4</span>
            <span class="stat-label">Featured Artists</span>
          </div>
          <div class="stat">
            <span class="stat-number">3D</span>
            <span class="stat-label">Virtual Experience</span>
          </div>
        </div>
      </div>
      <div class="hero-visual fade-in-up" style="animation-delay: 0.3s">
        <div class="floating-artwork">
          <div class="artwork-frame">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=700&fit=crop" 
              alt="Featured Artwork" 
              class="artwork-preview"
            >
            <div class="artwork-glow"></div>
          </div>
          <div class="floating-elements">
            <div class="element element-1"></div>
            <div class="element element-2"></div>
            <div class="element element-3"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Artworks -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="text-gradient">Featured Collection</h2>
          <p>Handpicked masterpieces from our curated selection</p>
          <div class="section-accent"></div>
        </div>
        <div class="featured-grid">
          <div 
            v-for="(artwork, index) in artworkStore.featuredArtworks" 
            :key="artwork.id"
            class="artwork-wrapper fade-in-up"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <ArtworkCard :artwork="artwork" />
          </div>
        </div>
        <div class="section-cta fade-in-up">
          <button class="btn-secondary" @click="navigateToGallery">
            Explore Full Collection
          </button>
        </div>
      </div>
    </section>

    <!-- Popular Artists -->
    <section class="artists-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="text-gradient">Featured Artists</h2>
          <p>Meet the visionary creators behind these exceptional works</p>
          <div class="section-accent"></div>
        </div>
        <div class="artists-grid">
          <div 
            v-for="(artist, index) in artists" 
            :key="artist.name"
            class="artist-card card-premium fade-in-up"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="artist-image-wrapper">
              <img :src="artist.image" :alt="artist.name">
              <div class="artist-overlay">
                <router-link to="/artists" class="artist-link">
                  View Profile
                </router-link>
              </div>
            </div>
            <div class="artist-info">
              <h3>{{ artist.name }}</h3>
              <p>{{ artist.specialty }}</p>
              <span class="works-count">{{ artist.count }} artworks</span>
            </div>
          </div>
        </div>
        <div class="section-cta fade-in-up">
          <router-link to="/artists" class="btn-secondary">
            Meet All Artists
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, var(--background-dark) 0%, var(--primary-color) 100%);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 2;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 2rem;
  font-style: italic;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.7;
  font-weight: 300;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
  font-family: var(--font-serif);
  font-style: italic;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin: 0 auto;
}

.floating-artwork {
  position: relative;
  animation: float 6s ease-in-out infinite;
  max-width: 100%;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.artwork-frame {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 40px 100px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(212, 175, 55, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.1);
  border: 4px solid var(--accent-color);
  background: var(--background-card);
  max-width: 100%;
  width: 350px;
  height: 500px;
}

.artwork-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

.artwork-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
  opacity: 0.08;
  animation: pulse 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% { opacity: 0.08; transform: scale(1); }
  50% { opacity: 0.15; transform: scale(1.05); }
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.element {
  position: absolute;
  background: var(--gradient-gold);
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(1px);
}

.element-1 {
  width: 12px;
  height: 12px;
  top: 20%;
  left: -15%;
  animation: float-element 8s ease-in-out infinite;
}

.element-2 {
  width: 18px;
  height: 18px;
  top: 60%;
  right: -20%;
  animation: float-element 10s ease-in-out infinite reverse;
}

.element-3 {
  width: 8px;
  height: 8px;
  bottom: 30%;
  left: -10%;
  animation: float-element 12s ease-in-out infinite;
}

@keyframes float-element {
  0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
  33% { transform: translateY(-40px) translateX(15px) scale(1.2); opacity: 0.8; }
  66% { transform: translateY(30px) translateX(-10px) scale(0.8); opacity: 0.4; }
}

/* Section Styles */
.featured-section,
.artists-section {
  padding: 8rem 0;
  position: relative;
}

.artists-section {
  background: linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.02) 50%, transparent 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-header h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  font-style: italic;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.section-accent {
  width: 80px;
  height: 2px;
  background: var(--gradient-gold);
  margin: 0 auto;
  border-radius: 2px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.artwork-wrapper {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.artist-card {
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.artist-image-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
}

.artist-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.artist-card:hover .artist-image-wrapper img {
  transform: scale(1.1);
}

.artist-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.artist-card:hover .artist-overlay {
  opacity: 1;
}

.artist-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border: 2px solid var(--accent-color);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.artist-link:hover {
  background: var(--accent-color);
  color: var(--background-dark);
}

.artist-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.artist-info p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 300;
}

.works-count {
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-cta {
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 6rem 1rem 2rem;
    min-height: auto;
  }
  
  .hero-content {
    margin-bottom: 3rem;
    max-width: 100%;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 2rem;
  }
  
  .hero-visual {
    max-width: 100%;
    width: 100%;
  }
  
  .artwork-frame {
    width: 280px;
    height: 400px;
    max-width: 90vw;
    max-height: 60vh;
  }
  
  .featured-section,
  .artists-section {
    padding: 4rem 0;
  }
  
  .featured-grid,
  .artists-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .artist-image-wrapper {
    width: 150px;
    height: 150px;
  }
  
  .element-1,
  .element-2,
  .element-3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 0.5rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .stat {
    flex: 1;
    min-width: 80px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .hero-actions button {
    width: 100%;
    max-width: 280px;
  }
  
  .artwork-frame {
    width: 240px;
    height: 340px;
    max-width: 85vw;
    max-height: 50vh;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .section-header p {
    font-size: 1rem;
    padding: 0 1rem;
  }
}
</style> 