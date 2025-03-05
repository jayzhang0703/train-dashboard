<template>
  <div class="panel-card">
    <div class="module-header">
      <div class="title-bar">
        <i class="title-icon"></i>
        列车实时运行监控
      </div>
    </div>

    <div class="monitor-content">
      <!-- 顶部控制栏 -->
      <div class="control-bar">
        <div class="view-controls">
          <div 
            v-for="mode in ['2D', '3D']" 
            :key="mode"
            class="view-switch" 
            :class="{ active: viewMode === mode }" 
            @click="switchView(mode)"
          >
            {{ mode }}视图
            <div class="active-bar"></div>
          </div>
        </div>
        <div class="status-indicators">
          <div 
            v-for="(data, status) in statusData" 
            :key="status"
            class="status-item"
          >
            <span 
              class="status-dot" 
              :style="{ background: data.color }"
            ></span>
            <span>{{ data.text }}</span>
            <span class="status-count">{{ data.count }}</span>
          </div>
        </div>
      </div>

      <!-- 地图区域 -->
      <div class="map-container">
        <div ref="trainMap" class="train-map"></div>
        <div class="map-loading" v-if="loading">
          <div class="loading-spinner"></div>
          <span>加载中...</span>
        </div>
      </div>

      <!-- 底部列车信息 -->
      <div class="train-info-container">
        <div v-for="train in trains" 
             :key="train.id" 
             class="train-card"
             :class="train.status">
          <div class="train-header">
            <span class="train-id">{{ train.name }}</span>
            <span class="train-status">{{ train.statusText }}</span>
          </div>
          <div class="train-details">
            <div class="detail-row">
              <span class="label">当前站</span>
              <span class="value">{{ train.currentStation }}</span>
            </div>
            <div class="detail-row">
              <span class="label">下一站</span>
              <span class="value">{{ train.nextStation }}</span>
            </div>
            <div class="detail-row">
              <span class="label">预计到达</span>
              <span class="value">{{ train.eta }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import chinaJson from '../../assets/map/china.json'

const viewMode = ref('2D')
const loading = ref(true)
const trainMap = ref(null)
let mapChart = null

// 静态数据
const statusData = {
  running: { count: 12, color: '#52c41a', text: '运行中' },
  warning: { count: 3, color: '#faad14', text: '预警' },
  stopped: { count: 2, color: '#f5222d', text: '停运' }
}

const trains = ref([
  {
    id: 1,
    name: 'G123',
    status: 'running',
    statusText: '正常运行',
    currentStation: '北京南站',
    nextStation: '天津站',
    eta: '09:45',
    coordinates: [116.405285, 39.904989]
  },
  {
    id: 2,
    name: 'D234',
    status: 'warning',
    statusText: '轻微延误',
    currentStation: '上海虹桥',
    nextStation: '苏州北',
    eta: '10:15',
    coordinates: [121.472644, 31.231706]
  }
])

// 添加路线数据
const trainLines = [
  {
    coords: [
      [116.405285, 39.904989], // 北京
      [117.190182, 39.125596]  // 天津
    ],
    name: 'G123线路'
  },
  {
    coords: [
      [121.472644, 31.231706], // 上海
      [120.585316, 31.298886]  // 苏州
    ],
    name: 'D234线路'
  }
]

// 添加所有站点数据
const stations = [
  {
    name: '北京南站',
    coordinates: [116.405285, 39.904989],
    trainId: 'G123',
    type: 'start'
  },
  {
    name: '天津站',
    coordinates: [117.190182, 39.125596],
    trainId: 'G123',
    type: 'end'
  },
  {
    name: '上海虹桥',
    coordinates: [121.472644, 31.231706],
    trainId: 'D234',
    type: 'start'
  },
  {
    name: '苏州北',
    coordinates: [120.585316, 31.298886],
    trainId: 'D234',
    type: 'end'
  }
]

const initMap = async () => {
  try {
    await nextTick()
    if (!trainMap.value) return
    
    if (mapChart) {
      mapChart.dispose()
    }

    mapChart = echarts.init(trainMap.value)
    echarts.registerMap('china', chinaJson)

    const option = {
      backgroundColor: 'transparent',
      geo: {
        map: 'china',
        roam: true,
        zoom: 2.5,
        center: [116.405285, 39.904989],
        label: {
          show: false
        },
        itemStyle: {
          areaColor: 'rgba(0, 33, 64, 0.8)',
          borderColor: '#1890ff',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#1890ff',
            borderWidth: 1
          },
          label: {
            show: true,
            color: '#fff',
            fontSize: 14,
            backgroundColor: 'rgba(0, 33, 64, 0.65)',
            padding: [4, 8],
            borderRadius: 2
          }
        },
        select: {
          itemStyle: {
            areaColor: 'rgba(255, 255, 255, 0.1)'
          },
          label: {
            show: true,
            color: '#fff'
          }
        }
      },
      series: [
        // 路线
        {
          type: 'lines',
          coordinateSystem: 'geo',
          data: trainLines.map((line, index) => ({
            coords: line.coords,
            lineStyle: {
              color: statusData[trains.value[index].status].color,
              width: 2,
              opacity: 0.8,
              curveness: 0.2
            }
          })),
          effect: {
            show: true,
            period: 3,
            trailLength: 0.5,
            color: '#fff',
            symbolSize: 4,
            symbol: 'arrow'
          }
        },
        // 起始站点
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: stations.filter(s => s.type === 'start').map(station => {
            const train = trains.value.find(t => t.name === station.trainId)
            return {
              name: station.name,
              value: [...station.coordinates, station.name],
              itemStyle: {
                color: statusData[train?.status || 'running'].color
              }
            }
          }),
          symbolSize: 12,
          rippleEffect: {
            brushType: 'stroke',
            scale: 3
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{@[2]}',
            color: '#fff',
            fontSize: 14,
            distance: 10,
            backgroundColor: 'rgba(0, 33, 64, 0.65)',
            padding: [4, 8]
          }
        },
        // 终点站
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: stations.filter(s => s.type === 'end').map(station => {
            const train = trains.value.find(t => t.name === station.trainId)
            return {
              name: station.name,
              value: [...station.coordinates, station.name],
              itemStyle: {
                color: statusData[train?.status || 'running'].color
              }
            }
          }),
          symbol: 'pin', // 使用图钉符号表示终点站
          symbolSize: 14,
          label: {
            show: true,
            position: 'right',
            formatter: '{@[2]}',
            color: '#fff',
            fontSize: 14,
            distance: 10,
            backgroundColor: 'rgba(0, 33, 64, 0.65)',
            padding: [4, 8]
          },
          emphasis: {
            scale: 1.2
          }
        }
      ]
    }

    mapChart.setOption(option)
  } catch (error) {
    console.error('地图初始化失败:', error)
    loading.value = false
  }
}

