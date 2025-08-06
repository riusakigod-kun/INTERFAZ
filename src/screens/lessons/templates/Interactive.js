import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Interactive = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Actividad interactiva</Text>
    {/* Aquí van los elementos interactivos */}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});

export default Interactive;