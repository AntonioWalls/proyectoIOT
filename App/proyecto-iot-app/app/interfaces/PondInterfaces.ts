
export interface PondDevice {
  id: string;
  displayName: string;
  etag: string;
  enabled: boolean;
  template: string;
  simulated: boolean;
  provisioned: boolean;
}

export interface AllPondsResponse {
  value: PondDevice[];
}

export interface PondTelemetry {
  Temperature?: { value: number; timestamp: string };
  Conductivity?: { value: number; timestamp: string };
  Turbidity?: { value: number; timestamp: string };
  Salinity?: { value: number; timestamp: string };
  AcidityPH?: { value: number; timestamp: string };
}

export interface TelemetryResponse {
  results: PondTelemetry;
}