const init3DMap = async () => {
  try {
    if (!trainMap.value) return
    
    if (mapChart) {
      mapChart.dispose()
    }

    mapChart = echarts.init(trainMap.value)
    echarts.registerMap('china', chinaJson)

    const option = {
      backgroundColor: 'transparent',
      geo3D: {
        show: true,
        map: 'china',
        roam: true,
        itemStyle: {
          areaColor: '#041527',
          opacity: 0.9,
          borderWidth: 1,
          borderColor: '#1890ff'
        },
        regionHeight: 1,
        groundPlane: {
          show: false,
        },
        viewControl: {
          distance: 110,
          alpha: 40,
          beta: 0,
          autoRotate: false,
          damping: 0.8,
          minAlpha: 10,
          maxAlpha: 90
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: true
          },
          ambient: {
            intensity: 0.3
          }
        },
        postEffect: {
          enable: true,
          bloom: {
            enable: true,
            intensity: 0.1
          }
        }
      },
      series: [
        // 3D 弧线
        {
          type: 'lines3D',
          coordinateSystem: 'geo3D',
          effect: {
            show: true,
            constantSpeed: 20,
            trailWidth: 2,
            trailLength: 0.1,
            trailColor: '#fff',
            trailOpacity: 0.5
          },
          blendMode: 'lighter',
          polyline: true,
          lineStyle: {
            width: 2,
            color: '#1890ff',
            opacity: 1
          },
          data: trainLines.map((line, index) => {
            const train = trains.value[index]
            const color = statusData[train.status].color
            const distance = Math.sqrt(
              Math.pow(line.coords[1][0] - line.coords[0][0], 2) +
              Math.pow(line.coords[1][1] - line.coords[0][1], 2)
            )
            const height = distance * 0.15 // 降低弧线高度

            // 生成弧线的点
            const points = []
            for (let i = 0; i <= 50; i++) {
              const t = i / 50
              const x = line.coords[0][0] * (1 - t) + line.coords[1][0] * t
              const y = line.coords[0][1] * (1 - t) + line.coords[1][1] * t
              const z = Math.sin(Math.PI * t) * height
              points.push([x, y, z])
            }

            return {
              coords: points,
              lineStyle: {
                color: color,
                width: 4,
                opacity: 0.8
              }
            }
          })
        },
        // 站点
        {
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          data: stations.map(station => {
            const train = trains.value.find(t => t.name === station.trainId)
            return {
              name: station.name,
              value: [...station.coordinates, 0], // 确保站点在地图表面
              itemStyle: {
                color: statusData[train?.status || 'running'].color,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 1
              }
            }
          }),
          symbol: 'circle',
          symbolSize: 12,
          label: {
            show: true,
            formatter: '{b}',
            position: 'top',
            distance: 8,
            textStyle: {
              color: '#fff',
              fontSize: 14,
              backgroundColor: 'rgba(0,0,0,0.65)',
              padding: [4, 8],
              borderRadius: 2
            }
          },
          itemStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
          }
        }
      ]
    }

    mapChart.setOption(option)
  } catch (error) {
    console.error('3D地图初始化失败:', error)
    loading.value = false
  }
}

