<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { ref, onMounted } from 'vue'

const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Анимация частиц
onMounted(() => {
  createParticles()
})

const createParticles = () => {
  const header = document.querySelector('.nav-header')
  if (!header) return

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 10 + 's'
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's'
    header.appendChild(particle)
  }
}
</script>

<template>
  <nav class="nav-header">
    <div class="header-background">
      <div class="gradient-overlay"></div>
      <div class="mesh-gradient"></div>
    </div>
    
    <div class="nav-container">
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 100 100" class="logo-svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ffd700;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGradient)" stroke-width="3"/>
            <polygon points="35,35 65,35 50,65" fill="url(#logoGradient)" class="logo-triangle"/>
            <circle cx="50" cy="25" r="8" fill="url(#logoGradient)" class="logo-dot"/>
          </svg>
        </div>
        <div class="logo-text">
          <h1 class="logo-title">ArtVision</h1>
          <span class="logo-subtitle">Interactive Gallery</span>
        </div>
      </router-link>
      
      <ul class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
        <li class="nav-item">
          <router-link to="/gallery" class="nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            Gallery
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/virtual-room" class="nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            Virtual Room
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/artists" class="nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Artists
          </router-link>
        </li>
      </ul>
      
      <div class="nav-actions">
        <button class="search-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="21 21l-4.35-4.35"/>
          </svg>
        </button>
        
        <button class="cart-btn" @click="cartStore.toggleCart()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span v-if="cartStore.itemCount > 0" class="cart-count">{{ cartStore.itemCount }}</span>
        </button>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span class="hamburger" :class="{ 'active': mobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 20, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(212, 175, 55, 0.1) 0%,
    rgba(255, 215, 0, 0.05) 25%,
    transparent 50%,
    rgba(212, 175, 55, 0.05) 75%,
    rgba(255, 215, 0, 0.1) 100%
  );
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { transform: translateX(-10px); opacity: 0.8; }
  50% { transform: translateX(10px); opacity: 1; }
}

.mesh-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.06) 0%, transparent 50%);
  animation: meshFloat 12s ease-in-out infinite;
}

@keyframes meshFloat {
  0%, 100% { transform: rotate(0deg) scale(1); }
  33% { transform: rotate(1deg) scale(1.02); }
  66% { transform: rotate(-1deg) scale(0.98); }
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: particleFloat linear infinite;
  opacity: 0.6;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100px) translateX(0px);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-20px) translateX(20px);
    opacity: 0;
  }
}

.nav-container {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  position: relative;
}

.logo-svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo:hover .logo-svg {
  transform: rotate(5deg) scale(1.05);
}

.logo-triangle {
  animation: trianglePulse 3s ease-in-out infinite;
}

@keyframes trianglePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.logo-dot {
  animation: dotBounce 2s ease-in-out infinite;
}

@keyframes dotBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.logo-title {
  font-size: 1.8rem;
  font-style: italic;
  font-weight: 300;
  margin: 0;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-color), #ffd700);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: logoShimmer 4s ease-in-out infinite;
}

@keyframes logoShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.logo-subtitle {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 400;
  opacity: 0.8;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 400;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(212, 175, 55, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.2);
}

.nav-link.router-link-active {
  color: var(--accent-color);
  background: rgba(212, 175, 55, 0.15);
  box-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
}

.nav-link svg {
  transition: all 0.3s ease;
}

.nav-link:hover svg {
  transform: scale(1.1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-toggle,
.cart-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: var(--text-primary);
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.search-toggle::before,
.cart-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.search-toggle:hover::before,
.cart-btn:hover::before {
  width: 100px;
  height: 100px;
}

.search-toggle:hover,
.cart-btn:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

.cart-btn {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, var(--accent-color), #ffd700);
  color: var(--background-dark);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
  animation: cartBounce 0.5s ease;
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
}

@keyframes cartBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 1024px) {
  .nav-menu {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 10, 20, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }
  
  .nav-menu.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    padding: 1.2rem 2rem;
    border-radius: 0;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    font-size: 1rem;
    justify-content: flex-start;
  }
  
  .nav-link:last-child {
    border-bottom: none;
  }
  
  .nav-container {
    padding: 0 1rem;
    height: 70px;
  }
  
  .nav-header {
    height: 70px;
  }
  
  .logo-title {
    font-size: 1.4rem;
  }
  
  .logo-subtitle {
    font-size: 0.6rem;
    letter-spacing: 1px;
  }
  
  .search-toggle {
    display: none;
  }
  
  .nav-actions {
    gap: 0.75rem;
  }
  
  .cart-btn,
  .mobile-menu-btn {
    padding: 0.6rem;
  }
  
  .logo-icon svg {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
    height: 60px;
  }
  
  .nav-header {
    height: 60px;
  }
  
  .logo-text {
    display: none;
  }
  
  .logo {
    gap: 0;
  }
  
  .logo-icon svg {
    width: 32px;
    height: 32px;
  }
  
  .nav-actions {
    gap: 0.5rem;
  }
  
  .cart-btn,
  .mobile-menu-btn {
    padding: 0.5rem;
  }
  
  .nav-link {
    padding: 1rem 1.5rem;
    font-size: 0.95rem;
  }
  
  .cart-count {
    font-size: 0.6rem;
    padding: 0.15rem 0.4rem;
    min-width: 16px;
    top: -6px;
    right: -6px;
  }
}
</style> 