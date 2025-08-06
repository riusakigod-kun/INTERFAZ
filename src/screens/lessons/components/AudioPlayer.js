import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AudioPlayer = ({ playing, onPlayPause }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPlayPause} style={styles.button}>
      <Icon name={playing ? 'pause' : 'play-arrow'} size={32} color="#2196f3" />
    </TouchableOpacity>
    <Text style={styles.label}>{playing ? 'Reproduciendo...' : 'Pausado'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  button: {
    backgroundColor: '#eee',
    borderRadius: 24,
    padding: 8,
  },
  label: { fontSize: 16, color: '#333' },
});

export default AudioPlayer;