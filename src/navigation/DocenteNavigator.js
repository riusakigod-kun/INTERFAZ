import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/docente/Dashboard';
import Inicio from '../screens/docente/Inicio';
import Alumnos from '../screens/docente/Alumnos';
import Actividades from '../screens/docente/Actividades';
import CrearActividad from '../screens/docente/CrearActividad';
import EditarActividad from '../screens/docente/EditarActividad';
import DetalleActividad from '../screens/docente/DetalleActividad';
import Perfil from '../screens/docente/Perfil';
import Salir from '../screens/docente/Salir'; // Si tienes esta pantalla

const Stack = createStackNavigator();

const DocenteNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="InicioDocente" component={Inicio} />
    <Stack.Screen name="Alumnos" component={Alumnos} />
    <Stack.Screen name="ActividadesDocente" component={Actividades} />
    <Stack.Screen name="CrearActividad" component={CrearActividad} />
    <Stack.Screen name="EditarActividad" component={EditarActividad} />
    <Stack.Screen name="DetalleActividad" component={DetalleActividad} />
    <Stack.Screen name="Perfil" component={Perfil} />
    <Stack.Screen name="Salir" component={Salir} />
  </Stack.Navigator>
);

export default DocenteNavigator;