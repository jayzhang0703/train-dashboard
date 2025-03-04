<template>
  <div class="train-status">
    <data-card title="列车状态监控">
      <div class="status-grid">
        <div class="status-item" v-for="status in statusSummary" :key="status.type">
          <div class="status-count">{{ status.count }}</div>
          <div class="status-label">{{ status.label }}</div>
          <div class="status-icon" :class="status.type">
            <i :class="status.icon"></i>
          </div>
        </div>
      </div>
      <div class="status-chart">
        <div ref="chartRef" class="chart-container"></div>
      </div>
    </data-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { TrainStatus } from '@/types/monitor'
import DataCard from '../common/DataCard.vue'
import * as echarts from 'echarts'

const props = defineProps<{
  trainList: TrainStatus[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts

const statusSummary = computed(() => {
  const summary = {
    empty: { count: 0, label: '空车', type: 'empty', icon: 'train-empty' },
    loading: { count: 0, label: '装车中', type: 'loading', icon: 'train-loading' },
    loaded: { count: 0, label: '重车', type: 'loaded', icon: 'train-loaded' },
    unloading: { count: 0, label: '卸车中', type: 'unloading', icon: 'train-unloading' }
  }
  
  props.trainList.forEach(train => {
    summary[train.status].count++
  })
  
  return Object.values(summary)
})

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: statusSummary.value.map(item => ({
          value: item.count,
          name: item.label
        }))
      }
    ]
  }
  
  chart.setOption(option)
}

onMounted(() => {
  initChart()
})
</script>

<style scoped lang="scss">
.train-status {
  .status-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }

  .status-item {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    
    .status-count {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .status-label {
      font-size: 14px;
      color: #999;
    }
    
    .status-icon {
      margin-top: 10px;
      font-size: 24px;
      
      &.empty { color: #1890ff; }
      &.loading { color: #faad14; }
      &.loaded { color: #52c41a; }
      &.unloading { color: #722ed1; }
    }
  }

  .status-chart {
    height: 300px;
    
    .chart-container {
      width: 100%;
      height: 100%;
    }
  }
}
</style> 