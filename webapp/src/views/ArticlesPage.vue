<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mental Health Articles</h1>
        <p class="text-gray-600 mt-2">Educational resources and support information</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="article in articles" :key="article._id" class="card">
          <div class="flex items-center mb-2">
            <span class="bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded">
              {{ formatCategory(article.category) }}
            </span>
            <span v-if="article.featured" class="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded">
              Featured
            </span>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-3">{{ article.title }}</h2>
          <p class="text-gray-600 mb-4">{{ truncateContent(article.content) }}</p>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              <p>By {{ article.author }}</p>
              <p>{{ formatDate(article.publishedAt) }}</p>
            </div>
            <button class="btn btn-primary">Read More</button>
          </div>
        </article>
      </div>
      
      <!-- Contact Information -->
      <div class="mt-12 card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Support</h3>
            <div class="space-y-2">
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Crisis Hotline: 15555
              </p>
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                support@careconnect.com
              </p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Help</h3>
            <div class="space-y-2">
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                Find Local Therapists
              </p>
              <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ArticlesPage',
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    ...mapActions(['fetchArticles']),
    
    formatCategory(category) {
      return category?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'General'
    },
    
    truncateContent(content) {
      return content?.length > 150 ? content.substring(0, 150) + '...' : content
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  
  async mounted() {
    await this.fetchArticles()
  }
}
</script>
