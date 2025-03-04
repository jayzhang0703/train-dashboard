<template>
  <div class="panel-card">
    <div class="module-header">
      <div class="title-bar">
        <i class="title-icon"></i>
        实时运行概况
      </div>
    </div>
    <div class="status-numbers">
      <div v-for="(item, index) in statusData" 
           :key="item.type" 
           class="status-item"
           :class="{ 'fade-in': show }"
           :style="{ animationDelay: `${index * 0.1}s` }">
        <span :class="['dot', item.type]"></span>
        <span class="label">{{ item.label }}</span>
        <span class="value">
          <CountUp :endVal="item.value" :duration="2" />
        </span>
      </div>
    </div>
    <div class="metrics-chart" ref="metricsChart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import CountUp from 'vue-countup-v3'

const show = ref(false)
const metricsChart = ref(null)
let chart = null

const statusData = ref([
  { type: 'running', label: '运行中', value: 45 },
  { type: 'loading', label: '装卸货', value: 12 },
  { type: 'waiting', label: '待发车', value: 8 },
  { type: 'maintenance', label: '检修中', value: 3 }
])

onMounted(() => {
  show.value = true
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})

const handleResize = () => {
  chart?.resize()
}

const initChart = () => {
  if (!metricsChart.value) return
  
  chart = echarts.init(metricsChart.value)
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLine: {
        lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.65)'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      splitLine: {
        lineStyle: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.65)'
      }
    },
    series: [
      {
        data: [30, 42, 51, 74, 33, 68],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#1890ff',
          width: 2
        },
        itemStyle: {
          color: '#1890ff',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24,144,255,0.3)' },
            { offset: 1, color: 'rgba(24,144,255,0)' }
          ])
        }
      }
    ]
  }
  
  chart.setOption(option)
}
</script>

<style scoped>
.panel-card {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 16px;
}

.module-header {
  margin-bottom: 16px;
}

.title-bar {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fff;
}

.title-icon {
  width: 3px;
  height: 14px;
  background: #1890ff;
  margin-right: 8px;
  border-radius: 2px;
}

.status-numbers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.status-item {
  background: rgba(0, 33, 64, 0.3);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.running { background: #1890ff; }
.dot.loading { background: #52c41a; }
.dot.waiting { background: #faad14; }
.dot.maintenance { background: #f5222d; }

.status-item .label {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}

.status-item .value {
  margin-left: auto;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.metrics-chart {
  height: 200px;
  margin-top: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.status-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style> 