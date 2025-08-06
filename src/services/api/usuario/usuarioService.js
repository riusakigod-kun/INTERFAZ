import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

export const getUserByDni = async (dni) => {
  try {
    const response = await axios.get(`${API_URL}/dni/${dni}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario por DNI:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario por email:', error);
    throw error;
  }
};

export const checkDniExists = async (dni) => {
  try {
    const response = await axios.get(`${API_URL}/existe/dni/${dni}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar existencia por DNI:', error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/existe/email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar existencia por email:', error);
    throw error;
  }
};

export const getUsersByRolAndGrado = async (rol, gradoId) => {
  try {
    const response = await axios.get(`${API_URL}/rol/${rol}/grado/${gradoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al listar usuarios por rol y grado:', error);
    throw error;
  }
};

export const getUsersByRol = async (rol) => {
  try {
    const response = await axios.get(`${API_URL}/rol/${rol}`);
    return response.data;
  } catch (error) {
    console.error('Error al listar usuarios por rol:', error);
    throw error;
  }
};

export const getUsersByGrado = async (gradoId) => {
  try {
    const response = await axios.get(`${API_URL}/grado/${gradoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al listar usuarios por grado:', error);
    throw error;
  }
};

export const getUsersByActiveStatus = async (estado) => {
  try {
    const response = await axios.get(`${API_URL}/activo/${estado}`);
    return response.data;
  } catch (error) {
    console.error('Error al listar usuarios por estado activo:', error);
    throw error;
  }
};

export const getUsersByRolAndActive = async (rol, estado) => {
  try {
    const response = await axios.get(`${API_URL}/rol/${rol}/activo/${estado}`);
    return response.data;
  } catch (error) {
    console.error('Error al listar usuarios por rol y estado activo:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al listar todos los usuarios:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    console.log('Enviando datos al servidor:', userData);
    console.log('URL:', API_URL);
    const response = await axios.post(API_URL, userData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Respuesta exitosa del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error completo:', error);
    console.error('Error al crear usuario:', error.response?.data || error.message);
    console.error('Datos enviados:', userData);
    console.error('Status:', error.response?.status);
    console.error('Response data:', error.response?.data);
    
    // Re-lanzar el error para que sea manejado por el componente
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

export const loginAlumno = async (dni, password) => {
  try {
    console.log('Intentando login de alumno con DNI:', dni);
    const response = await axios.post(`${API_URL}/login/alumno`, {
      dni: dni.trim(),
      password: password
    });
    console.log('Login exitoso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en login de alumno:', error);
    console.error('Status:', error.response?.status);
    console.error('Response data:', error.response?.data);
    throw error;
  }
};

export const loginDocente = async (dni, password) => {
  try {
    console.log('Intentando login de docente con DNI:', dni);
    const response = await axios.post(`${API_URL}/login/docente`, {
      dni: dni.trim(),
      password: password
    });
    console.log('Login exitoso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en login de docente:', error);
    console.error('Status:', error.response?.status);
    console.error('Response data:', error.response?.data);
    throw error;
  }
};