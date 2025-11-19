import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../services/apiClient";
import type { PondDevice, HistoryRecord } from "../interfaces/PondInterfaces";

interface TimestampObj {
  _seconds: number;
  _nanoseconds?: number;
}

const formatTimeAgo = (timestampObj: TimestampObj | null) => {
  if (!timestampObj || !timestampObj._seconds) return "Desconocido";

  const apiDate = new Date(timestampObj._seconds * 1000);
  const now = new Date();

  const diffMs = now.getTime() - apiDate.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "hace un momento";
  if (diffMinutes < 60) return `hace ${diffMinutes} minutos`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `hace ${diffHours} horas`;
  return apiDate.toLocaleDateString();
};

const formatMetricValue = (id: string, value: number): string | number => {
  switch (id) {
    case "temp":
      return `${value}°C`;
    case "od":
      return `${value} mg/L`;
    case "ec":
      return `${value} µS/cm`;
    case "turb":
      return `${value} NTU`;
    case "ph":
      return `${value}`;
    default:
      return value;
  }
};

export const useEstanques = (autoLoad: boolean = true) => {
  const [estanques, setEstanques] = useState<PondDevice[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const getEstanques = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData = (await api.get<PondDevice[]>(
        "/getPondsList"
      )) as unknown as PondDevice[];
      const formattedData = rawData.map((pond) => ({
        ...pond,
        lastUpdate: formatTimeAgo(pond.lastUpdate),
        metrics: pond.metrics.map((m) => ({
          ...m,
          value: formatMetricValue(m.id, m.value as number),
        })),
      }));

      setEstanques(formattedData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al cargar estanques");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      getEstanques();
    }
  }, [autoLoad, getEstanques]);

  const getPondHistory = async (
    pondId: string,
    metricId: string
  ): Promise<HistoryRecord[]> => {
    try {
      const historyData = (await api.get<HistoryRecord[]>("/getHistory", {
        params: {
          pondId: pondId,
          metric: metricId,
        },
      })) as unknown as HistoryRecord[];

      return historyData;
    } catch (err: any) {
      console.error("Error fetching history:", err);
      return [];
    }
  };

  const pondOptions = useMemo(
    () =>
      estanques.map((pond) => ({
        id: pond.id,
        label: pond.title,
        value: pond.id,
        status: pond.status,
      })),
    [estanques]
  );

  return {
    estanques,
    loading,
    error,
    getEstanques,
    getPondHistory,
    pondOptions,
  };
};
