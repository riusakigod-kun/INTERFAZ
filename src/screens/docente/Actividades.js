import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllActividades, getActividadesEstilo, getEstadisticasActividad } from '../../services/api/actividad/actividadService';

const Actividades = () => {
  const navigate = useNavigate();

  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Cargar actividades al montar el componente
  useEffect(() => {
    const cargarActividades = async () => {
      try {
        setLoading(true);
        
        // Primero intentamos obtener del backend real
        let actividadesData;
        try {
          actividadesData = await getAllActividades();
          
          // Transformar datos del backend al formato esperado
          actividadesData = actividadesData.map(actividad => ({
            id: actividad.id,
            titulo: actividad.nombre,
            descripcion: actividad.descripcion,
            fecha: actividad.fechaCreacion ? new Date(actividad.fechaCreacion).toLocaleDateString() : 'N/A',
            estado: actividad.activo ? 'activa' : 'pausada',
            categoria: actividad.categoria || 'General',
            nivel: actividad.nivelDificultad === 'BASICO' ? 'Básico' : 
                   actividad.nivelDificultad === 'INTERMEDIO' ? 'Intermedio' : 'Avanzado',
            estudiantes: Math.floor(Math.random() * 50) + 10, // Simulado
            completadas: Math.floor(Math.random() * 30) + 5, // Simulado
            imagen: actividad.urlImagen || 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=300&q=80'
          }));
        } catch (backendError) {
          console.log('Backend no disponible, usando datos simulados');
          // Fallback a datos simulados que reflejan las actividades del alumno
          const actividadesSimuladas = getActividadesEstilo();
          actividadesData = actividadesSimuladas.map(actividad => ({
            id: actividad.id,
            titulo: actividad.nombre,
            descripcion: actividad.descripcion,
            fecha: actividad.fechaCreacion,
            estado: actividad.activo ? 'activa' : 'borrador',
            categoria: actividad.categoria === 'VOCABULARIO' ? 'Vocabulario' :
                      actividad.categoria === 'COMUNICACION' ? 'Comunicación' :
                      actividad.categoria === 'MATEMATICAS' ? 'Matemáticas' : 'General',
            nivel: actividad.nivelDificultad === 'BASICO' ? 'Básico' : 
                   actividad.nivelDificultad === 'INTERMEDIO' ? 'Intermedio' : 'Avanzado',
            estudiantes: actividad.id === 1 ? 25 : actividad.id === 2 ? 30 : actividad.id === 3 ? 28 : 
                        actividad.id === 4 ? 20 : 0,
            completadas: actividad.id === 1 ? 18 : actividad.id === 2 ? 22 : actividad.id === 3 ? 15 : 
                        actividad.id === 4 ? 8 : 0,
            imagen: actividad.urlImagen
          }));
        }
        
        setActividades(actividadesData);
        
      } catch (error) {
        console.error('Error al cargar actividades:', error);
        setActividades([]);
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, []);

  const actividadesFiltradas = actividades.filter(actividad => {
    const cumpleNivel = filtroNivel === 'todos' || actividad.nivel.toLowerCase() === filtroNivel;
    const cumpleEstado = filtroEstado === 'todos' || actividad.estado === filtroEstado;
    return cumpleNivel && cumpleEstado;
  });

  const handleVerDetalles = (actividad) => {
    navigate('/docente/detalle-actividad', { state: { actividad } });
  };

  const handleEditarActividad = (actividad) => {
    navigate('/docente/editar-actividad', { state: { actividad } });
  };

  const handleCrearActividad = () => {
    navigate('/docente/crear-actividad');
  };

  const getProgressColor = (porcentaje) => {
    if (porcentaje >= 80) return '#4CAF50';
    if (porcentaje >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Biblioteca de Actividades</h1>
        <button style={styles.crearButton} onClick={handleCrearActividad}>
          + Crear Nueva Actividad
        </button>
      </div>

      {/* Filtros */}
      <div style={styles.filtros}>
        <div style={styles.filtroGroup}>
          <label style={styles.filtroLabel}>Nivel:</label>
          <select 
            style={styles.filtroSelect}
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
          >
            <option value="todos">Todos los niveles</option>
            <option value="básico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>
        
        <div style={styles.filtroGroup}>
          <label style={styles.filtroLabel}>Estado:</label>
          <select 
            style={styles.filtroSelect}
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos los estados</option>
            <option value="activa">Activas</option>
            <option value="borrador">Borradores</option>
            <option value="pausada">Pausadas</option>
          </select>
        </div>
      </div>

      {/* Lista de actividades */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Cargando actividades...</p>
        </div>
      ) : (
        <div style={styles.actividadesGrid}>
        {actividadesFiltradas.map((actividad) => {
          const porcentajeCompletado = actividad.estudiantes > 0 ? 
            Math.round((actividad.completadas / actividad.estudiantes) * 100) : 0;
          
          return (
            <div key={actividad.id} style={styles.actividadCard}>
              <div style={styles.cardHeader}>
                <img 
                  src={actividad.imagen} 
                  alt={actividad.titulo}
                  style={styles.actividadImagen}
                />
                <div style={{
                  ...styles.estadoBadge,
                  backgroundColor: actividad.estado === 'activa' ? '#4CAF50' : 
                                 actividad.estado === 'borrador' ? '#FF9800' : '#F44336'
                }}>
                  {actividad.estado.toUpperCase()}
                </div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.actividadTitulo}>{actividad.titulo}</h3>
                <p style={styles.actividadDescripcion}>{actividad.descripcion}</p>
                
                <div style={styles.actividadMeta}>
                  <span style={styles.metaItem}>📚 {actividad.categoria}</span>
                  <span style={styles.metaItem}>⭐ {actividad.nivel}</span>
                  <span style={styles.metaItem}>📅 {actividad.fecha}</span>
                </div>

                {actividad.estado === 'activa' && (
                  <div style={styles.estadisticas}>
                    <div style={styles.estadisticaItem}>
                      <span style={styles.estadisticaNumero}>{actividad.estudiantes}</span>
                      <span style={styles.estadisticaLabel}>Estudiantes</span>
                    </div>
                    <div style={styles.estadisticaItem}>
                      <span style={styles.estadisticaNumero}>{actividad.completadas}</span>
                      <span style={styles.estadisticaLabel}>Completadas</span>
                    </div>
                    <div style={styles.estadisticaItem}>
                      <span style={{
                        ...styles.estadisticaNumero,
                        color: getProgressColor(porcentajeCompletado)
                      }}>
                        {porcentajeCompletado}%
                      </span>
                      <span style={styles.estadisticaLabel}>Progreso</span>
                    </div>
                  </div>
                )}

                <div style={styles.cardActions}>
                  <button 
                    style={styles.actionButton}
                    onClick={() => handleVerDetalles(actividad)}
                  >
                    📊 Ver Detalles
                  </button>
                  <button 
                    style={{...styles.actionButton, ...styles.editButton}}
                    onClick={() => handleEditarActividad(actividad)}
                  >
                    ✏️ Editar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {!loading && actividadesFiltradas.length === 0 && (
        <div style={styles.sinResultados}>
          <p style={styles.sinResultadosTexto}>
            No se encontraron actividades con los filtros seleccionados.
          </p>
        </div>
      )}
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
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
  },
  crearButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  filtros: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
  },
  filtroGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  filtroLabel: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  filtroSelect: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'white',
    fontSize: '14px',
  },
  actividadesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '25px',
  },
  actividadCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  cardHeader: {
    position: 'relative',
  },
  actividadImagen: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  estadoBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '25px',
  },
  actividadTitulo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  actividadDescripcion: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  actividadMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  metaItem: {
    fontSize: '12px',
    color: '#888',
    backgroundColor: '#f5f5f5',
    padding: '4px 8px',
    borderRadius: '12px',
  },
  estadisticas: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '15px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  estadisticaItem: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  estadisticaNumero: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  estadisticaLabel: {
    fontSize: '12px',
    color: '#666',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#667eea',
    color: 'white',
    transition: 'background-color 0.3s',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  sinResultados: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#fff',
  },
  sinResultadosTexto: {
    fontSize: '18px',
    opacity: 0.8,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: '#fff',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '18px',
    opacity: 0.8,
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

export default Actividades;