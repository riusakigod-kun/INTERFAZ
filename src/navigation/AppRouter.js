import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../screens/home/Home';
import WebCom from '../screens/auth/webcom';
import LoginAlumno from '../screens/auth/alumno/loginalumno';
import RegistroAlumno from '../screens/auth/alumno/registroalumno';
import LoginDocente from '../screens/auth/docente/logindocente';
import RegistroDocente from '../screens/auth/docente/registrodocente';
import Dashboard from '../screens/docente/Dashboard';
import Inicio from '../screens/docente/Inicio';
import Actividades from '../screens/docente/Actividades';
import Alumnos from '../screens/docente/Alumnos';
import Perfil from '../screens/docente/Perfil';
import AlumnoDashboard from '../screens/alumno/DashboardAlumno';
import ActividadesAlumno from '../screens/alumno/ActividadesAlumno';
import JuegosPorNiveles from '../screens/alumno/JuegosPorNiveles';
import MisActividades from '../screens/alumno/MisActividades';
import PerfilAlumno from '../screens/alumno/PerfilAlumno';
import InicioAlumno from '../screens/alumno/InicioAlumno';
import JuegoNumeros from '../screens/lessons/tipos/JuegoNumeros';
import JuegoFrutas from '../screens/lessons/tipos/NombresFrutas';
import JuegoSaludos from '../screens/lessons/tipos/Precentarnos';


const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/webcom" element={<WebCom />} />
      <Route path="/loginalumno" element={<LoginAlumno />} />
      <Route path="/registroalumno" element={<RegistroAlumno />} />
      <Route path="/logindocente" element={<LoginDocente />} />
      <Route path="/registrodocente" element={<RegistroDocente />} />
      <Route path="/docente/dashboard" element={<Dashboard />} />
      <Route path="/docente/inicio" element={<Inicio />} />
      <Route path="/docente/actividades" element={<Actividades />} />
      <Route path="/docente/alumnos" element={<Alumnos />} />  
      <Route path="/docente/perfil" element={<Perfil />} />
      <Route path="/alumno/dashboard" element={<AlumnoDashboard />} />
      <Route path="/alumno/inicio" element={<InicioAlumno />} />
      <Route path="/alumno/actividades" element={<ActividadesAlumno />} />
      <Route path="/alumno/juegos-niveles" element={<JuegosPorNiveles />} />
      <Route path="/alumno/mis-actividades" element={<MisActividades />} />
      <Route path="/alumno/perfil" element={<PerfilAlumno />} />
      <Route path="/alumno/juego/numeros" element={<JuegoNumeros />} />
      <Route path="/alumno/juego/frutas" element={<JuegoFrutas />} />      <Route path="/alumno/juego/saludos" element={<JuegoSaludos />} />
      

    </Routes>
  </Router>
);

export default AppRouter;
