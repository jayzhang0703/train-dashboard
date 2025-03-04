<template>
  <div class="panel-card">
    <div class="module-header">
      <div class="title-bar">
        <i class="title-icon"></i>
        列车实时运行监控
        <div class="view-controls">
          <el-radio-group v-model="viewMode" size="small">
            <el-radio-button label="2D">2D视图</el-radio-button>
            <el-radio-button label="3D">3D视图</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div ref="trainMap" class="train-map"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('2D')
const trainMap = ref(null)
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

.train-map {
  height: calc(100% - 50px);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.view-controls {
  margin-left: auto;
}
</style> 