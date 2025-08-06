import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/navigation/Sidebar';
import { getActividadesEstilo } from '../../services/api/actividad/actividadService';

const Dashboard = () => {
  const [actividadesRecientes, setActividadesRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const actividades = getActividadesEstilo();
        // Mostrar solo las 4 más recientes
        setActividadesRecientes(actividades.slice(0, 4));
      } catch (error) {
        console.error('Error al cargar actividades:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, []);

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>Docente</h1>
        </div>
        
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Actividades recientes</h2>
          
          {loading ? (
            <div style={styles.loading}>Cargando actividades...</div>
          ) : (
            <div style={styles.actividadesGrid}>
              {actividadesRecientes.map((actividad, index) => (
                <div key={actividad.id} style={styles.actividadCard}>
                  <img 
                    src={actividad.urlImagen} 
                    alt={actividad.nombre}
                    style={styles.actividadImagen}
                  />
                  <div style={styles.actividadContent}>
                    <h3 style={styles.actividadTitulo}>
                      Actividad {actividad.id + 10}
                    </h3>
                    <p style={styles.actividadDescripcion}>
                      {actividad.nombre}
                    </p>
                    <p style={styles.actividadFecha}>
                      {formatearFecha(actividad.fechaCreacion)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#666666',
    color: 'white',
  },
  header: {
    padding: '20px 40px',
    borderBottom: '1px solid #555',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'right',
  },
  content: {
    padding: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: 'white',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: 'white',
  },
  actividadesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    maxWidth: '800px',
  },
  actividadCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  actividadImagen: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  actividadContent: {
    padding: '20px',
  },
  actividadTitulo: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  actividadDescripcion: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.4',
  },
  actividadFecha: {
    fontSize: '14px',
    color: '#999',
    fontWeight: 'bold',
  },
};

export default Dashboard;