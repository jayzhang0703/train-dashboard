export interface TrainStatus {
  id: string;
  status: 'empty' | 'loading' | 'loaded' | 'unloading';
  currentStation: string;
  nextStation: string;
  loadingStartTime?: string;
  loadingEndTime?: string;
  progress: number;
  delay: number;
}

export interface AlertMessage {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  trainId?: string;
  station?: string;
} 