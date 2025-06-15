<template>
  <div id="app" class="min-h-screen bg-white">
    <NavbarPage />
    <router-view />
  </div>
</template>

<script>
import NavbarPage from './components/NavbarPage.vue'

export default {
  name: 'App',
  components: {
    NavbarPage
  }
}
</script>
