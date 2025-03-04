export interface DailyStatistics {
  date: string
  passengerCount: number
  revenue: number
  trainCount: number
  avgDelay: number
}

export interface RevenueData {
  period: string
  amount: number
  type: 'ticket' | 'other'
} 