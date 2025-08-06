import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Este es un placeholder. Para funcionalidad real, usar librerías como react-native-draggable.
const DragDrop = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Arrastra y suelta aquí</Text>
    {/* Implementa lógica de drag & drop según tu necesidad */}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fafafa', borderRadius: 12 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});

export default DragDrop;