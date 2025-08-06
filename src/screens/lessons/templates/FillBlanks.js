import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FillBlanks = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Completa los espacios en blanco</Text>
    {/* Aquí va la lógica para completar espacios en blanco */}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});

export default FillBlanks;