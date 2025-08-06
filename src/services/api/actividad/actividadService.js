import axios from 'axios';

const API_URL = 'http://localhost:8080/api/actividades';

// Obtener todas las actividades
export const getAllActividades = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    throw error;
  }
};

// Obtener actividad por ID
export const getActividadById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividad por ID:', error);
    throw error;
  }
};

// Obtener actividades por grado
export const getActividadesPorGrado = async (gradoId) => {
  try {
    const response = await axios.get(`${API_URL}/grado/${gradoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades por grado:', error);
    throw error;
  }
};

// Obtener actividades por categoría
export const getActividadesPorCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades por categoría:', error);
    throw error;
  }
};

// Obtener actividades por nivel de dificultad
export const getActividadesPorNivel = async (nivel) => {
  try {
    const response = await axios.get(`${API_URL}/nivel/${nivel}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades por nivel:', error);
    throw error;
  }
};

// Crear nueva actividad
export const createActividad = async (actividadData) => {
  try {
    const response = await axios.post(API_URL, actividadData);
    return response.data;
  } catch (error) {
    console.error('Error al crear actividad:', error);
    throw error;
  }
};

// Actualizar actividad
export const updateActividad = async (id, actividadData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, actividadData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar actividad:', error);
    throw error;
  }
};

// Eliminar actividad
export const deleteActividad = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar actividad:', error);
    throw error;
  }
};

// Obtener estadísticas de una actividad
export const getEstadisticasActividad = async (actividadId) => {
  try {
    // Obtener sesiones de la actividad
    const sesionesResponse = await axios.get(`http://localhost:8080/api/sesiones-alumno/actividad/${actividadId}`);
    
    const sesiones = sesionesResponse.data;
    const totalSesiones = sesiones.length;
    const sesionesCompletadas = sesiones.filter(s => s.completado).length;
    const promedioPuntos = sesiones.length > 0 ? 
      sesiones.reduce((sum, s) => sum + (s.puntosObtenidos || 0), 0) / sesiones.length : 0;
    
    return {
      totalSesiones,
      sesionesCompletadas,
      porcentajeCompletado: totalSesiones > 0 ? (sesionesCompletadas / totalSesiones) * 100 : 0,
      promedioPuntos: Math.round(promedioPuntos),
      estudiantesUnicos: new Set(sesiones.map(s => s.alumnoId)).size
    };
  } catch (error) {
    console.error('Error al obtener estadísticas de actividad:', error);
    return {
      totalSesiones: 0,
      sesionesCompletadas: 0,
      porcentajeCompletado: 0,
      promedioPuntos: 0,
      estudiantesUnicos: 0
    };
  }
};

// Buscar actividades por nombre
export const buscarActividades = async (termino) => {
  try {
    // Como el backend no tiene endpoint de búsqueda específico,
    // obtenemos todas y filtramos
    const response = await axios.get(API_URL);
    const actividades = response.data;
    
    return actividades.filter(actividad => 
      actividad.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      (actividad.descripcion && actividad.descripcion.toLowerCase().includes(termino.toLowerCase()))
    );
  } catch (error) {
    console.error('Error al buscar actividades:', error);
    throw error;
  }
};

// Obtener actividades similares a las del alumno (simulado para mostrar en docente)
export const getActividadesEstilo = () => {
  // Datos simulados que reflejan las actividades que ven los alumnos
  return [
    {
      id: 1,
      nombre: 'Aprendemos frutas',
      descripcion: 'Conoce los nombres de las frutas en Quechua',
      categoria: 'VOCABULARIO',
      nivelDificultad: 'BASICO',
      gradoId: 1,
      fechaCreacion: '2025-07-28',
      urlImagen: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=300&q=80',
      activo: true
    },
    {
      id: 2,
      nombre: 'Saludos básicos',
      descripcion: 'Aprende a saludar en Quechua',
      categoria: 'COMUNICACION',
      nivelDificultad: 'BASICO',
      gradoId: 1,
      fechaCreacion: '2025-07-25',
      urlImagen: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80',
      activo: true
    },
    {
      id: 3,
      nombre: 'Números del 1 al 10',
      descripcion: 'Cuenta en Quechua del 1 al 10',
      categoria: 'MATEMATICAS',
      nivelDificultad: 'BASICO',
      gradoId: 1,
      fechaCreacion: '2025-07-20',
      urlImagen: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=300&q=80',
      activo: true
    },
    {
      id: 4,
      nombre: 'Números del 11 al 100',
      descripcion: 'Aprende números mayores en Quechua',
      categoria: 'MATEMATICAS',
      nivelDificultad: 'INTERMEDIO',
      gradoId: 2,
      fechaCreacion: '2025-07-22',
      urlImagen: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=300&q=80',
      activo: true
    },
    {
      id: 5,
      nombre: 'Frutas y Verduras',
      descripcion: 'Amplía tu vocabulario de alimentos',
      categoria: 'VOCABULARIO',
      nivelDificultad: 'INTERMEDIO',
      gradoId: 2,
      fechaCreacion: '2025-07-24',
      urlImagen: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=300&q=80',
      activo: false
    }
  ];
};
