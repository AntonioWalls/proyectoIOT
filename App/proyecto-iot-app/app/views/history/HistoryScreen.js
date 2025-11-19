import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  StatusBar, 
  ActivityIndicator,
} from 'react-native';
import MetricGraph from '~/ui/components/MetricGraph';
import { useEstanques } from '~/hooks/useEstanques'; 

const formatGraphTime = (timestamp) => {
  if (!timestamp || !timestamp._seconds) return "";
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const HistoryScreen = ({ route, navigation }) => {
  const { estanqueId, estanqueTitle, metricId, metricLabel } = route.params;

  const { getPondHistory } = useEstanques(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiData = await getPondHistory(estanqueId, metricId);
      
      const formattedData = apiData.map(item => ({
        id: item.timestamp._seconds, 
        value: item.value,
        label: formatGraphTime(item.timestamp), 
      }));

      setData(formattedData);
      setIsLoading(false);
    };

    fetchData();
  }, [estanqueId, metricId]); 

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
        
        <View style={styles.graphContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <MetricGraph data={data} />
          )}
        </View>
        
        {!isLoading && data.length > 0 && (
          <Text style={styles.debugInfo}>
            Último registro: {data[0].value} a las {data[0].label}
          </Text>
        )}
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
  },
  debugInfo: {
    marginTop: 20,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  }
});

export default HistoryScreen;