import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuizComponent from '../components/QuizComponent';

const MultipleChoice = ({ pregunta, opciones, onSelect, seleccion }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Opción múltiple</Text>
    <QuizComponent
      pregunta={pregunta}
      opciones={opciones}
      onSelect={onSelect}
      seleccion={seleccion}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});

export default MultipleChoice;