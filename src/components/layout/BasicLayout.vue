<template>
  <div class="layout-container">
    <!-- 顶部标题栏 -->
    <div class="header">
      <div class="logo-area">
        <img :src="logoImg" alt="logo" class="logo" />
        <h1 class="system-title">列车全流程信息监控管理</h1>
      </div>
      <div class="time-info">
        <span>{{ currentDate }}</span>
        <span>{{ currentTime }}</span>
        <span>{{ weekDay }}</span>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 左侧面板 -->
      <section class="operation-overview">
        <div class="section-header">
          <h2>实时运行概况</h2>
        </div>
        <div class="status-numbers">
          <div class="status-item">
            <span class="dot running"></span>
            <span class="label">运行中</span>
            <span class="value">45</span>
          </div>
          <div class="status-item">
            <span class="dot loading"></span>
            <span class="label">装卸货</span>
            <span class="value">12</span>
          </div>
          <div class="status-item">
            <span class="dot waiting"></span>
            <span class="label">待发车</span>
            <span class="value">8</span>
          </div>
          <div class="status-item">
            <span class="dot maintenance"></span>
            <span class="label">检修中</span>
            <span class="value">3</span>
          </div>
        </div>
      </section>

      <!-- 中央监控区域 -->
      <section class="monitor-area">
        <div class="section-header">
          <h2>列车实时运行监控</h2>
          <div class="view-controls">
            <el-radio-group v-model="viewMode" size="small">
              <el-radio-button label="2D">2D视图</el-radio-button>
              <el-radio-button label="3D">3D视图</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div ref="trainMap" class="train-map"></div>
      </section>

      <!-- 右侧预警面板 -->
      <section class="alert-panel">
        <div class="section-header">
          <h2>实时预警 <span class="alert-count">3</span></h2>
        </div>
        <div class="alert-list">
          <div v-for="alert in alerts" :key="alert.id" 
               :class="['alert-item', alert.level]">
            <div class="alert-content">
              <div class="alert-type">{{ alert.type }}</div>
              <div class="alert-message">{{ alert.content }}</div>
              <div class="alert-time">{{ alert.time }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  background-color: var(--primary-bg);
  color: var(--text-primary);
}

.header {
  height: 50px;
  background: var(--header-bg);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  height: 32px;
}

.system-title {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0;
}

.time-info {
  display: flex;
  gap: 20px;
  color: var(--text-secondary);
}

.main-content {
  display: grid;
  grid-template-columns: 360px 1fr 360px;
  gap: 16px;
  padding: 16px;
  height: calc(100vh - 50px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 16px;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-numbers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.status-item {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.running { background: var(--primary); }
.dot.loading { background: var(--success); }
.dot.waiting { background: var(--warning); }
.dot.maintenance { background: var(--danger); }

.status-item .label {
  color: var(--text-secondary);
  font-size: 14px;
}

.status-item .value {
  margin-left: auto;
  font-size: 18px;
  font-weight: 500;
}

.monitor-area {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 16px;
}

.train-map {
  height: calc(100% - 50px);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.alert-panel {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 16px;
}

.alert-count {
  background: rgba(250, 173, 20, 0.2);
  border: 1px solid var(--warning);
  color: var(--warning);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 12px;
  border-left: 4px solid transparent;
}

.alert-item.warning { border-left-color: var(--warning); }
.alert-item.danger { border-left-color: var(--danger); }
.alert-item.info { border-left-color: var(--primary); }

.alert-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.alert-type {
  font-size: 12px;
  color: var(--text-secondary);
}

.alert-message {
  font-size: 14px;
}

.alert-time {
  font-size: 12px;
  color: var(--text-third);
}

@media (max-width: 1600px) {
  .main-content {
    grid-template-columns: 320px 1fr 320px;
  }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoImg from '../../assets/images/logo.png'

const viewMode = ref('2D')
const currentDate = ref('')
const currentTime = ref('')
const weekDay = ref('')

const alerts = ref([
  { id: 1, type: '超速预警', level: 'warning', content: '列车 K123 超速运行', time: '10:23:45' },
  { id: 2, type: '故障告警', level: 'danger', content: 'G234 制动系统异常', time: '10:20:31' },
  { id: 3, type: '延误提醒', level: 'info', content: 'D789 预计延误 15 分钟', time: '10:15:22' }
])

const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('zh-CN')
  currentTime.value = now.toLocaleTimeString('zh-CN')
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  weekDay.value = weeks[now.getDay()]
}

let timer = null

onMounted(() => {
  updateDateTime()
  timer = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script> 