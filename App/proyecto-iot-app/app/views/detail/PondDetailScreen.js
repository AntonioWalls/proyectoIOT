import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PondDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Detalle de Estanque</Text>
       <Button
        title="Ir a historial"
        onPress={() => navigation.navigate('history')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PondDetailScreen;