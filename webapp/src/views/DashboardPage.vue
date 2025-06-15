<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mental Health Dashboard</h1>
        <p class="text-gray-600 mt-2">Total mental health cases reported from 2020-2025</p>
      </div>
      
      <!-- Line Chart -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Cases Over Time (Moving Tracker Chart)</h2>
        <div class="chart-container">
          <LineChart :data="lineChartData" :options="lineChartOptions" />
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Pie Chart -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Mental Health Cases by Gender</h2>
          <div class="chart-container">
            <PieChart :data="pieChartData" :options="pieChartOptions" />
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div class="text-center">
              <span class="block font-semibold">Self Harm & Suicide</span>
              <span class="text-red-600">{{ suicideCount }} cases</span>
            </div>
            <div class="text-center">
              <span class="block font-semibold">Anxiety & Depression</span>
              <span class="text-blue-600">{{ anxietyDepressionCount }} cases</span>
            </div>
          </div>
        </div>
        
        <!-- Bar Chart -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Comparison of Generational Cohorts</h2>
          <div class="chart-container">
            <BarChart :data="barChartData" :options="barChartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LineChart from '../components/charts/LineChart.vue'
import PieChart from '../components/charts/PieChart.vue'
import BarChart from '../components/charts/BarChart.vue'

export default {
  name: 'DashboardPage',
  components: {
    LineChart,
    PieChart,
    BarChart
  },
  computed: {
    ...mapState(['dashboardStats']),
    
    lineChartData() {
      const years = ['2020', '2021', '2022', '2023', '2024', '2025']
      const data = years.map(year => {
        const yearData = this.dashboardStats.casesByYear?.find(item => item._id.toString() === year)
        return yearData ? yearData.count : 0
      })
      
      return {
        labels: years,
        datasets: [{
          label: 'Mental Health Cases',
          data: data,
          borderColor: 'rgb(236, 72, 153)',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    },
    
    pieChartData() {
      const genderData = this.dashboardStats.casesByGender || []
      const labels = genderData.map(item => item._id.charAt(0).toUpperCase() + item._id.slice(1))
      const data = genderData.map(item => item.count)
      
      return {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(236, 72, 153, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ]
        }]
      }
    },
    
    barChartData() {
      const ageGroups = this.dashboardStats.casesByAgeGroup || []
      const labels = ageGroups.map(item => {
        const ageGroupNames = {
          'gen_z': 'Gen Z',
          'millennial': 'Millennial',
          'gen_x': 'Gen X',
          'boomer': 'Boomer'
        }
        return ageGroupNames[item._id] || item._id
      })
      const data = ageGroups.map(item => item.count)
      
      return {
        labels: labels,
        datasets: [{
          label: 'Cases by Generation',
          data: data,
          backgroundColor: 'rgba(236, 72, 153, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        }]
      }
    },
    
    suicideCount() {
      const typeData = this.dashboardStats.casesByType || []
      const suicide = typeData.find(item => item._id === 'suicide')?.count || 0
      const selfHarm = typeData.find(item => item._id === 'self_harm')?.count || 0
      return suicide + selfHarm
    },
    
    anxietyDepressionCount() {
      const typeData = this.dashboardStats.casesByType || []
      const anxiety = typeData.find(item => item._id === 'anxiety')?.count || 0
      const depression = typeData.find(item => item._id === 'depression')?.count || 0
      return anxiety + depression
    }
  },
  
  data() {
    return {
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  },
  
  methods: {
    ...mapActions(['fetchDashboardStats'])
  },
  
  async mounted() {
    await this.fetchDashboardStats()
  }
}
</script>
