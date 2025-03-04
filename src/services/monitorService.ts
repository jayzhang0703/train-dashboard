import request from '@/utils/request'
import type { TrainStatus, AlertMessage } from '@/types/monitor'

export const monitorService = {
  getTrainStatus(): Promise<TrainStatus[]> {
    return request.get('/monitor/trains')
  },

  getAlerts(): Promise<AlertMessage[]> {
    return request.get('/monitor/alerts')
  },

  // WebSocket 连接处理
  connectWebSocket(callback: (data: any) => void) {
    const ws = new WebSocket(process.env.VUE_APP_WS_URL || 'ws://localhost:8080/ws')
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      callback(data)
    }
    
    return ws
  }
} 