import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizComponent = ({ pregunta, opciones, onSelect, seleccion }) => (
  <View style={styles.container}>
    <Text style={styles.pregunta}>{pregunta}</Text>
    {opciones.map((opcion, idx) => (
      <TouchableOpacity
        key={idx}
        style={[
          styles.opcion,
          seleccion === idx && styles.opcionSeleccionada,
        ]}
        onPress={() => onSelect(idx)}
      >
        <Text style={styles.textoOpcion}>{opcion}</Text>
      </TouchableOpacity>
    ))}
    {/* Aquí puedes mostrar retroalimentación */}
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  pregunta: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  opcion: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  opcionSeleccionada: {
    backgroundColor: '#cce5ff',
  },
  textoOpcion: { fontSize: 16 },
});

export default QuizComponent;