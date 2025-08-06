import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditarActividad = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Editar actividad</Text>
    {/* Formulario para editar actividades */}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#777' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
});

export default EditarActividad;