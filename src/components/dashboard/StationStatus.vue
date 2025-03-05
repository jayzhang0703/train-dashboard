<template>
  <div class="panel-card">
    <div class="module-header">
      <div class="title-bar">
        <i class="title-icon"></i>
        车站运行状态
      </div>
    </div>
    <div class="station-list">
      <div v-for="station in stations" :key="station.name" class="station-item">
        <div class="station-header">
          <span class="station-name">{{ station.name }}</span>
          <span :class="['status-tag', station.status]">{{ station.statusText }}</span>
        </div>
        <div class="station-info">
          <div class="info-item">
            <span class="label">待发列车</span>
            <span class="value">{{ station.waiting }}</span>
          </div>
          <div class="info-item">
            <span class="label">检修列车</span>
            <span class="value">{{ station.maintenance }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stations = [
  { name: '北京站', status: 'normal', statusText: '正常', waiting: 5, maintenance: 1 },
  { name: '上海站', status: 'busy', statusText: '繁忙', waiting: 8, maintenance: 2 }
]
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

.station-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 40px);
  overflow-y: auto;
}

.station-item {
  background: rgba(0, 33, 64, 0.3);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 4px;
  padding: 12px;
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.status-tag.normal {
  background: rgba(82, 196, 26, 0.1);
  border: 1px solid #52c41a;
  color: #52c41a;
}

.status-tag.busy {
  background: rgba(250, 173, 20, 0.1);
  border: 1px solid #faad14;
  color: #faad14;
}

.station-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item .label {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}

.info-item .value {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}
</style> 