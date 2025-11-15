import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import EstanqueCard from "~/ui/components/EstanqueCard";

const HomeScreen = ({ navigation }) => {
  const estanque1Data = {
    id: 1,
    title: "Estanque 1",
    status: "Normal",
    lastUpdate: "hace 2 minutos",
    collapsedMetrics: [
      { label: "pH", value: "7.2" },
      { label: "Temp", value: "28°C" },
      { label: "OD", value: "6.5 mg/L" },
      { label: "EC", value: "1500 µS/cm" },
      { label: "Turbidez", value: "30 NTU" },
    ],
    expandedMetrics: [
      {
        label: "Temperatura",
        value: "28°C",
        icon: "thermometer",
        level: 0.5, // 0.5 = 50% (en rango)
        color: "#81C784", // Verde
      },
      {
        label: "pH",
        value: "7.2",
        icon: "water-percent",
        level: 0.6,
        color: "#81C784", // Verde
      },
      {
        label: "Oxígeno Disuelto (OD)",
        value: "6.5 mg/L",
        icon: "air-filter",
        level: 0.7,
        color: "#81C784", // Verde
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Mis Estanques</Text>
        </View>

        <EstanqueCard data={estanque1Data} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  screenHeader: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
});

export default HomeScreen;
