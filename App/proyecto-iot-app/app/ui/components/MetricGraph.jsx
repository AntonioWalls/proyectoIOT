import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

const MetricGraph = ({ data }) => {
  
  const chartValues = data.map(point => point.value).reverse();

  const allLabels = data.map(point => point.timestamp.split(' ')[1]).reverse();

  const chartLabels = allLabels.filter((_, index) => index % 5 === 0);
  
  if (!data || data.length === 0) {
    return null; 
  }

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
    decimalPlaces: 2,
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  }
});

export default MetricGraph;