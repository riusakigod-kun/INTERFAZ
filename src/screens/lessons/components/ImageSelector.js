import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ImageSelector = ({ images, onSelect, seleccion }) => (
  <View style={styles.container}>
    {images.map((img, idx) => (
      <TouchableOpacity
        key={idx}
        style={[
          styles.imageWrapper,
          seleccion === idx && styles.selected,
        ]}
        onPress={() => onSelect(idx)}
      >
        <Image source={img} style={styles.image} />
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  imageWrapper: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    margin: 6,
    padding: 2,
  },
  selected: {
    borderColor: '#2196f3',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
});

export default ImageSelector;