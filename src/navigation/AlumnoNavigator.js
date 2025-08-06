import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardAlumno from '../screens/alumno/AlumnoDhasbord';
import InicioAlumno from '../screens/alumno/InicioAlumno';
import ActividadesAlumno from '../screens/alumno/ActividadesAlumno';
import JuegosPorNiveles from '../screens/alumno/JuegosPorNiveles';
import PerfilAlumno from '../screens/alumno/PerfilAlumno';
import SalirAlumno from '../screens/alumno/SalirAlumno';
import Resultados from '../screens/alumno/Resultados';
import ActividadEnProgreso from '../screens/alumno/ActividadEnProgreso';

const Stack = createStackNavigator();

const AlumnoNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="DashboardAlumno" component={DashboardAlumno} />
    <Stack.Screen name="InicioAlumno" component={InicioAlumno} />
    <Stack.Screen name="ActividadesAlumno" component={ActividadesAlumno} />
    <Stack.Screen name="JuegosPorNiveles" component={JuegosPorNiveles} />
    <Stack.Screen name="PerfilAlumno" component={PerfilAlumno} />
    <Stack.Screen name="SalirAlumno" component={SalirAlumno} />
    <Stack.Screen name="resultados" component={Resultados} />
    <Stack.Screen name="actividadenProgreso" component={ActividadEnProgreso} />
  </Stack.Navigator>
);

export default AlumnoNavigator;