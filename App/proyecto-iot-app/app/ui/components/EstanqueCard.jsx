import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import {
  checkCircle as CheckCircle,
  alertCircle as AlertCircle,
  thermometer as Thermometer,
  waterPercent as WaterPercent,
  airFilter as AirFilter,
  flash as Flash,
} from "~/config/icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const METRIC_CONFIG = {
  ph: {
    label: "pH",
    labelDetailed: "pH",
    icon: "water-percent",
  },
  temp: {
    label: "Temp",
    labelDetailed: "Temperatura",
    icon: "thermometer",
  },
  od: {
    label: "OD",
    labelDetailed: "Oxígeno Disuelto (OD)",
    icon: "air-filter",
  },
  ec: {
    label: "EC",
    labelDetailed: "Conductividad (EC)",
    icon: "flash",
  },
  turb: {
    label: "Turbidez",
    labelDetailed: "Turbidez",
    icon: "water-percent",
  },
  default: {
    label: "Métrica",
    labelDetailed: "Métrica Desconocida",
    icon: "flash",
  },
};

const COLORS = {
  normal: "#81C784",
  warning: "#F59E0B",
  critical: "#EF4444",
};

const getMetricColor = (id, level) => {
  if (id === "od") {
    if (level < 0.4) return COLORS.critical;
    if (level < 0.6) return COLORS.warning;
    return COLORS.normal;
  }

  if (level > 0.85) return COLORS.critical;
  if (level > 0.7) return COLORS.warning;
  return COLORS.normal;
};

const getMetricUIProps = (metric) => {
  const config = METRIC_CONFIG[metric.id] || METRIC_CONFIG.default;
  const color = getMetricColor(metric.id, metric.level);

  return {
    ...config,
    color,
  };
};

const StatusBadge = ({ status }) => {
  const isNormal = status === "Normal";
  const containerStyle = isNormal ? styles.badgeNormal : styles.badgeCritic;
  const textStyle = isNormal ? styles.badgeTextNormal : styles.badgeTextCritic;
  const iconColor = isNormal ? "#10B981" : "#EF4444";

  return (
    <View style={[styles.badgeContainer, containerStyle]}>
      {isNormal ? (
        <CheckCircle size={14} color={iconColor} style={{ marginRight: 4 }} />
      ) : (
        <AlertCircle size={14} color={iconColor} style={{ marginRight: 4 }} />
      )}
      <Text style={textStyle}>{status}</Text>
    </View>
  );
};

const CollapsedView = ({ data }) => (
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>{data.title}</Text>
      <StatusBadge status={data.status} />
    </View>
    <View style={styles.metricGrid}>
      {data.metrics.map((metric) => {
        const uiProps = getMetricUIProps(metric);
        return (
          <View key={metric.id} style={styles.metricItemCollapsed}>
            <Text style={styles.metricLabel}>{uiProps.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
          </View>
        );
      })}
    </View>
  </View>
);

const MetricIcon = ({ name, size, color }) => {
  switch (name) {
    case "thermometer":
      return <Thermometer size={size} color={color} />;
    case "water-percent":
      return <WaterPercent size={size} color={color} />;
    case "air-filter":
      return <AirFilter size={size} color={color} />;
    case "flash":
      return <Flash size={size} color={color} />;
    default:
      return <Thermometer size={size} color={color} />;
  }
};

const ExpandedView = ({ data, navigation }) => (
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>{data.title} - Vista Detallada</Text>
      <StatusBadge status={data.status} />
    </View>
    <Text style={styles.timestamp}>Última actualización {data.lastUpdate}</Text>

    <View style={styles.detailedList}>
      {data.metrics.map((metric) => {
        const uiProps = getMetricUIProps(metric);

        const handleMetricPress = () => {
          navigation.navigate("history", {
            estanqueId: data.id,
            estanqueTitle: data.title,
            metricId: metric.id,
            metricLabel: uiProps.labelDetailed,
          });
        };

        return (
          <TouchableOpacity
            key={metric.id}
            style={styles.detailedItem}
            activeOpacity={0.7}
            onPress={handleMetricPress}
          >
            <View style={styles.detailedItemInfo}>
              <MetricIcon name={uiProps.icon} size={32} color={uiProps.color} />
              <View style={styles.detailedItemText}>
                <Text style={styles.detailedLabel}>
                  {uiProps.labelDetailed}
                </Text>
                <Text style={styles.detailedValue}>{metric.value}</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${metric.level * 100}%`,
                    backgroundColor: uiProps.color,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const EstanqueCard = ({ data, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpand}
      style={styles.card}
    >
      {isExpanded ? (
        <ExpandedView data={data} navigation={navigation} /> 
      ) : (
        <CollapsedView data={data} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    flexShrink: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
  },

  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeNormal: {
    backgroundColor: "#E0F2F1",
  },
  badgeCritic: {
    backgroundColor: "#FEE2E2",
  },
  badgeTextNormal: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextCritic: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },

  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  metricItemCollapsed: {
    width: "33.33%",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  metricLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },

  detailedList: {
    marginTop: 8,
  },
  detailedItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  detailedItemInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailedItemText: {
    marginLeft: 12,
  },
  detailedLabel: {
    fontSize: 14,
    color: "#374151",
  },
  detailedValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 4,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
});

export default EstanqueCard;
