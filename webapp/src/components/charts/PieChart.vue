<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  extends: Pie,
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
