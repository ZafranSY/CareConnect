<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'BarChart',
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$data._chart.destroy()
        this.renderChart(this.data, this.options)
      }
    }
  }
}
</script>
