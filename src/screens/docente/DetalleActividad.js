import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEstadisticasActividad } from '../../services/api/actividad/actividadService';

const DetalleActividad = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const actividad = location.state?.actividad;
  
  const [estadisticas, setEstadisticas] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      if (actividad?.id) {
        try {
          const stats = await getEstadisticasActividad(actividad.id);
          setEstadisticas(stats);
        } catch (error) {
          console.error('Error al cargar estadísticas:', error);
          // Usar datos simulados
          setEstadisticas({
            totalSesiones: actividad.estudiantes || 0,
            sesionesCompletadas: actividad.completadas || 0,
            porcentajeCompletado: actividad.estudiantes > 0 ? 
              Math.round((actividad.completadas / actividad.estudiantes) * 100) : 0,
            promedioPuntos: Math.floor(Math.random() * 100) + 50,
            estudiantesUnicos: actividad.estudiantes || 0
          });
        }
      }
      setLoading(false);
    };

    cargarEstadisticas();
  }, [actividad]);

  const handleVolver = () => {
    navigate('/docente/actividades');
  };

  const handleEditar = () => {
    navigate('/docente/editar-actividad', { state: { actividad } });
  };

  if (!actividad) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>Actividad no encontrada</h2>
          <button style={styles.volverButton} onClick={handleVolver}>
            ← Volver a Actividades
          </button>
        </div>
      </div>
    );
  }

  const porcentajeProgreso = estadisticas.porcentajeCompletado || 0;
  const getProgressColor = (porcentaje) => {
    if (porcentaje >= 80) return '#4CAF50';
    if (porcentaje >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleVolver}>
          ← Volver
        </button>
        <h1 style={styles.title}>Detalle de Actividad</h1>
        <button style={styles.editButton} onClick={handleEditar}>
          ✏️ Editar
        </button>
      </div>

      <div style={styles.content}>
        {/* Información principal */}
        <div style={styles.mainInfo}>
          <div style={styles.actividadCard}>
            <img 
              src={actividad.imagen} 
              alt={actividad.titulo}
              style={styles.actividadImagen}
            />
            <div style={styles.actividadInfo}>
              <h2 style={styles.actividadTitulo}>{actividad.titulo}</h2>
              <p style={styles.actividadDescripcion}>{actividad.descripcion}</p>
              
              <div style={styles.metadatos}>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>📚 Categoría:</span>
                  <span style={styles.metaValor}>{actividad.categoria}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>⭐ Nivel:</span>
                  <span style={styles.metaValor}>{actividad.nivel}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>📅 Fecha de creación:</span>
                  <span style={styles.metaValor}>{actividad.fecha}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>🔄 Estado:</span>
                  <span style={{
                    ...styles.estadoBadge,
                    backgroundColor: actividad.estado === 'activa' ? '#4CAF50' : 
                                   actividad.estado === 'borrador' ? '#FF9800' : '#F44336'
                  }}>
                    {actividad.estado.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        {loading ? (
          <div style={styles.loadingStats}>
            <div style={styles.spinner}></div>
            <p>Cargando estadísticas...</p>
          </div>
        ) : (
          <div style={styles.estadisticasSection}>
            <h3 style={styles.sectionTitle}>📊 Estadísticas de Rendimiento</h3>
            
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{estadisticas.estudiantesUnicos || 0}</div>
                <div style={styles.statLabel}>Estudiantes Participantes</div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{estadisticas.sesionesCompletadas || 0}</div>
                <div style={styles.statLabel}>Actividades Completadas</div>
              </div>
              
              <div style={styles.statCard}>
                <div style={{
                  ...styles.statNumber,
                  color: getProgressColor(porcentajeProgreso)
                }}>
                  {porcentajeProgreso}%
                </div>
                <div style={styles.statLabel}>Tasa de Finalización</div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{estadisticas.promedioPuntos || 0}</div>
                <div style={styles.statLabel}>Promedio de Puntos</div>
              </div>
            </div>

            {/* Barra de progreso visual */}
            <div style={styles.progresoVisual}>
              <div style={styles.progresoHeader}>
                <span style={styles.progresoTexto}>Progreso General de la Actividad</span>
                <span style={{
                  ...styles.progresoPercent,
                  color: getProgressColor(porcentajeProgreso)
                }}>
                  {porcentajeProgreso}%
                </span>
              </div>
              <div style={styles.progresoBar}>
                <div 
                  style={{
                    ...styles.progresoFill,
                    width: `${porcentajeProgreso}%`,
                    backgroundColor: getProgressColor(porcentajeProgreso)
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div style={styles.accionesSection}>
          <h3 style={styles.sectionTitle}>⚙️ Acciones Disponibles</h3>
          <div style={styles.accionesGrid}>
            <button style={styles.accionButton} onClick={handleEditar}>
              ✏️ Editar Actividad
            </button>
            <button style={styles.accionButton}>
              📋 Ver Resultados Detallados
            </button>
            <button style={styles.accionButton}>
              📊 Generar Reporte
            </button>
            <button style={{...styles.accionButton, ...styles.duplicateButton}}>
              📄 Duplicar Actividad
            </button>
          </div>
        </div>

        {/* Sugerencias */}
        <div style={styles.sugerenciasSection}>
          <h3 style={styles.sectionTitle}>💡 Sugerencias de Mejora</h3>
          <div style={styles.sugerencias}>
            {porcentajeProgreso < 50 && (
              <div style={styles.sugerencia}>
                <span style={styles.sugerenciaIcon}>⚠️</span>
                <span style={styles.sugerenciaTexto}>
                  La tasa de finalización es baja. Considera revisar la dificultad o agregar más motivación.
                </span>
              </div>
            )}
            {porcentajeProgreso >= 80 && (
              <div style={styles.sugerencia}>
                <span style={styles.sugerenciaIcon}>✅</span>
                <span style={styles.sugerenciaTexto}>
                  ¡Excelente! Esta actividad tiene un alto nivel de finalización.
                </span>
              </div>
            )}
            <div style={styles.sugerencia}>
              <span style={styles.sugerenciaIcon}>🎯</span>
              <span style={styles.sugerenciaTexto}>
                Considera crear actividades similares para mantener el interés de los estudiantes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
  },
  editButton: {
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  mainInfo: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  actividadCard: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
  },
  actividadImagen: {
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '15px',
  },
  actividadInfo: {
    flex: 1,
  },
  actividadTitulo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  actividadDescripcion: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '25px',
  },
  metadatos: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  metaLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555',
    minWidth: '150px',
  },
  metaValor: {
    fontSize: '16px',
    color: '#333',
  },
  estadoBadge: {
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  estadisticasSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '25px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    textAlign: 'center',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
  },
  progresoVisual: {
    marginTop: '20px',
  },
  progresoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  progresoTexto: {
    fontSize: '16px',
    color: '#333',
  },
  progresoPercent: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  progresoBar: {
    width: '100%',
    height: '12px',
    backgroundColor: '#f0f0f0',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  progresoFill: {
    height: '100%',
    transition: 'width 0.3s',
  },
  accionesSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  accionesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  accionButton: {
    padding: '15px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  duplicateButton: {
    backgroundColor: '#4CAF50',
  },
  sugerenciasSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  sugerencias: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  sugerencia: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
  },
  sugerenciaIcon: {
    fontSize: '24px',
  },
  sugerenciaTexto: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.5',
  },
  error: {
    textAlign: 'center',
    color: 'white',
    padding: '60px 20px',
  },
  volverButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  loadingStats: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    color: '#666',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
};

// Agregar keyframes para la animación del spinner
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default DetalleActividad;