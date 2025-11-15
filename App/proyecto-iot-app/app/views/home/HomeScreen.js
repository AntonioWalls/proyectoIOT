import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import EstanqueCard from "~/ui/components/EstanqueCard";

const estanquesData = [
  {
    id: 1,
    title: "Estanque 1",
    status: "Normal",
    lastUpdate: "hace 2 minutos",
    metrics: [
      { id: "ph", value: "7.1", level: 0.6 },
      { id: "temp", value: "28°C", level: 0.5 },
      { id: "od", value: "6.5 mg/L", level: 0.7 },
      { id: "ec", value: "1500 µS/cm", level: 0.5 },
      { id: "turb", value: "30 NTU", level: 0.3 },
    ],
  },
  {
    id: 2,
    title: "Estanque 2 - Cría",
    status: "Crítico",
    lastUpdate: "hace 5 minutos",
    metrics: [
      { id: "ph", value: "8.5", level: 0.85 },
      { id: "temp", value: "32°C", level: 0.9 },
      { id: "od", value: "4.1 mg/L", level: 0.3 },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Mis Estanques</Text>
        </View>
        {estanquesData.map((estanque) => (
          <EstanqueCard key={estanque.id} data={estanque} />
        ))}
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
    paddingBottom: 24,
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
