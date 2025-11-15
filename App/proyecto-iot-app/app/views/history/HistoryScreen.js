import React from 'react';
import { 
  SafeAreaView, 
  View,
  Text, 
  StyleSheet, 
  // CAMBIO 1: Ya no usamos SafeAreaView
  TouchableOpacity,
  // CAMBIO 2: Importamos Platform y StatusBar
  Platform,
  StatusBar
} from 'react-native';
// import { useMetricHistory } from '~/hooks/useMetricHistory'; 

const HistoryScreen = ({ route, navigation }) => {
  const { estanqueId, estanqueTitle, metricId, metricLabel } = route.params;

  // const { data, isLoading } = useMetricHistory(estanqueId, metricId);
  const isLoading = true;

  return (
    // CAMBIO 3: Esto ahora es un View normal
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"} Regresar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{metricLabel}</Text>
        <Text style={styles.subtitle}>{estanqueTitle}</Text>
        
        <View style={styles.graphContainer}>
          {isLoading ? (
            <Text>Cargando datos históricos...</Text>
          ) : (
            <Text>...Aquí iría tu componente de gráfica...</Text>
          )}
        </View>
        
        <Text style={styles.debugInfo}>
          Debug: estanqueId={estanqueId}, metricId={metricId}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF', 
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 24,
  },
  graphContainer: {
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  debugInfo: {
    marginTop: 20,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  }
});

export default HistoryScreen;