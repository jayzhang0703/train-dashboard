<template>
  <div class="panel-card">
    <div class="module-header">
      <div class="title-bar">
        <i class="title-icon"></i>
        运行效率分析
      </div>
    </div>
    <div class="metrics-content">
      <div class="metrics-cards">
        <div class="metric-card">
          <div class="metric-value">
            <CountUp :endVal="98.5" :decimals="1" :duration="2" suffix="%" />
          </div>
          <div class="metric-label">准点率</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">
            <CountUp :endVal="94.2" :decimals="1" :duration="2" suffix="%" />
          </div>
          <div class="metric-label">运行效率</div>
        </div>
      </div>
      <div class="efficiency-chart" ref="efficiencyChart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import CountUp from 'vue-countup-v3'

const efficiencyChart = ref(null)
let chart = null

onMounted(() => {
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
  if (!efficiencyChart.value) return
  
  chart = echarts.init(efficiencyChart.value)
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
        data: [92, 95, 88, 96, 93, 94],
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
  flex: 1;
  display: flex;
  flex-direction: column;
}

.module-header {
  background: rgba(0, 33, 64, 0.6);
  padding: 12px 16px;
  margin-bottom: 16px;
}

.title-bar {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fff;
}

.title-icon {
  width: 4px;
  height: 16px;
  background: #1890ff;
  margin-right: 8px;
  border-radius: 2px;
}

.metrics-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.metrics-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.metric-card {
  background: rgba(0, 33, 64, 0.3);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 16px;
  text-align: center;
}

.metric-value {
  font-size: 24px;
  font-weight: 500;
  color: #1890ff;
}

.metric-label {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.65);
}

.efficiency-chart {
  flex: 1;
  min-height: 180px;
}
</style> 