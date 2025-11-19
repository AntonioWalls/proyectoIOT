import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  ActivityIndicator 
} from "react-native";
import EstanqueCard from "~/ui/components/EstanqueCard";
import { useEstanques } from "~/hooks/useEstanques"; 

const HomeScreen = ({ navigation }) => {
  const { estanques, loading, error } = useEstanques();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#6B7280' }}>Cargando estanques...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={{ color: '#EF4444', fontSize: 16 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Mis Estanques</Text>
        </View>
        
        {estanques.map((estanque) => (
          <EstanqueCard
            key={estanque.id}
            data={estanque}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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