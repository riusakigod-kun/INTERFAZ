import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllAlumnos, getAlumnosPorGrado, getEstadisticasAlumnos } from '../../services/api/usuario/alumnoService';
import { getAllGrados } from '../../services/api/grado/gradoService';

const Alumnos = () => {
  const location = useLocation();
  const gradoSeleccionado = location.state?.grado || '';

  const [alumnos, setAlumnos] = useState([]);
  const [grados, setGrados] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [filtroGrado, setFiltroGrado] = useState(gradoSeleccionado || 'todos');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar grados
        const gradosData = await getAllGrados();
        setGrados(gradosData);
        
        // Cargar alumnos
        const alumnosData = await getAllAlumnos();
        
        // Transformar datos del backend al formato esperado por el frontend
        const alumnosFormateados = alumnosData.map(alumno => ({
          id: alumno.id,
          dni: alumno.dni,
          nombreCompleto: alumno.nombreCompleto,
          grado: alumno.gradoNombre || 'Sin Grado',
          gradoId: alumno.gradoId,
          fechaRegistro: alumno.fechaRegistro ? new Date(alumno.fechaRegistro).toLocaleDateString() : 'N/A',
          ultimoAcceso: alumno.ultimoAcceso ? new Date(alumno.ultimoAcceso).toLocaleDateString() : 'N/A',
          actividadesCompletadas: Math.floor(Math.random() * 20), // Simulado por ahora
          totalActividades: 20, // Simulado por ahora
          puntosTotales: Math.floor(Math.random() * 3000), // Simulado por ahora
          nivel: ['Básico', 'Intermedio', 'Avanzado'][Math.floor(Math.random() * 3)], // Simulado
          activo: alumno.activo,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${alumno.nombreCompleto.replace(/\s+/g, '')}`
        }));
        
        setAlumnos(alumnosFormateados);
        
        // Cargar estadísticas
        const estadisticasData = await getEstadisticasAlumnos();
        setEstadisticas(estadisticasData);
        
      } catch (error) {
        console.error('Error al cargar datos:', error);
        // Usar datos de fallback en caso de error
        setAlumnos([]);
        setGrados([
          { id: 1, nombre: 'Primer Grado' },
          { id: 2, nombre: 'Segundo Grado' },
          { id: 3, nombre: 'Tercer Grado' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar alumnos basándose en el grado seleccionado en el sidebar
  useEffect(() => {
    if (gradoSeleccionado && gradoSeleccionado !== 'todos') {
      setFiltroGrado(gradoSeleccionado);
    } else if (gradoSeleccionado === 'todos') {
      setFiltroGrado('');
    }
  }, [gradoSeleccionado]);

  const alumnosFiltrados = alumnos.filter(alumno => {
    const cumpleGrado = !filtroGrado || alumno.grado === filtroGrado;
    const cumpleBusqueda = alumno.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          alumno.dni.includes(busqueda);
    return cumpleGrado && cumpleBusqueda;
  });

  const getProgresoColor = (porcentaje) => {
    if (porcentaje >= 80) return '#4CAF50';
    if (porcentaje >= 60) return '#FF9800';
    return '#F44336';
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'Básico': return '#FF9800';
      case 'Intermedio': return '#2196F3';
      case 'Avanzado': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const handleVerPerfil = (alumno) => {
    console.log('Ver perfil de:', alumno.nombreCompleto);
  };

  const handleVerProgreso = (alumno) => {
    console.log('Ver progreso de:', alumno.nombreCompleto);
  };

  const contarPorGrado = (grado) => {
    return alumnos.filter(alumno => alumno.grado === grado).length;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Cargando estudiantes...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          {filtroGrado !== 'todos' ? `Estudiantes de ${filtroGrado}` : 'Lista de Estudiantes'}
        </h1>
        <div style={styles.headerActions}>
          <button style={styles.actionButton}>
            Nuevo Estudiante
          </button>
          <button style={styles.actionButton}>
            Generar código y contraseña
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div style={styles.controles}>
        <div style={styles.filtroContainer}>
          <select 
            value={filtroGrado}
            onChange={(e) => setFiltroGrado(e.target.value)}
            style={styles.filtroSelect}
          >
            <option value="">Todos los grados</option>
            {grados.map(grado => (
              <option key={grado.id} value={grado.nombre}>
                {grado.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.busquedaContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={styles.busquedaInput}
          />
        </div>
      </div>

      {/* Lista de alumnos en formato tabla */}
      <div style={styles.tablaContainer}>
        <div style={styles.tablaHeader}>
          <div style={styles.columnaNumero}>#</div>
          <div style={styles.columnaNombre}>Nombre</div>
          <div style={styles.columnaDni}>DNI</div>
          <div style={styles.columnaFecha}>Fecha de Registro</div>
          <div style={styles.columnaAcciones}>Acciones</div>
        </div>
        
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Cargando estudiantes...</p>
          </div>
        ) : (
          <div style={styles.tablaBody}>
            {alumnosFiltrados.map((alumno, index) => (
              <div key={alumno.id} style={styles.tablaRow}>
                <div style={styles.columnaNumero}>
                  <span style={styles.numeroCirculo}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={styles.columnaNombre}>
                  <span style={styles.nombreTexto}>{alumno.nombreCompleto}</span>
                </div>
                <div style={styles.columnaDni}>
                  <span style={styles.dniTexto}>{alumno.dni}</span>
                </div>
                <div style={styles.columnaFecha}>
                  <span style={styles.fechaTexto}>{alumno.fechaRegistro}</span>
                </div>
                <div style={styles.columnaAcciones}>
                  <button style={styles.restaurarButton}>
                    Restaurar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && alumnosFiltrados.length === 0 && (
        <div style={styles.sinResultados}>
          <p style={styles.sinResultadosTexto}>
            {busqueda 
              ? `No se encontraron estudiantes que coincidan con "${busqueda}"`
              : `No hay estudiantes registrados en ${filtroGrado === 'todos' ? 'ningún grado' : filtroGrado}`
            }
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
    backgroundColor: '#666666',
    padding: '40px',
    color: 'white',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: 'white',
    fontSize: '18px',
    marginTop: '20px',
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
  headerStats: {
    display: 'flex',
    gap: '20px',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '15px 25px',
    borderRadius: '15px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
  },
  controles: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    alignItems: 'center',
  },
  filtroContainer: {
    minWidth: '200px',
  },
  filtroSelect: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#333',
  },
  busquedaContainer: {
    flex: 1,
    maxWidth: '400px',
  },
  busquedaInput: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#333',
  },
  gradosResumen: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  },
  gradoCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backdropFilter: 'blur(10px)',
  },
  gradoNombre: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  gradoCantidad: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '5px',
  },
  gradoLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
  },
  alumnosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '25px',
  },
  alumnoCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s',
  },
  alumnoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  alumnoAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  alumnoInfo: {
    flex: 1,
  },
  alumnoNombre: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0',
  },
  alumnoDni: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 10px 0',
  },
  nivelBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  alumnoDetalles: {
    marginBottom: '20px',
  },
  detalleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  detalleLabel: {
    fontSize: '14px',
    color: '#666',
  },
  detalleValor: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  progresoSection: {
    marginBottom: '20px',
  },
  progresoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  progresoTexto: {
    fontSize: '14px',
    color: '#666',
  },
  progresoPercent: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  progresoBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progresoFill: {
    height: '100%',
    transition: 'width 0.3s',
  },
  alumnoActions: {
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
  progresoButton: {
    backgroundColor: '#4CAF50',
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
  // Nuevos estilos para formato tabular
  tablaContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tablaHeader: {
    display: 'flex',
    backgroundColor: '#f8f9fa',
    padding: '15px 0',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    borderBottom: '2px solid #dee2e6',
  },
  tablaBody: {
    backgroundColor: 'white',
  },
  tablaRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #f0f0f0',
    color: '#333',
    transition: 'background-color 0.2s',
  },
  columnaNumero: {
    width: '80px',
    textAlign: 'center',
    paddingLeft: '20px',
  },
  columnaNombre: {
    flex: 2,
    paddingLeft: '20px',
  },
  columnaDni: {
    flex: 1,
    textAlign: 'center',
  },
  columnaFecha: {
    flex: 1,
    textAlign: 'center',
  },
  columnaAcciones: {
    width: '120px',
    textAlign: 'center',
    paddingRight: '20px',
  },
  numeroCirculo: {
    display: 'inline-block',
    width: '32px',
    height: '32px',
    backgroundColor: '#aaa',
    color: 'white',
    borderRadius: '50%',
    lineHeight: '32px',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  nombreTexto: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  dniTexto: {
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: '4px 12px',
    borderRadius: '15px',
    display: 'inline-block',
  },
  fechaTexto: {
    fontSize: '14px',
    color: '#666',
  },
  restaurarButton: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    padding: '6px 15px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  headerActions: {
    display: 'flex',
    gap: '15px',
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

export default Alumnos;