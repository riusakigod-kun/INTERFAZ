import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const docente = {
  nombre: 'PABLO ELEAZAR',
  apellido: 'ATAUCUSI ROMERO',
  avatar: require('../../assets/images/avatars/docente.png'),
};

const DrawerContent = () => (
  <View style={styles.container}>
    <View style={styles.profile}>
      <Image source={docente.avatar} style={styles.avatar} />
      <View>
        <Text style={styles.nombre}>{docente.nombre}</Text>
        <Text style={styles.apellido}>{docente.apellido}</Text>
      </View>
    </View>
    {/* Aquí puedes agregar más opciones o información personalizada */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    padding: 20,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  nombre: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  apellido: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DrawerContent;