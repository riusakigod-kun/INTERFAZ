
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WebCom = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.background}>
      <div style={styles.selectionContainer}>
        
            <button style={styles.card} onClick={() => navigate('/loginalumno')}>
          <span style={styles.cardText}>Estudiante</span>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="Estudiante" style={styles.cardIcon} />
        </button>
            <button style={styles.card} onClick={() => navigate('/logindocente')}>
              <span style={styles.cardText}>Docente</span>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Docente" style={styles.cardIcon} />
            </button>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '60px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '32px 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '18px',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    minWidth: '260px',
    minHeight: '180px',
    transition: 'transform 0.2s',
  },
  cardText: {
    fontSize: '22px',
    marginBottom: '10px',
    color: 'white',
    fontWeight: '400',
  },
  cardIcon: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    filter: 'invert(1)',
  },
};

export default WebCom;
