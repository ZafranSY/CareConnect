<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-brand">
          <router-link to="/" class="brand-link">
            <img src="@/assets/careconnect.svg" alt="CareConnect Logo" class="brand-logo">
            <span class="brand-name">CareConnect</span>
          </router-link>
        </div>

        <div class="navbar-links desktop-only">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          <router-link to="/articles" class="nav-link">Articles</router-link>
          <router-link to="/feedback" class="nav-link">Talk to Us</router-link>
        </div>

        <div class="navbar-user-section">
          <div v-if="isAuthenticated" class="user-authenticated">
            <span class="welcome-text">Welcome, {{ currentUser?.firstName || 'User' }}</span>
            <button @click="logout" class="btn-logout">Logout</button>
          </div>
          </div>

        <div class="mobile-menu-button-wrapper">
            <button type="button" @click="toggleMobileMenu" class="mobile-menu-button">
                <span class="sr-only">Open main menu</span>
                <svg v-if="!mobileMenuOpen" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-menu-panel">
        <div class="mobile-menu-links">
            <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
            <router-link to="/dashboard" class="mobile-nav-link" @click="closeMobileMenu">Dashboard</router-link>
            <router-link to="/articles" class="mobile-nav-link" @click="closeMobileMenu">Articles</router-link>
            <router-link to="/feedback" class="mobile-nav-link" @click="closeMobileMenu">Talk to Us</router-link>
        </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavbarPage',
  data() {
    return {
      mobileMenuOpen: false
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
      this.mobileMenuOpen = false; // Close mobile menu on logout
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    }
  }
}
</script>

<style scoped>

/* Base Navbar Styles */
.navbar {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 1000; /* Ensure navbar stays on top */
  position: sticky; /* Makes it stick to the top when scrolling */
  top: 0;
}

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem; /* h-16 */
}

/* Brand/Logo Section */
.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit; /* Inherit color, or set specific */
  line-height: 1; /* Prevents extra space below image */
}

.brand-logo {
  height: 2rem; /* h-8 */
  width: auto;
  margin-right: 0.5rem; /* space-x-2 */
}

.brand-name {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 800; /* font-extrabold */
  color: #1a202c; /* gray-900 */
  letter-spacing: -0.025em; /* tracking-tight */
  white-space: nowrap; /* Prevent wrapping */
}

/* Navigation Links (Desktop) */
.navbar-links {
  display: flex;
  flex-grow: 1; /* Allows links to take available space */
  justify-content: center;
  gap: 2.5rem; /* space-x-10 */
}

.nav-link {
  color: #4a5568; /* gray-700 */
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  border-radius: 0.375rem;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background-color: #fcdde5; /* light rose */
  color: #f43f5e; /* rose-500 */
}

/* User Section */
.navbar-user-section {
    display: flex;
    align-items: center;
}

.user-authenticated {
    display: flex;
    align-items: center;
    gap: 1rem; /* space-x-4 */
}

.welcome-text {
    color: #4a5568; /* gray-700 */
    font-weight: 500;
    white-space: nowrap; /* Keep text on one line */
}

.btn-logout {
  background-color: #dc2626; /* red-600 */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  white-space: nowrap;
  font-size: 0.875rem; /* default button font size */
}

.btn-logout:hover {
  background-color: #b91c1c; /* red-700 */
}

/* Mobile Menu Specifics */
.mobile-menu-button-wrapper {
    display: none; /* Hidden by default on desktop */
}

.mobile-menu-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem; /* p-2 */
    border-radius: 0.375rem; /* rounded-md */
    color: #a0aec0; /* gray-400 */
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
}

.mobile-menu-button:hover {
    color: #718096; /* gray-500 */
    background-color: #f7fafc; /* gray-100 */
}

.mobile-menu-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); /* indigo-500 ring */
}

.h-6 { height: 1.5rem; } /* SVG icon size */
.w-6 { width: 1.5rem; } /* SVG icon size */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.mobile-menu-panel {
  padding-left: 0.5rem; /* px-2 */
  padding-right: 0.5rem; /* px-2 */
  padding-top: 0.5rem; /* pt-2 */
  padding-bottom: 0.75rem; /* pb-3 */
  border-top: 1px solid #e2e8f0; /* light border for separation */
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem; /* space-y-1 */
}

.mobile-nav-link {
    display: block;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #4a5568;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-exact-active {
    background-color: #e0f2f7; /* Lighter blue/teal for mobile active */
    color: #0d9488; /* Teal-600 or similar */
}

/* Responsive adjustments */
@media (max-width: 767px) { /* md:hidden breakpoint (for medium screens and down) */
  .desktop-only {
    display: none;
  }
  .mobile-menu-button-wrapper {
    display: block;
  }
  .welcome-text {
    display: none; /* Hide welcome text on very small screens */
  }
}
@media (min-width: 768px) { /* md:flex breakpoint */
    .mobile-menu-button-wrapper,
    .mobile-menu-panel {
        display: none;
    }
}
</style>