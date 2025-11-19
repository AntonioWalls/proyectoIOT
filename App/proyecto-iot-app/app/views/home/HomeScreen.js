import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  ActivityIndicator // Importamos el indicador de carga
} from "react-native";
import EstanqueCard from "~/ui/components/EstanqueCard";
import { useEstanques } from "~/hooks/useEstanques"; // Asegúrate de la ruta correcta

const HomeScreen = ({ navigation }) => {
  // Usamos el hook
  const { estanques, loading, error } = useEstanques();

  // Vista de Carga
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#6B7280' }}>Cargando estanques...</Text>
      </SafeAreaView>
    );
  }

  // Vista de Error (Opcional pero recomendada)
  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={{ color: '#EF4444', fontSize: 16 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  // Vista Principal con Datos
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Mis Estanques</Text>
        </View>
        
        {/* Mapeamos los datos REALES del hook */}
        {estanques.map((estanque) => (
          <EstanqueCard
            key={estanque.id}
            data={estanque}
            // Como EstanqueCard usa useNavigation internamente,
            // técnicamente ya no es obligatorio pasar 'navigation',
            // pero no hace daño dejarlo si no has quitado la prop.
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
  // Estilo extra para centrar el loader
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