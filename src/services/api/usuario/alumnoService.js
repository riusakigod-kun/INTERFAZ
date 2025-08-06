import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

// Obtener todos los alumnos
export const getAllAlumnos = async () => {
  try {
    const response = await axios.get(`${API_URL}/rol/ALUMNO`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    throw error;
  }
};

// Obtener alumnos por grado
export const getAlumnosPorGrado = async (gradoId) => {
  try {
    const response = await axios.get(`${API_URL}/rol/ALUMNO/grado/${gradoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener alumnos por grado:', error);
    throw error;
  }
};

// Obtener alumnos activos
export const getAlumnosActivos = async () => {
  try {
    const response = await axios.get(`${API_URL}/rol/ALUMNO/activo/true`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener alumnos activos:', error);
    throw error;
  }
};

// Obtener alumno por ID
export const getAlumnoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener alumno por ID:', error);
    throw error;
  }
};

// Obtener alumno por DNI
export const getAlumnoPorDni = async (dni) => {
  try {
    const response = await axios.get(`${API_URL}/dni/${dni}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener alumno por DNI:', error);
    throw error;
  }
};

// Actualizar alumno
export const updateAlumno = async (id, alumnoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, alumnoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar alumno:', error);
    throw error;
  }
};

// Obtener estadísticas de progreso de un alumno
export const getProgresoAlumno = async (alumnoId) => {
  try {
    // Obtener sesiones completadas
    const sesionesResponse = await axios.get(`http://localhost:8080/api/sesiones-alumno/alumno/${alumnoId}/completado/true`);
    
    // Obtener puntos totales
    const puntosResponse = await axios.get(`http://localhost:8080/api/sesiones-alumno/puntos/alumno/${alumnoId}`);
    
    // Obtener logros
    const logrosResponse = await axios.get(`http://localhost:8080/api/logros/alumno/${alumnoId}`);
    
    return {
      sesionesCompletadas: sesionesResponse.data,
      puntosTotales: puntosResponse.data || 0,
      logros: logrosResponse.data
    };
  } catch (error) {
    console.error('Error al obtener progreso del alumno:', error);
    throw error;
  }
};

// Buscar alumnos por nombre o DNI
export const buscarAlumnos = async (termino) => {
  try {
    // Como el backend no tiene un endpoint específico de búsqueda,
    // obtenemos todos y filtramos en el frontend
    const response = await axios.get(`${API_URL}/rol/ALUMNO`);
    const alumnos = response.data;
    
    return alumnos.filter(alumno => 
      alumno.nombreCompleto.toLowerCase().includes(termino.toLowerCase()) ||
      alumno.dni.includes(termino)
    );
  } catch (error) {
    console.error('Error al buscar alumnos:', error);
    throw error;
  }
};

// Obtener estadísticas generales de alumnos
export const getEstadisticasAlumnos = async () => {
  try {
    const alumnosResponse = await axios.get(`${API_URL}/rol/ALUMNO`);
    const alumnos = alumnosResponse.data;
    
    // Agrupar por grado
    const estadisticasPorGrado = alumnos.reduce((acc, alumno) => {
      const grado = alumno.gradoNombre || 'Sin Grado';
      if (!acc[grado]) {
        acc[grado] = {
          total: 0,
          activos: 0,
          inactivos: 0
        };
      }
      acc[grado].total++;
      if (alumno.activo) {
        acc[grado].activos++;
      } else {
        acc[grado].inactivos++;
      }
      return acc;
    }, {});
    
    return {
      totalAlumnos: alumnos.length,
      alumnosActivos: alumnos.filter(a => a.activo).length,
      alumnosInactivos: alumnos.filter(a => !a.activo).length,
      estadisticasPorGrado
    };
  } catch (error) {
    console.error('Error al obtener estadísticas de alumnos:', error);
    throw error;
  }
};
