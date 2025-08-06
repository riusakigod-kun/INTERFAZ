import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActividadEnProgreso = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Actividad en progreso</Text>
    {/* Pantalla para realizar la actividad actual */}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#777' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
});

export default ActividadEnProgreso;