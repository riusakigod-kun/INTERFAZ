import React from 'react';
import { useNavigate } from 'react-router-dom';

const JuegosPorNiveles = () => {
  const navigate = useNavigate();

  const niveles = [
    { 
      id: 1, 
      nombre: 'Nivel Básico', 
      descripcion: 'Aprende palabras básicas y saludos simples en Quechua', 
      color: '#4CAF50', 
      completado: 80,
      actividades: [
        { nombre: 'Números 1-10', ruta: '/alumno/juego/numeros', nivel: 'facil' },
        { nombre: 'Frutas Básicas', ruta: '/alumno/juego/frutas', nivel: 'facil' },
        { nombre: 'Saludos Simples', ruta: '/alumno/juego/saludos', nivel: 'facil' }
      ]
    },
    { 
      id: 2, 
      nombre: 'Nivel Intermedio', 
      descripcion: 'Construye frases simples y conversaciones básicas', 
      color: '#FF9800', 
      completado: 45,
      actividades: [
        { nombre: 'Números 11-100', ruta: '/alumno/juego/numeros', nivel: 'intermedio' },
        { nombre: 'Frutas y Verduras', ruta: '/alumno/juego/frutas', nivel: 'intermedio' },
        { nombre: 'Conversaciones Básicas', ruta: '/alumno/juego/saludos', nivel: 'intermedio' }
      ]
    },
    { 
      id: 3, 
      nombre: 'Nivel Avanzado', 
      descripcion: 'Conversaciones complejas y expresiones culturales', 
      color: '#F44336', 
      completado: 20,
      actividades: [
        { nombre: 'Números Complejos', ruta: '/alumno/juego/numeros', nivel: 'dificil' },
        { nombre: 'Alimentos Completos', ruta: '/alumno/juego/frutas', nivel: 'dificil' },
        { nombre: 'Presentaciones Formales', ruta: '/alumno/juego/saludos', nivel: 'dificil' }
      ]
    }
  ];

  const handleNivelClick = (nivel) => {
    // No hacemos nada aquí, el click se maneja en las actividades individuales
    console.log(`Nivel ${nivel.nombre} seleccionado`);
  };

  const handleActividadClick = (actividad) => {
    // Navegar al juego con el nivel específico como parámetro
    navigate(`${actividad.ruta}?nivel=${actividad.nivel}`);
  };

  const handleVolver = () => {
    navigate('/alumno/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleVolver}>
          ← Volver
        </button>
        <h1 style={styles.title}>Juegos por Niveles</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.nivelesGrid}>
          {niveles.map((nivel) => (
            <div 
              key={nivel.id} 
              style={{...styles.nivelCard, borderLeft: `6px solid ${nivel.color}`}}
            >
              <div style={styles.nivelHeader}>
                <h3 style={styles.nivelNombre}>{nivel.nombre}</h3>
                <div style={styles.progreso}>
                  <span style={styles.progresoTexto}>{nivel.completado}%</span>
                  <div style={styles.progresoBar}>
                    <div 
                      style={{
                        ...styles.progresoFill, 
                        width: `${nivel.completado}%`,
                        backgroundColor: nivel.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <p style={styles.nivelDescripcion}>{nivel.descripcion}</p>
              
              <div style={styles.actividadesContainer}>
                <h4 style={styles.actividadesTitle}>Actividades disponibles:</h4>
                <div style={styles.actividadesList}>
                  {nivel.actividades.map((actividad, index) => (
                    <button
                      key={index}
                      style={{
                        ...styles.actividadButton,
                        backgroundColor: nivel.color,
                        opacity: nivel.completado > (index * 30) ? 1 : 0.6
                      }}
                      onClick={() => handleActividadClick(actividad)}
                      disabled={nivel.completado <= (index * 30)}
                    >
                      <span style={styles.actividadEmoji}>
                        {actividad.nombre.includes('Números') ? '🔢' :
                         actividad.nombre.includes('Frutas') ? '�' :
                         actividad.nombre.includes('Saludos') || actividad.nombre.includes('Conversaciones') || actividad.nombre.includes('Presentaciones') ? '👋' : '📚'}
                      </span>
                      <span style={styles.actividadNombre}>{actividad.nombre}</span>
                      <span style={styles.actividadNivel}>
                        {actividad.nivel === 'facil' ? '⭐' :
                         actividad.nivel === 'intermedio' ? '⭐⭐' : '⭐⭐⭐'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={styles.nivelStats}>
                <span style={styles.stat}>🎯 {nivel.actividades.length} actividades</span>
                <span style={styles.stat}>⭐ {Math.floor(nivel.completado / 20)} estrellas</span>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
  nivelesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  nivelCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '25px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  nivelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  nivelNombre: {
    color: '#333',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: 0,
    flex: 1
  },
  progreso: {
    textAlign: 'right',
    minWidth: '80px'
  },
  progresoTexto: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666',
    display: 'block',
    marginBottom: '5px'
  },
  progresoBar: {
    width: '60px',
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
  nivelDescripcion: {
    color: '#666',
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.5'
  },
  actividadesContainer: {
    marginBottom: '20px'
  },
  actividadesTitle: {
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px',
    margin: '0 0 12px 0'
  },
  actividadesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  actividadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  actividadEmoji: {
    fontSize: '18px'
  },
  actividadNombre: {
    flex: 1
  },
  actividadNivel: {
    fontSize: '12px'
  },
  nivelStats: {
    display: 'flex',
    gap: '20px'
  },
  stat: {
    fontSize: '14px',
    color: '#888',
    fontWeight: '500'
  }
};

export default JuegosPorNiveles;