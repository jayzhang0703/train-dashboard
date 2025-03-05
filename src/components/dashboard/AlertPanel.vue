<template>
  <div class="panel-card">
    <div class="module-header">
      <div class="title-bar">
        <i class="title-icon warning"></i>
        实时预警
        <div class="alert-badge">3</div>
      </div>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const alerts = ref([
  { id: 1, type: '超速预警', level: 'warning', content: '列车 K123 超速运行', time: '10:23:45' },
  { id: 2, type: '故障告警', level: 'danger', content: 'G234 制动系统异常', time: '10:20:31' },
  { id: 3, type: '延误提醒', level: 'info', content: 'D789 预计延误 15 分钟', time: '10:15:22' }
])
</script>

<style scoped>
.panel-card {
  background: rgba(0, 33, 64, 0.4);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 16px;
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
  background: #faad14;
  margin-right: 8px;
  border-radius: 2px;
}

.alert-badge {
  margin-left: 8px;
  padding: 2px 8px;
  background: rgba(250, 173, 20, 0.2);
  border: 1px solid #faad14;
  border-radius: 10px;
  font-size: 12px;
  color: #faad14;
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

.alert-item.warning { border-left-color: #faad14; }
.alert-item.danger { border-left-color: #f5222d; }
.alert-item.info { border-left-color: #1890ff; }

.alert-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.alert-type {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

.alert-message {
  font-size: 14px;
  color: #fff;
}

.alert-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}
</style> 