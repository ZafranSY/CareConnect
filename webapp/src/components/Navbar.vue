<template>
  <nav class="navbar">
    <div class="container">
      <div class="flex justify-between" style="height: 4rem;">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-800">CareConnect</span>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          <router-link to="/articles" class="nav-link">Articles</router-link>
          <router-link to="/feedback" class="nav-link">Feedback</router-link>
        </div>
        
        <div class="flex items-center space-x-4">
          <div v-if="!isAuthenticated" class="flex space-x-2">
            <router-link to="/login" class="btn btn-primary">Log In</router-link>
            <router-link to="/register" class="btn" style="border: 1px solid #ec4899; color: #ec4899; background: white;">Sign Up</router-link>
          </div>
          <div v-else class="flex items-center space-x-4">
            <span class="text-gray-700">Welcome, {{ currentUser?.firstName }}</span>
            <button @click="logout" class="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
