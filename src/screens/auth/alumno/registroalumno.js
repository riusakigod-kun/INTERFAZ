import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/api/usuario/usuarioService';
import { getAllGrados } from '../../../services/api/grado/gradoService';

const RegistroAlumno = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gradoId, setGradoId] = useState('');
  const [grados, setGrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingGrados, setLoadingGrados] = useState(true);
  const navigate = useNavigate();

  // Cargar grados al montar el componente
  useEffect(() => {
    const cargarGrados = async () => {
      try {
        const gradosData = await getAllGrados();
        setGrados(gradosData);
        console.log('Grados cargados:', gradosData);
      } catch (error) {
        console.error('Error al cargar grados:', error);
        alert('Error al cargar los grados disponibles');
      } finally {
        setLoadingGrados(false);
      }
    };

    cargarGrados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!nombre.trim() || !apellido.trim() || !dni.trim() || !password.trim() || !gradoId) {
      alert('Por favor, completa todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (dni.length !== 8) {
      alert('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);
    try {
      // Datos que coinciden con UsuarioRequest del backend
      const userData = {
        dni: dni.trim(),
        nombreCompleto: `${nombre.trim()} ${apellido.trim()}`,
        email: null, // No se recolecta email en este formulario
        contrasena: password,
        rol: 'ALUMNO',
        gradoId: parseInt(gradoId), // Convertir a número
        activo: true
      };

      console.log('Datos a enviar:', userData);
      const response = await createUser(userData);
      console.log('Usuario creado exitosamente:', response);
      alert('Registro exitoso');
      navigate('/loginalumno');
      
      // Limpiar campos
      setNombre('');
      setApellido('');
      setDni('');
      setPassword('');
      setConfirmPassword('');
      setGradoId('');
    } catch (error) {
      console.error('Error detallado:', error);
      
      // Manejo de errores más específico
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        console.log('Respuesta del servidor:', data);
        
        if (status === 400) {
          // Si es un string, mostrarlo directamente
          if (typeof data === 'string') {
            alert(`Error: ${data}`);
          } else {
            alert(`Error de validación: ${data.message || data || 'Datos inválidos'}`);
          }
        } else if (status === 409) {
          alert('El DNI ya está registrado');
        } else {
          alert(`Error del servidor: ${data || 'Error interno'}`);
        }
      } else if (error.request) {
        alert('No se puede conectar con el servidor. Verifica tu conexión.');
      } else {
        alert('Error en el registro: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="Alumno" style={styles.logo} />
        </div>
        <div style={styles.rightPanel}>
          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={styles.input}
              placeholder="Nombre"
              required
              disabled={loading}
            />
            <label style={styles.label}>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={e => setApellido(e.target.value)}
              style={styles.input}
              placeholder="Apellido"
              required
              disabled={loading}
            />
            <label style={styles.label}>DNI:</label>
            <input
              type="text"
              value={dni}
              onChange={e => setDni(e.target.value)}
              style={styles.input}
              placeholder="DNI (8 dígitos)"
              maxLength="8"
              pattern="[0-9]{8}"
              required
              disabled={loading}
            />
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Contraseña (mínimo 6 caracteres)"
              minLength="6"
              required
              disabled={loading}
            />
            <label style={styles.label}>Confirmar contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={styles.input}
              placeholder="Confirmar contraseña"
              minLength="6"
              required
              disabled={loading}
            />
            <label style={styles.label}>Grado:</label>
            {loadingGrados ? (
              <div style={styles.loadingText}>Cargando grados...</div>
            ) : (
              <select
                value={gradoId}
                onChange={e => setGradoId(e.target.value)}
                style={styles.select}
                required
                disabled={loading}
              >
                <option value="">Selecciona un grado</option>
                {grados.map(grado => (
                  <option key={grado.id} value={grado.id}>
                    {grado.nombre}
                  </option>
                ))}
              </select>
            )}
            <div style={styles.buttonGroup}>
              <button 
                type="submit" 
                style={{
                  ...styles.button,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    background: 'rgba(0,0,0,0.7)',
    borderRadius: '30px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    overflow: 'hidden',
    width: '800px',
    maxWidth: '95vw',
    minHeight: '400px',
  },
  leftPanel: {
    flex: 1,
    background: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  logo: {
    width: '220px',
    height: '220px',
    objectFit: 'contain',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.1)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  },
  rightPanel: {
    flex: 1,
    background: '#666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  form: {
    width: '100%',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  label: {
    color: 'white',
    fontSize: '18px',
    marginBottom: '4px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    marginBottom: '10px',
    outline: 'none',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    marginBottom: '10px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  loadingText: {
    color: 'white',
    fontSize: '16px',
    textAlign: 'center',
    padding: '10px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px',
    justifyContent: 'center',
  },
  button: {
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default RegistroAlumno;
