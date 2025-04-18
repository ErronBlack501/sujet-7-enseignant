<template>
  <div class="chart-card">
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
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
      labels: ["Total", "Max", "Min"], // These are fine in French context
      datasets: [{
        label: "Paiements des enseignants",
        data: [totalPayment.value, maxPayment.value, minPayment.value],
        backgroundColor: [
          'rgba(33, 150, 243, 0.75)',   // Blue
          'rgba(76, 175, 80, 0.75)',    // Green
          'rgba(255, 193, 7, 0.75)'     // Amber
        ],
        borderRadius: 12,
        borderWidth: 2,
        borderColor: [
          'rgba(33, 150, 243, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(255, 193, 7, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(33, 150, 243, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(255, 193, 7, 1)'
        ]
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Statistiques des paiements des enseignants',
          font: {
            size: 20,
            weight: 'bold',
            family: 'Segoe UI, Arial, sans-serif'
          },
          color: '#222',
          padding: {
            top: 20,
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#333',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#2196F3',
          borderWidth: 1
        },

      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#222',
            font: {
              weight: 'bold',
              size: 14
            }
          }
        },
        y: Object.assign({
          beginAtZero: true,
          grid: {
            color: '#e0e0e0',
            borderDash: [5, 5]
          },
          ticks: {
            color: '#222',
            font: {
              size: 13
            }
          }
        } as any)
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
.chart-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(33, 150, 243, 0.08), 0 1.5px 5px rgba(0,0,0,0.06);
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 540px;
  margin: 1.2rem auto 2rem auto;
  border: 1.5px solid #e3e8ee;
  transition: box-shadow 0.2s;
}
.chart-card:hover {
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.14), 0 3px 12px rgba(0,0,0,0.10);
}
.chart-container {
  width: 100%;
  min-height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem 1rem;
}
canvas {
  max-width: 100%;
  background: #fff;
  border-radius: 10px;
}
</style>