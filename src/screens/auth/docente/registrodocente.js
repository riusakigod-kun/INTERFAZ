import React, { useState } from 'react';
import { createUser } from '../../../services/api/usuario/usuarioService';
import { useNavigate } from 'react-router-dom';

const RegistroDocente = () => {
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!nombre.trim() || !apellido.trim() || !dni.trim() || !password.trim() || !correo.trim()) {
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

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert('Por favor, ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);
    try {
      // Datos que coinciden con UsuarioRequest del backend
      const userData = {
        dni: dni.trim(),
        nombreCompleto: `${nombre.trim()} ${apellido.trim()}`,
        email: correo.trim(),
        contrasena: password, // Usar 'contrasena', no 'password'
        rol: 'DOCENTE',
        gradoId: null, // Los docentes no necesitan grado específico inicialmente
        activo: true
      };

      console.log('Datos a enviar:', userData);
      const response = await createUser(userData);
      console.log('Docente creado exitosamente:', response);
      alert('Docente registrado correctamente');
      navigate('/logindocente');
      
      // Limpiar campos
      setCorreo('');
      setNombre('');
      setApellido('');
      setDni('');
      setPassword('');
      setConfirmPassword('');
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
          alert('El DNI o correo ya están registrados');
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
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Docente" style={styles.logo} />
        </div>
        <div style={styles.rightPanel}>
          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              style={styles.input}
              placeholder="Correo electrónico"
              required
              disabled={loading}
            />
            <div style={styles.nameContainer}>
              <div style={styles.nameField}>
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
              </div>
              <div style={styles.nameField}>
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
              </div>
            </div>
            <div style={styles.dniCodigoContainer}>
              <div style={styles.dniField}>
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
              </div>
            </div>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.inputLarge}
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
              style={styles.inputLarge}
              placeholder="Confirmar contraseña"
              minLength="6"
              required
              disabled={loading}
            />
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
    background: 'rgba(255, 255, 255, 0.9)',
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
  inputLarge: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    marginBottom: '10px',
    outline: 'none',
    width: '100%',
  },
  nameContainer: {
    display: 'flex',
    gap: '10px',
  },
  nameField: {
    flex: 1,
  },
  dniCodigoContainer: {
    display: 'flex',
    gap: '10px',
  },
  dniField: {
    flex: 1,
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

export default RegistroDocente;
