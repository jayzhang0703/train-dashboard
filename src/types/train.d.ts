export interface Train {
  id: string
  name: string
  status: 'running' | 'stopped' | 'maintenance'
  currentStation: string
  nextStation: string
  speed: number
  passengers: number
  lastUpdateTime: string
}

export interface Station {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  passengers: number
} 