const switchView = async (mode) => {
  try {
    viewMode.value = mode
    loading.value = true
    await nextTick()
    
    if (mode === '2D') {
      await initMap()
    } else {
      await init3DMap()
    }
  } catch (error) {
    console.error('视图切换失败:', error)
  } finally {
    loading.value = false
  }
}

const handleResize = () => {
  try {
    mapChart?.resize()
  } catch (error) {
    console.error('地图大小调整失败:', error)
  }
}

onMounted(async () => {
  try {
    await initMap()
  } catch (error) {
    console.error('组件挂载失败:', error)
  } finally {
    loading.value = false
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (mapChart) {
    try {
      mapChart.dispose()
    } catch (error) {
      console.error('地图销毁失败:', error)
    }
    mapChart = null
  }
})
</script>

<style scoped>
.panel-card {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 16px;
  height: 100%;
}

.module-header {
  background: rgba(0, 33, 64, 0.6);
  padding: 12px 16px;
  margin-bottom: 16px;
}

.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.monitor-content {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 33, 64, 0.3);
  border-radius: 4px;
}

.view-controls {
  display: flex;
  gap: 24px;
}

.view-switch {
  position: relative;
  padding: 6px 12px;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: all 0.3s;
}

.view-switch.active {
  color: #1890ff;
}

.active-bar {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #1890ff;
  transition: all 0.3s;
}

.view-switch.active .active-bar {
  width: 100%;
}

.status-indicators {
  display: flex;
  gap: 24px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.running { background: #52c41a; }
.status-dot.warning { background: #faad14; }
.status-dot.stopped { background: #f5222d; }

.status-count {
  font-weight: 500;
  color: #fff;
}

.map-container {
  position: relative;
  flex: 1;
  min-height: 600px; /* 增加地图高度 */
  background: rgba(0, 33, 64, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.train-map {
  width: 100%;
  height: 100%;
}

.train-info-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px;
}

.train-card {
  flex: 0 0 280px;
  background: rgba(0, 33, 64, 0.3);
  border-radius: 4px;
  padding: 16px;
  border-left: 3px solid #52c41a;
}

.train-card.warning {
  border-left-color: #faad14;
}

.train-card.stopped {
  border-left-color: #f5222d;
}

.train-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.train-id {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}

.train-status {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

.train-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-row .label {
  color: rgba(255, 255, 255, 0.45);
}

.detail-row .value {
  color: #fff;
}

.map-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(24, 144, 255, 0.1);
  border-top-color: #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>