import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginDocente } from '../../../services/api/usuario/usuarioService';

const LoginDocente = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!dni.trim() || !password.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (dni.length !== 8) {
      alert('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);
    try {
      console.log('Intentando login con DNI:', dni);
      const response = await loginDocente(dni, password);
      console.log('Login exitoso, respuesta:', response);
      alert('Login exitoso');
      navigate('/docente/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      
      // Manejo de errores más específico
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        console.log('Respuesta del servidor:', data);
        
        if (status === 400) {
          if (typeof data === 'string') {
            alert(`Error: ${data}`);
          } else {
            alert(`Error: ${data.message || data || 'Datos inválidos'}`);
          }
        } else if (status === 401) {
          alert('DNI o contraseña incorrectos');
        } else {
          alert(`Error del servidor: ${data || 'Error interno'}`);
        }
      } else if (error.request) {
        alert('No se puede conectar con el servidor. Verifica tu conexión.');
      } else {
        alert('Error en el login: ' + error.message);
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
          <form style={styles.form} onSubmit={handleLogin}>
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
              placeholder="Contraseña"
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
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
              <button 
                type="button" 
                style={{
                  ...styles.button,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                onClick={() => navigate('/registrodocente')}
                disabled={loading}
              >
                Registrate
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

export default LoginDocente;
