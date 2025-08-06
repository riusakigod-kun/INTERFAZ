import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Matching = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Emparejar elementos</Text>
    {/* Aquí va la lógica para emparejar elementos */}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});

export default Matching;