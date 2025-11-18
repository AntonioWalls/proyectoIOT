import React, { useState, useEffect } from 'react'; // CAMBIO 1: Importar hooks
import { 
  SafeAreaView, 
  View,
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MetricGraph from '~/ui/components/MetricGraph';
// import { useMetricHistory } from '~/hooks/useMetricHistory'; 

const generateMockHistory = (metricId) => {
  console.log(`Simulando datos para: ${metricId}`);
  let baseValue = 7.0; 
  
  if (metricId === 'temp') {
    baseValue = 28.0; 
  } else if (metricId === 'od') {
    baseValue = 6.5; 
  }

  return Array.from({ length: 20 }, (_, i) => {
    const value = parseFloat((baseValue + (Math.random() - 0.5) * 0.2).toFixed(2));
    const time = `1${i < 10 ? '0' + i : i}:00`; 
    return {
      id: i, 
      timestamp: `Hoy ${time}`,
      value: value,
    };
  }).reverse(); 
};
// --------------------------------------------------

const HistoryScreen = ({ route, navigation }) => {
  const { estanqueId, estanqueTitle, metricId, metricLabel } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const simulatedData = generateMockHistory(metricId);
      setData(simulatedData);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [metricId]);

  return (
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
        
        {/* --- CAMBIO 3: Renderizado de la Gráfica --- */}
        <View style={styles.graphContainer}>
          {isLoading ? (
            // Usamos un indicador de carga nativo
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            // ¡Mostramos nuestro componente de gráfica!
            <MetricGraph data={data} />
          )}
        </View>
        {/* ------------------------------------------- */}
        
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
  // CAMBIO 4: Ajustamos el contenedor
  graphContainer: {
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center', // Centra el ActivityIndicator
    alignItems: 'center',
    // Ya no necesitamos padding, la gráfica lo maneja
  },
  debugInfo: {
    marginTop: 20,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  }
  // (Ya no necesitamos dataScrollView, graphTitle, dataPoint)
});

export default HistoryScreen;