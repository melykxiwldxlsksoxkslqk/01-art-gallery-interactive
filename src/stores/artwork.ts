import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Artwork {
  id: string
  title: string
  artist: string
  price: number
  category: string
  image: string
  description: string
  dimensions: string
  material: string
  year: string
  featured?: boolean
}

export const useArtworkStore = defineStore('artwork', () => {
  const artworks = ref<Artwork[]>([
    {
      id: '1',
      title: 'Abstract Dreams',
      artist: 'Alexander Petrov',
      price: 45000,
      category: 'Abstract',
      image: 'https://images.unsplash.com/photo-1506126613408-4e63a3c2b4e7?w=600&h=800&fit=crop',
      description: 'A vibrant abstract piece exploring the depths of imagination.',
      dimensions: '80x100 cm',
      material: 'Oil on canvas',
      year: '2024',
      featured: true
    },
    {
      id: '2',
      title: 'Portrait of a Stranger',
      artist: 'Maria Sokolova',
      price: 65000,
      category: 'Portrait',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
      description: 'An enigmatic portrait painted in a classical style.',
      dimensions: '60x80 cm',
      material: 'Oil on canvas',
      year: '2023',
      featured: true
    },
    {
      id: '3',
      title: 'Cityscape Reflections',
      artist: 'Dmitry Volkov',
      price: 35000,
      category: 'Landscape',
      image: 'https://images.unsplash.com/photo-1552688461-9e20a026e115?w=600&h=400&fit=crop',
      description: 'A modern cityscape captured with dynamic acrylics.',
      dimensions: '70x50 cm',
      material: 'Acrylic on canvas',
      year: '2024',
      featured: true
    },
    {
      id: '4',
      title: 'Ocean Waves',
      artist: 'Ekaterina Morskaya',
      price: 52000,
      category: 'Landscape',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=800&fit=crop',
      description: 'A powerful seascape capturing the eternal dance of ocean waves.',
      dimensions: '90x70 cm',
      material: 'Oil on canvas',
      year: '2023',
      featured: false
    },
    {
      id: '5',
      title: 'Golden Autumn',
      artist: 'Alexander Petrov',
      price: 38000,
      category: 'Landscape',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop',
      description: 'A warm autumn landscape filled with golden light and color.',
      dimensions: '75x60 cm',
      material: 'Acrylic on canvas',
      year: '2024',
      featured: false
    },
    {
      id: '6',
      title: 'Urban Symphony',
      artist: 'Dmitry Volkov',
      price: 42000,
      category: 'Abstract',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop',
      description: 'An abstract interpretation of city rhythms and urban energy.',
      dimensions: '85x65 cm',
      material: 'Mixed media on canvas',
      year: '2024',
      featured: false
    },
    {
      id: '7',
      title: 'Silent Contemplation',
      artist: 'Maria Sokolova',
      price: 58000,
      category: 'Portrait',
      image: 'https://images.unsplash.com/photo-1544967882-f9f25c7dd669?w=600&h=800&fit=crop',
      description: 'A contemplative portrait exploring inner peace and meditation.',
      dimensions: '65x85 cm',
      material: 'Oil on canvas',
      year: '2023',
      featured: false
    },
    {
      id: '8',
      title: 'Cosmic Dance',
      artist: 'Alexander Petrov',
      price: 72000,
      category: 'Abstract',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop',
      description: 'An explosive abstract piece inspired by cosmic phenomena.',
      dimensions: '100x80 cm',
      material: 'Acrylic and gold leaf on canvas',
      year: '2024',
      featured: false
    }
  ])

  const searchQuery = ref('')
  const selectedCategory = ref('all')

  const featuredArtworks = computed(() => artworks.value.filter(a => a.featured))
  
  const categories = computed(() => {
    const cats = [...new Set(artworks.value.map(a => a.category.toLowerCase()))]
    return cats
  })

  const filteredArtworks = computed(() => {
    let filtered = artworks.value

    // Filter by category
    if (selectedCategory.value !== 'all') {
      filtered = filtered.filter(artwork => 
        artwork.category.toLowerCase() === selectedCategory.value
      )
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(artwork =>
        artwork.title.toLowerCase().includes(query) ||
        artwork.artist.toLowerCase().includes(query) ||
        artwork.description.toLowerCase().includes(query)
      )
    }

    return filtered
  })

  function getArtworkById(id: string) {
    return artworks.value.find(artwork => artwork.id === id)
  }

  return { 
    artworks, 
    featuredArtworks, 
    getArtworkById,
    searchQuery,
    selectedCategory,
    categories,
    filteredArtworks
  }
}) 