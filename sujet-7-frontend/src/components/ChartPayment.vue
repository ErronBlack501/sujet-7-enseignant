<template>
  <div class="chart">
    <canvas ref="chartRef"></canvas>
  </div>

</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue';
import type { Teacher } from '@/types/teacher';
import { Chart, LinearScale, BarController, BarElement, CategoryScale, Title } from 'chart.js';

Chart.register(LinearScale, BarController, BarElement, CategoryScale, Title);

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const props = defineProps<{
  teachers: Teacher[];
}>();

const totalPayment = computed(() =>
  props.teachers.reduce((sum, teacher) => sum + (teacher.nombreHeures * teacher.tauxHoraire), 0)
);

const minPayment = computed(() => {
  if (props.teachers.length === 0) return 0;
  return Math.min(...props.teachers.map(t => t.nombreHeures * t.tauxHoraire));
});

const maxPayment = computed(() => {
  if (props.teachers.length === 0) return 0;
  return Math.max(...props.teachers.map(t => t.nombreHeures * t.tauxHoraire));
});

function renderChart() {
  if (!chartRef.value) return;
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: ["Total", "Max", "Min"],
      datasets: [{
        label: "Prestations des enseignants",
        data: [totalPayment.value, maxPayment.value, minPayment.value],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',   // Bleu clair
          'rgba(75, 192, 192, 0.5)',   // Turquoise
          'rgba(153, 102, 255, 0.5)'
        ],
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Statistiques des prestations',
          font: {
            size: 16
          },
          padding: {
            top: 30,
            bottom: 30
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

watch(() => props.teachers, renderChart, { immediate: true });

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<style scoped>
.chart{
  width: 30em;
  margin: auto;
}
</style>