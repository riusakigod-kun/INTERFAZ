import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlumnoDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = '#777';
    e.target.style.transform = 'translateX(5px)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = 'transparent';
    e.target.style.transform = 'translateX(0)';
  };

  return (
    <div style={styles.dashboard}>
      {/* Barra superior */}
      <div style={styles.topBar}>
        <span style={styles.group}>G2~JM01</span>
        <span style={styles.title}>ALUMNO</span>
      </div>
      <div style={styles.content}>
        {/* Barra lateral */}
        <div style={styles.sidebar}>
          <div 
            style={styles.menuItem} 
            onClick={() => handleNavigation('/alumno/actividades')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Actividades del profesor
          </div>
          <div 
            style={styles.menuItem} 
            onClick={() => handleNavigation('/alumno/juegos-niveles')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Juegos por niveles
          </div>
          <div 
            style={styles.menuItem} 
            onClick={() => handleNavigation('/alumno/mis-actividades')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Mis Actividades
          </div>
          <div 
            style={styles.menuItem} 
            onClick={() => handleNavigation('/alumno/perfil')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Perfil
          </div>
          <div 
            style={styles.menuItem} 
            onClick={() => handleNavigation('/')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Salir
          </div>
        </div>
        {/* Panel principal */}
        <div style={styles.mainPanel}>
          <h2 style={styles.sectionTitle}>Actividades recientes</h2>
          <div style={styles.activities}>
            {/* Ejemplo de tarjeta de actividad */}
            <div style={styles.activityCard}>
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Frutas" style={styles.activityImg} />
              <div style={styles.progress}>15%</div>
              <div style={styles.activityInfo}>
                <div style={styles.activityTitle}>Actividad 12</div>
                <div>Aprendemos los nombres de frutas</div>
                <div style={styles.activityDate}>12-07-2025</div>
              </div>
            </div>
            <div style={styles.activityCard}>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="Presentación" style={styles.activityImg} />
              <div style={styles.progress}>17%</div>
              <div style={styles.activityInfo}>
                <div style={styles.activityTitle}>Actividad 11</div>
                <div>Aprendemos a presentarnos</div>
                <div style={styles.activityDate}>11-07-2025</div>
              </div>
            </div>
            {/* Agrega más actividades según tus datos */}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: { width: '100vw', height: '100vh', background: '#555' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#444', color: '#fff', padding: '16px 32px', fontSize: '22px' },
  group: { fontWeight: 'bold' },
  title: { fontWeight: 'bold', letterSpacing: '2px' },
  content: { display: 'flex', height: 'calc(100vh - 60px)' },
  sidebar: { width: '220px', background: '#666', color: '#fff', display: 'flex', flexDirection: 'column', padding: '32px 0', gap: '32px', fontSize: '20px', alignItems: 'center' },
  menuItem: { 
    marginBottom: '24px', 
    cursor: 'pointer',
    padding: '12px 24px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    width: '80%'
  },
  mainPanel: { flex: 1, background: '#888', padding: '32px', overflowY: 'auto' },
  sectionTitle: { color: '#fff', fontSize: '28px', marginBottom: '32px' },
  activities: { display: 'flex', gap: '32px', flexWrap: 'wrap' },
  activityCard: { background: '#222', borderRadius: '24px', overflow: 'hidden', width: '340px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', position: 'relative' },
  activityImg: { width: '100%', height: '160px', objectFit: 'cover' },
  progress: { position: 'absolute', top: '16px', left: '16px', background: '#b99', color: '#fff', borderRadius: '50px', padding: '8px 18px', fontWeight: 'bold', fontSize: '18px' },
  activityInfo: { padding: '18px', color: '#fff' },
  activityTitle: { fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' },
  activityDate: { fontWeight: 'bold', marginTop: '8px' }
};

export default AlumnoDashboard;