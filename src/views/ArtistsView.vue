<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'

interface Artist {
  id: string
  name: string
  specialty: string
  description: string
  image: string
  artworkCount: number
  yearsActive: number
  featured: boolean
}

const artists: Artist[] = [
  {
    id: '1',
    name: 'Alexander Petrov',
    specialty: 'Abstract Expressionism',
    description: 'Renowned master of abstract expressionism, working with bold colors and dynamic compositions. His works are held in private collections worldwide.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    artworkCount: 12,
    yearsActive: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Maria Sokolova',
    specialty: 'Portrait Painting',
    description: 'Master of psychological portraiture, specializing in capturing the essence of human emotion. Winner of numerous prestigious art awards.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    artworkCount: 8,
    yearsActive: 7,
    featured: true
  },
  {
    id: '3',
    name: 'Dmitry Volkov',
    specialty: 'Contemporary Landscapes',
    description: 'Contemporary landscape artist creating unique interpretations of urban and natural scenes. Works primarily in oil painting techniques.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    artworkCount: 15,
    yearsActive: 10,
    featured: true
  },
  {
    id: '4',
    name: 'Ekaterina Morskaya',
    specialty: 'Seascapes & Marine Art',
    description: 'Artist inspired by the beauty of ocean vistas. Her works capture the power and tranquility of maritime landscapes with exceptional detail.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    artworkCount: 6,
    yearsActive: 3,
    featured: false
  }
]
</script>

<template>
  <div class="artists">
    <AppHeader />
    
    <div class="artists-container">
      <div class="artists-header fade-in-up">
        <h1 class="text-shimmer">Featured Artists</h1>
        <p>Meet the visionary creators behind our exceptional collection</p>
        <div class="header-accent"></div>
      </div>

      <div class="artists-grid">
        <div 
          v-for="(artist, index) in artists" 
          :key="artist.id"
          class="artist-card card-premium fade-in-up"
          :class="{ 'featured': artist.featured }"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="artist-image-wrapper">
            <img :src="artist.image" :alt="artist.name" class="artist-image">
            <div class="image-overlay">
              <div class="artist-badge" v-if="artist.featured">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Featured
              </div>
            </div>
          </div>
          
          <div class="artist-info">
            <h3>{{ artist.name }}</h3>
            <span class="artist-specialty">{{ artist.specialty }}</span>
            <p class="artist-description">{{ artist.description }}</p>
            
            <div class="artist-stats">
              <div class="stat-item">
                <span class="stat-number">{{ artist.artworkCount }}</span>
                <span class="stat-label">{{ artist.artworkCount === 1 ? 'Artwork' : 'Artworks' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ artist.yearsActive }}</span>
                <span class="stat-label">{{ artist.yearsActive === 1 ? 'Year' : 'Years' }} Active</span>
              </div>
            </div>
            
            <button class="btn-secondary artist-cta">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.artists {
  min-height: 100vh;
  padding-top: 80px;
  background: radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
}

.artists-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.artists-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.artists-header h1 {
  font-size: clamp(3rem, 6vw, 5rem);
  font-style: italic;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: -0.02em;
}

.artists-header p {
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 300;
  max-width: 600px;
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

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
}

.artist-card {
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.artist-card.featured {
  border: 2px solid var(--accent-color);
}

.artist-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 320px;
}

.artist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.artist-card:hover .artist-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.3) 0%, 
    transparent 30%, 
    transparent 70%, 
    rgba(0, 0, 0, 0.6) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.artist-card:hover .image-overlay {
  opacity: 1;
}

.artist-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--gradient-gold);
  color: var(--background-dark);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.artist-info {
  padding: 2.5rem;
  background: var(--background-card);
}

.artist-info h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-style: italic;
  color: var(--text-primary);
}

.artist-specialty {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 1.5rem;
}

.artist-description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-weight: 300;
  line-height: 1.7;
  font-size: 1rem;
}

.artist-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-dark);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
  font-family: var(--font-serif);
  font-style: italic;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.artist-cta {
  width: 100%;
  justify-content: center;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .artists-container {
    padding: 1rem;
  }
  
  .artists-header h1 {
    font-size: 2.5rem;
  }
  
  .artists-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .artist-image-wrapper {
    height: 280px;
  }
  
  .artist-info {
    padding: 2rem;
  }
  
  .artist-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .artists-grid {
    grid-template-columns: 1fr;
  }
  
  .artist-card {
    min-width: unset;
  }
}
</style> 