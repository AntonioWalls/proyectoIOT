import { useState, useEffect, useCallback, useMemo } from "react";
import api from "~/services/apiClient";
import type {
  PondDevice,
  AllPondsResponse,
  PondTelemetry,
  TelemetryResponse,
} from "~/interfaces/PondInterfaces";

export const useEstanques = (autoLoad: boolean = true) => {
  const [estanques, setEstanques] = useState<PondDevice[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const getEstanques = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<AllPondsResponse>("/devices");
      setEstanques(data.data.value);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      getEstanques();
    }
  }, [autoLoad, getEstanques]);

  const getLatestTelemetry = async (
    deviceId: string
  ): Promise<PondTelemetry | null> => {
    try {
      const data = await api.post<TelemetryResponse>(
        `/devices/${deviceId}/telemetry`,
        {
          query:
            "SELECT LATEST(Temperature), LATEST(Conductivity), LATEST(Turbidity), LATEST(Salinity), LATEST(AcidityPH) FROM $query",
        }
      );
      return data.data.results;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const pondOptions = useMemo(
    () =>
      estanques.map((pond) => ({
        id: pond.id,
        label: pond.displayName,
        value: pond.id,
      })),
    [estanques]
  );

  return {
    estanques,
    loading,
    error,
    getEstanques,
    getLatestTelemetry,
    pondOptions,
  };
};
