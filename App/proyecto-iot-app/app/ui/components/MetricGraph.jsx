import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

const MetricGraph = ({ data }) => {
  
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{color: '#9CA3AF'}}>No hay datos históricos disponibles.</Text>
      </View>
    ); 
  }

  const chartValues = data.map(point => point.value).reverse();

  const allLabels = data.map(point => point.label).reverse();

  const filterModulus = data.length < 6 ? 1 : Math.ceil(data.length / 5);
  const chartLabels = allLabels.filter((_, index) => index % filterModulus === 0);
  
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, 
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 1, 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, 
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4', 
      strokeWidth: '2',
      stroke: '#007AFF', 
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth} 
        height={260}
        chartConfig={chartConfig}
        bezier 
        style={styles.chart}
        withInnerLines={false} 
        yAxisInterval={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  }
});

export default MetricGraph;