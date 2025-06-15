<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default {
  name: 'LineChart',
  extends: Line,
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
