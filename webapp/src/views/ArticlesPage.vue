<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mental Health Articles</h1>
        <p class="text-gray-600 mt-2">Educational resources and support information</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <span class="ml-3 text-gray-600">Loading articles...</span>
      </div>
      
      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex">
          <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>
      
      <!-- Articles Count -->
      <div v-if="!loading && !error && totalArticles > 0" class="mb-6">
        <p class="text-gray-600">
          Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, totalArticles) }} of {{ totalArticles }} articles
        </p>
      </div>
      
      <!-- Articles Grid -->
      <div v-if="!loading && !error && paginatedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="article in paginatedArticles" :key="article.url || article._id || article.title" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center mb-3">
              <span class="bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full">
                {{ formatCategory(article.category || 'Mental Health') }}
              </span>
              <span v-if="article.featured" class="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
            
            <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {{ article.title }}
            </h2>
            
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ truncateContent(article.description || article.content) }}
            </p>
            
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500">
                <p class="font-medium">{{ article.author || article.source?.name || 'Unknown Author' }}</p>
                <p>{{ formatDate(article.publishedAt || article.createdAt) }}</p>
              </div>
              <a 
                :href="article.url || '#'" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700 transition-colors duration-200"
              >
                Read More
              </a>
            </div>
          </div>
        </article>
      </div>
      
      <!-- Pagination Controls -->
      <div v-if="!loading && !error && totalPages > 1" class="flex justify-center items-center mt-8 space-x-4">
        <button 
          @click="loadPreviousPage"
          :disabled="currentPage === 1"
          :class="[
            'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          ]"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Previous
        </button>
        
        <span class="flex items-center space-x-2">
          <span class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
        </span>
        
        <button 
          @click="loadNextPage"
          :disabled="currentPage === totalPages"
          :class="[
            'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-pink-600 text-white hover:bg-pink-700'
          ]"
        >
          Next
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && !error && allArticles.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
        <p class="text-gray-500">Check back later for new mental health resources or try refreshing the page.</p>
        <button 
          @click="fetchArticles" 
          class="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700 transition-colors duration-200"
        >
          Refresh Articles
        </button>
      </div>
      
      <!-- Contact Information -->
      <div class="mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Support</h3>
            <div class="space-y-3">
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Crisis Hotline: 15555
              </p>
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                support@careconnect.com
              </p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Help</h3>
            <div class="space-y-3">
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                Find Local Therapists
              </p>
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                24/7 Online Counseling
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticlesPage',
  data() {
    return {
      allArticles: [], // Store all fetched articles
      loading: true,
      error: null,
      currentPage: 1,
      pageSize: 6,
      searchQueries: [
        'mental health therapy',
        'anxiety depression treatment',
        'mindfulness wellbeing',
        'psychology mental wellness',
        'stress management techniques'
      ]
    }
  },
  
  computed: {
    totalArticles() {
      return this.allArticles.length
    },
    
    totalPages() {
      return Math.ceil(this.totalArticles / this.pageSize)
    },
    
    startIndex() {
      return (this.currentPage - 1) * this.pageSize
    },
    
    endIndex() {
      return this.startIndex + this.pageSize
    },
    
    paginatedArticles() {
      return this.allArticles.slice(this.startIndex, this.endIndex)
    }
  },
  
  methods: {
    formatCategory(category) {
      if (!category) return 'General'
      return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    },
    
    truncateContent(content) {
      if (!content) return 'No description available.'
      return content.length > 150 ? content.substring(0, 150) + '...' : content
    },
    
    formatDate(date) {
      if (!date) return 'No date available'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    loadNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        // Smooth scroll to top of articles section
        this.$el.querySelector('.grid')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    },

    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        // Smooth scroll to top of articles section
        this.$el.querySelector('.grid')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    },

    async fetchArticles() {
      this.loading = true
      this.error = null
      this.allArticles = []
      
      try {
        // Try multiple sources to get diverse content
        await this.fetchFromMultipleSources()
        
        if (this.allArticles.length === 0) {
          throw new Error('No articles found from any source')
        }
        
        // Remove duplicates and sort by date
        this.allArticles = this.removeDuplicates(this.allArticles)
        this.allArticles.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt))
        
      } catch (fetchError) {
        console.error('All fetch attempts failed:', fetchError)
        this.error = 'Unable to load articles at this time. Please try again later.'
      } finally {
        this.loading = false
      }
    },

    async fetchFromMultipleSources() {
      const sources = [
        () => this.fetchFromNewsAPI(),
        () => this.fetchFromGuardianAPI(),
        () => this.fetchFromHackerNewsAPI()
      ]
      
      // Try each source and combine results
      for (const fetchSource of sources) {
        try {
          await fetchSource()
          if (this.allArticles.length >= 18) break // Stop when we have enough articles
        } catch (error) {
          console.log('Source failed, trying next:', error.message)
        }
      }
    },

    async fetchFromNewsAPI() {
      // Note: In production, you should use environment variables for API keys
      const API_KEY = process.env.VUE_APP_NEWS_API_KEY
      
      if (!API_KEY) {
        throw new Error('NewsAPI key not configured')
      }

      const query = this.searchQueries[Math.floor(Math.random() * this.searchQueries.length)]
      
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query,
          apiKey: API_KEY,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 20,
          domains: 'healthline.com,mayoclinic.org,webmd.com,medicalnewstoday.com,psychologytoday.com,mindful.org'
        }
      })
      
      const articles = response.data.articles
        .filter(article => 
          article.title && 
          article.description && 
          !article.title.includes('[Removed]') &&
          article.description !== '[Removed]'
        )
        .map(article => ({
          ...article,
          category: 'Mental Health',
          featured: Math.random() > 0.8 // Randomly mark some as featured
        }))
      
      this.allArticles.push(...articles)
    },

    async fetchFromGuardianAPI() {
      const response = await axios.get('https://content.guardianapis.com/search', {
        params: {
          q: 'mental health OR wellbeing OR psychology OR therapy',
          section: 'society|science|lifeandstyle',
          'show-fields': 'headline,trailText,byline,thumbnail',
          'page-size': 10,
          'api-key': 'test' // Guardian provides a test key
        }
      })
      
      const articles = response.data.response.results.map(item => ({
        title: item.fields?.headline || item.webTitle,
        description: item.fields?.trailText || 'Read more about this mental health topic.',
        url: item.webUrl,
        author: item.fields?.byline || 'The Guardian',
        publishedAt: item.webPublicationDate,
        source: { name: 'The Guardian' },
        category: 'Mental Health',
        featured: Math.random() > 0.7
      }))
      
      this.allArticles.push(...articles)
    },

    async fetchFromHackerNewsAPI() {
      // Fetch from Hacker News API for tech-related mental health content
      try {
        const response = await axios.get('https://hn.algolia.com/api/v1/search', {
          params: {
            query: 'mental health wellness',
            tags: 'story',
            hitsPerPage: 8
          }
        })
        
        const articles = response.data.hits
          .filter(item => item.title && item.url)
          .map(item => ({
            title: item.title,
            description: `Discussion: ${item.title}. Points: ${item.points || 0}, Comments: ${item.num_comments || 0}`,
            url: item.url,
            author: item.author || 'Hacker News Community',
            publishedAt: new Date(item.created_at).toISOString(),
            source: { name: 'Hacker News' },
            category: 'Tech & Wellness',
            featured: item.points > 100
          }))
        
        this.allArticles.push(...articles)
      } catch (error) {
        console.log('Hacker News API failed:', error.message)
      }
    },

    removeDuplicates(articles) {
      const seen = new Set()
      return articles.filter(article => {
        const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, '')
        if (seen.has(key)) {
          return false
        }
        seen.add(key)
        return true
      })
    }
  },
  
  async mounted() {
    await this.fetchArticles()
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for pagination */
.grid {
  transition: opacity 0.3s ease-in-out;
}

/* Button hover effects */
button:disabled {
  transition: all 0.2s ease-in-out;
}

button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>