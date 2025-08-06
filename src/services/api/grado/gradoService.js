import axios from 'axios';

const API_URL = 'http://localhost:8080/api/grados';

export const getAllGrados = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener grados:', error);
    throw error;
  }
};

export const getGradoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener grado por ID:', error);
    throw error;
  }
};

export const createGrado = async (gradoData) => {
  try {
    const response = await axios.post(API_URL, gradoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear grado:', error);
    throw error;
  }
};

export const updateGrado = async (id, gradoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, gradoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar grado:', error);
    throw error;
  }
};

export const deleteGrado = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar grado:', error);
    throw error;
  }
};
