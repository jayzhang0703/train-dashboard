<template>
  <div class="alert-panel">
    <data-card title="实时告警">
      <div class="alert-list">
        <div 
          v-for="alert in alerts" 
          :key="alert.id" 
          class="alert-item"
          :class="alert.type"
        >
          <div class="alert-icon">
            <i :class="getAlertIcon(alert.type)"></i>
          </div>
          <div class="alert-content">
            <div class="alert-message">{{ alert.message }}</div>
            <div class="alert-meta">
              <span>{{ formatTime(alert.timestamp) }}</span>
              <span v-if="alert.trainId">车次: {{ alert.trainId }}</span>
              <span v-if="alert.station">站点: {{ alert.station }}</span>
            </div>
          </div>
        </div>
      </div>
    </data-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AlertMessage } from '@/types/monitor'
import DataCard from '../common/DataCard.vue'

const props = defineProps<{
  alerts: AlertMessage[]
}>()

const getAlertIcon = (type: string) => {
  const icons = {
    warning: 'icon-warning',
    error: 'icon-error',
    info: 'icon-info'
  }
  return icons[type] || 'icon-info'
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString()
}
</script>

<style scoped lang="scss">
.alert-panel {
  .alert-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .alert-item {
    display: flex;
    align-items: flex-start;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 8px;
    
    &.warning {
      background: rgba(250, 173, 20, 0.1);
      border-left: 4px solid #faad14;
    }
    
    &.error {
      background: rgba(245, 34, 45, 0.1);
      border-left: 4px solid #f5222d;
    }
    
    &.info {
      background: rgba(24, 144, 255, 0.1);
      border-left: 4px solid #1890ff;
    }
    
    .alert-icon {
      margin-right: 12px;
      font-size: 20px;
    }
    
    .alert-content {
      flex: 1;
      
      .alert-message {
        font-size: 14px;
        margin-bottom: 4px;
      }
      
      .alert-meta {
        font-size: 12px;
        color: #999;
        
        span {
          margin-right: 12px;
        }
      }
    }
  }
}
</style> 