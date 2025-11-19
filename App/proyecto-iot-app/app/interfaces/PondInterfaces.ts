export interface Metric {
  id: string;
  value: number | string; 
  level: number;
}

export interface PondDevice {
  id: string | number;
  title: string;
  status: string;
  lastUpdate: any | string; 
  metrics: Metric[];
}

export interface HistoryRecord {
  pondId: string;
  metric: string;
  value: number;
  timestamp: any;
}