import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progreso }) => (
  <View style={styles.barContainer}>
    <View style={[styles.bar, { width: `${progreso}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  barContainer: {
    height: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 12,
  },
  bar: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
});

export default ProgressBar;