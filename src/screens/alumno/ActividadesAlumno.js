import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActividadesAlumno = () => {
  const navigate = useNavigate();

  const actividades = [
    {
      id: 1,
      titulo: 'Aprendemos frutas',
      descripcion: 'Conoce los nombres de las frutas en Quechua',
      fecha: '2025-07-28',
      estado: 'pendiente',
      progreso: 0,
      imagen: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      titulo: 'Saludos básicos',
      descripcion: 'Aprende a saludar en Quechua',
      fecha: '2025-07-25',
      estado: 'en_progreso',
      progreso: 65,
      imagen: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      titulo: 'Números del 1 al 10',
      descripcion: 'Cuenta en Quechua del 1 al 10',
      fecha: '2025-07-20',
      estado: 'pendiente',
      progreso: 0,
      imagen: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleVolver = () => {
    navigate('/alumno/dashboard');
  };

  const handleActividadClick = (actividad) => {
    if (actividad.estado === 'completado') {
      console.log('Ver resultados de', actividad.titulo);
    } else {
      console.log('Iniciar actividad', actividad.titulo);
      
      // Navegar al juego específico según el ID de la actividad
      if (actividad.id === 3) { // Números del 1 al 10
        navigate('/alumno/juego/numeros');
      } else if (actividad.id === 1) { // Aprendemos frutas
        navigate('/alumno/juego/frutas');
      } else if (actividad.id === 2) { // Saludos básicos
        navigate('/alumno/juego/saludos');
      } else {
        // Para otras actividades, puedes agregar más juegos aquí
        console.log(`Juego para ${actividad.titulo} aún no implementado`);
      }
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completado': return '#4CAF50';
      case 'en_progreso': return '#FF9800';
      case 'pendiente': return '#757575';
      default: return '#757575';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'completado': return 'Completado';
      case 'en_progreso': return 'En progreso';
      case 'pendiente': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleVolver}>
          ← Volver
        </button>
        <h1 style={styles.title}>Actividades del Profesor</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.actividadesGrid}>
          {actividades.map((actividad) => (
            <div 
              key={actividad.id} 
              style={styles.actividadCard}
              onClick={() => handleActividadClick(actividad)}
            >
              <div style={styles.imageContainer}>
                <img src={actividad.imagen} alt={actividad.titulo} style={styles.actividadImagen} />
                <div 
                  style={{
                    ...styles.estadoBadge,
                    backgroundColor: getEstadoColor(actividad.estado)
                  }}
                >
                  {getEstadoTexto(actividad.estado)}
                </div>
              </div>
              
              <div style={styles.actividadContent}>
                <h3 style={styles.actividadTitulo}>{actividad.titulo}</h3>
                <p style={styles.actividadDescripcion}>{actividad.descripcion}</p>
                
                <div style={styles.progresoContainer}>
                  <span style={styles.progresoTexto}>Progreso: {actividad.progreso}%</span>
                  <div style={styles.progresoBar}>
                    <div 
                      style={{
                        ...styles.progresoFill,
                        width: `${actividad.progreso}%`,
                        backgroundColor: getEstadoColor(actividad.estado)
                      }}
                    />
                  </div>
                </div>
                
                <div style={styles.actividadFooter}>
                  <span style={styles.fecha}>📅 {actividad.fecha}</span>
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: getEstadoColor(actividad.estado)
                    }}
                  >
                    {actividad.estado === 'completado' ? 'Ver resultados' : 
                     actividad.estado === 'en_progreso' ? 'Continuar' : 'Iniciar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
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
  actividadesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  actividadCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px'
  },
  actividadImagen: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  estadoBadge: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  actividadContent: {
    padding: '20px'
  },
  actividadTitulo: {
    color: '#333',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  },
  actividadDescripcion: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '15px'
  },
  progresoContainer: {
    marginBottom: '15px'
  },
  progresoTexto: {
    fontSize: '12px',
    color: '#666',
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px'
  },
  progresoBar: {
    width: '100%',
    height: '6px',
    background: '#e0e0e0',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progresoFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  actividadFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fecha: {
    fontSize: '12px',
    color: '#888'
  },
  actionButton: {
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

export default ActividadesAlumno;