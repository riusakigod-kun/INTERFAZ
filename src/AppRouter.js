import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlumnoDashboard from './screens/alumno/AlumnoDashboard'; // Ajusta la ruta y nombre según tu proyecto

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/alumno/dashboard" element={<AlumnoDashboard />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;