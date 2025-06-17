<template>
  <div class="min-h-screen bg-gradient-pink">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0">
        <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z" fill="rgba(236, 72, 153, 0.1)"/>
        </svg>
      </div>
      
      <div class="relative container py-20">
        <div class="text-center">
          <div class="mb-8">
            <div class="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              THE AWARENESS SPACE
            </h1>
            <p class="text-xl text-gray-600 mb-8">
              Talian HEAL: Help with Empathy And Love
            </p>
          </div>
          
          <!-- Emergency Contact -->
          <div class="bg-red-500 text-white p-6 rounded-lg mb-12 max-w-md mx-auto">
            <h2 class="text-2xl font-bold mb-2">Emergency Support</h2>
            <p class="text-3xl font-bold">Call: 15555</p>
            <p class="text-sm mt-2">24/7 Mental Health Crisis Line</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats Dashboard -->
    <div class="container py-12">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Mental Health Statistics</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg text-center">
            <h3 class="text-lg font-semibold text-blue-800 mb-2">Today's Cases</h3>
            <p class="text-3xl font-bold text-blue-600">{{ todayCases || 0 }}</p>
            <p class="text-sm text-blue-600 mt-1">Reported today</p>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg text-center">
            <h3 class="text-lg font-semibold text-green-800 mb-2">Total Cases</h3>
            <p class="text-3xl font-bold text-green-600">{{ totalCases || 0 }}</p>
            <p class="text-sm text-green-600 mt-1">All time</p>
          </div>
          
          <div class="bg-red-50 p-6 rounded-lg text-center">
            <h3 class="text-lg font-semibold text-red-800 mb-2">Critical Cases</h3>
            <p class="text-3xl font-bold text-red-600">{{ suicideCases || 0 }}</p>
            <p class="text-sm text-red-600 mt-1">Suicide & Self-harm</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="container py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Need Support?</h3>
          <p class="text-gray-600 mb-6">Access mental health resources and professional support.</p>
          <router-link to="/articles" class="btn btn-primary">Read Articles</router-link>
        </div>
        
        <div class="card">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Share Your Thoughts</h3>
          <p class="text-gray-600 mb-6">Your feedback helps us improve our mental health services.</p>
          <router-link to="/feedback" class="btn btn-success">Give Feedback</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import axios from 'axios';  // Add this line

export default {
  name: 'HomePage',
  data(){
    return{
      todayCases:0,
      totalCases:0,
      criticalCases:0,
    }
  },
async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/mental-health");
      console.log(response.data);  // Log the full response

      // Get the "value" from the response, which contains the indicators data
      const indicators = response.data.value || [];

      // Total number of indicators (total "cases" for all time)
      this.totalCases = indicators.length;

      // Today's cases - if you want to filter based on today's date, but since this is about indicators, you can adjust this logic
      const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
      this.todayCases = indicators.filter((indicator) => {
        // Example: Assuming some fields like reportedDate exist for the indicator (but they don't in your case)
        const caseDate = new Date(indicator.reportedDate).toISOString().split('T')[0];
        return caseDate === today;
      }).length;

      // Critical cases - assuming these are related to "suicide" or "self-harm" indicators
      this.criticalCases = indicators.filter(
        (indicator) => indicator.IndicatorName.toLowerCase().includes("suicide") || indicator.IndicatorName.toLowerCase().includes("self-harm")
      ).length;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

}
</script>
