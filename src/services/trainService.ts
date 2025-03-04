import request from '@/utils/request'
import type { Train, Station } from '@/types/train'

export const trainService = {
  getTrainList(): Promise<Train[]> {
    return request.get('/trains')
  },

  getTrainDetail(id: string): Promise<Train> {
    return request.get(`/trains/${id}`)
  },

  getStationList(): Promise<Station[]> {
    return request.get('/stations')
  }
} 