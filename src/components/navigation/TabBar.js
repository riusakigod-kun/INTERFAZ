import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const tabs = [
  { label: 'Inicio', icon: 'home', route: 'InicioDocente' },
  { label: 'Alumnos', icon: 'group', route: 'Alumnos' },
  { label: 'Actividades', icon: 'event-note', route: 'ActividadesDocente' },
  { label: 'Salir', icon: 'logout', route: 'Salir' },
];

const TabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.label}
          style={[
            styles.tabItem,
            route.name === tab.route && styles.activeTab,
          ]}
          onPress={() => navigation.navigate(tab.route)}
        >
          <Icon name={tab.icon} size={24} color="#fff" />
          <Text style={styles.tabLabel}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#444',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 6,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
  },
  activeTab: {
    backgroundColor: '#666',
    borderRadius: 8,
  },
});

export default TabBar;