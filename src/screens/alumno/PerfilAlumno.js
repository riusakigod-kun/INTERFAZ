import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilAlumno = () => {
  const navigate = useNavigate();
  
  // Datos del perfil (en una app real, esto vendría de un contexto o API)
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Carlos Quispe',
    dni: '78965423',
    email: 'juan.quispe@email.com',
    grado: 'Segundo Grado',
    fechaRegistro: '2025-01-15',
    actividadesCompletadas: 12,
    totalActividades: 20,
    puntosTotales: 1250,
    nivel: 'Intermedio'
  });

  const handleVolver = () => {
    navigate('/alumno/dashboard');
  };

  const handleEditarPerfil = () => {
    console.log('Editar perfil');
  };

  const handleCambiarContrasena = () => {
    console.log('Cambiar contraseña');
  };

  const progreso = Math.round((perfil.actividadesCompletadas / perfil.totalActividades) * 100);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleVolver}>
          ← Volver
        </button>
        <h1 style={styles.title}>Mi Perfil</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.perfilContainer}>
          {/* Tarjeta principal del perfil */}
          <div style={styles.perfilCard}>
            <div style={styles.avatarSection}>
              <div style={styles.avatar}>
                <span style={styles.avatarText}>
                  {perfil.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <h2 style={styles.nombreCompleto}>{perfil.nombre}</h2>
              <span style={styles.nivel}>Nivel: {perfil.nivel}</span>
            </div>
            
            <div style={styles.statsSection}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{perfil.actividadesCompletadas}</span>
                <span style={styles.statLabel}>Actividades Completadas</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{perfil.puntosTotales}</span>
                <span style={styles.statLabel}>Puntos Totales</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{progreso}%</span>
                <span style={styles.statLabel}>Progreso General</span>
              </div>
            </div>
          </div>

          {/* Información detallada */}
          <div style={styles.infoCard}>
            <h3 style={styles.cardTitle}>Información Personal</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>DNI:</span>
                <span style={styles.infoValue}>{perfil.dni}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Email:</span>
                <span style={styles.infoValue}>{perfil.email}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Grado:</span>
                <span style={styles.infoValue}>{perfil.grado}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Fecha de registro:</span>
                <span style={styles.infoValue}>{perfil.fechaRegistro}</span>
              </div>
            </div>
          </div>

          {/* Progreso visual */}
          <div style={styles.progresoCard}>
            <h3 style={styles.cardTitle}>Progreso de Actividades</h3>
            <div style={styles.progresoVisual}>
              <div style={styles.progresoInfo}>
                <span style={styles.progresoTexto}>
                  {perfil.actividadesCompletadas} de {perfil.totalActividades} actividades completadas
                </span>
                <span style={styles.progresoPercent}>{progreso}%</span>
              </div>
              <div style={styles.progresoBar}>
                <div 
                  style={{
                    ...styles.progresoFill,
                    width: `${progreso}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div style={styles.accionesCard}>
            <h3 style={styles.cardTitle}>Configuración</h3>
            <div style={styles.accionesGrid}>
              <button style={styles.accionButton} onClick={handleEditarPerfil}>
                ✏️ Editar Perfil
              </button>
              <button style={styles.accionButton} onClick={handleCambiarContrasena}>
                🔒 Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backdropFilter: 'blur(10px)'
  },
  backButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  },
  title: {
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0
  },
  content: {
    flex: 1,
    padding: '40px',
    overflow: 'auto'
  },
  perfilContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  perfilCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white'
  },
  avatarText: {
    fontSize: '32px'
  },
  nombreCompleto: {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center'
  },
  nivel: {
    color: '#666',
    fontSize: '14px',
    background: '#f0f0f0',
    padding: '5px 15px',
    borderRadius: '20px'
  },
  statsSection: {
    display: 'flex',
    gap: '30px',
    flex: 1
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#667eea'
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center'
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  cardTitle: {
    color: '#333',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  infoLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 'bold'
  },
  infoValue: {
    fontSize: '16px',
    color: '#333'
  },
  progresoCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  progresoVisual: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  progresoInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progresoTexto: {
    fontSize: '14px',
    color: '#666'
  },
  progresoPercent: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#667eea'
  },
  progresoBar: {
    width: '100%',
    height: '10px',
    background: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  progresoFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '5px',
    transition: 'width 0.3s ease'
  },
  accionesCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  accionesGrid: {
    display: 'flex',
    gap: '15px'
  },
  accionButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1
  }
};

export default PerfilAlumno;