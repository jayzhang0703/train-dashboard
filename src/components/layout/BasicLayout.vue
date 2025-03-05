<template>
  <div class="layout-container">
    <!-- 顶部标题栏 -->
    <div class="header">
      <div class="nav-buttons">
        <button class="nav-btn">按钮1</button>
        <button class="nav-btn">按钮2</button>
        <button class="nav-btn">按钮3</button>
      </div>
      <h1 class="system-title">列车全流程信息监控管理</h1>
      <div class="time-info">
        <span>{{ currentDate }}</span>
        <span>{{ currentTime }}</span>
        <span>{{ weekDay }}</span>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <div class="side-panel">
        <OperationOverview />
        <OperationMetrics />
      </div>
      <TrainMonitor />
      <div class="side-panel">
        <AlertPanel />
        <StationStatus />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import OperationOverview from '../dashboard/OperationOverview.vue'
import OperationMetrics from '../dashboard/OperationMetrics.vue'
import TrainMonitor from '../dashboard/TrainMonitor.vue'
import AlertPanel from '../dashboard/AlertPanel.vue'
import StationStatus from '../dashboard/StationStatus.vue'

const currentDate = ref('')
const currentTime = ref('')
const weekDay = ref('')

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

<style>
/* 全局样式 */
.panel-card {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 16px;
}

.module-header {
  padding: 12px 16px;
  margin-bottom: 16px;
  margin-left: -16px; /* 保持向左对齐 */
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

/* 内容区域保持左对齐 */
.status-numbers,
.metrics-content,
.alert-list,
.station-list {
  margin-left: -16px;
  padding-left: 16px;
}
</style>

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

.nav-buttons {
  display: flex;
  gap: 20px;
}

.nav-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #1890ff;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-btn:hover {
  color: #1890ff;
}

.nav-btn:hover::after {
  width: 100%;
}

.nav-btn.active {
  color: #1890ff;
}

.nav-btn.active::after {
  width: 100%;
}

.system-title {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 1600px) {
  .main-content {
    grid-template-columns: 320px 1fr 320px;
  }
}

/* 添加全局样式 */
.module-title {
  font-size: 16px;
  color: #fff;
  margin: 0;
  height: 40px;
  display: flex;
  align-items: center;
  background: rgba(0, 33, 64, 0.6);
  padding: 0 16px;
  position: relative;
}

.module-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background: #1890ff;
}
</style> 