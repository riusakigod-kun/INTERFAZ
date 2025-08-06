import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// Usar navegación web-compatible como alternativa
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { getAllGrados } from '../../services/api/grado/gradoService';

const docente = {
  nombre: 'PABLO ELEAZAR',
  apellido: 'ATAUCUSI ROMERO',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2NjY2NjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMTIgMTNWMjJIMTBWMTNIMTJaIi8+PC9zdmc+Cjwvc3ZnPg==',
};

// Componente Icon personalizado
const Icon = ({ IconComponent, size = 24, color = '#fff' }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <IconComponent size={size} color={color} />
  </div>
);

const Sidebar = ({ onNavigate }) => {
  const [showGrados, setShowGrados] = useState(false);
  const [grados, setGrados] = useState([]);
  const [loadingGrados, setLoadingGrados] = useState(true);

  // Cargar grados desde la API
  useEffect(() => {
    const cargarGrados = async () => {
      try {
        const gradosData = await getAllGrados();
        setGrados(gradosData);
        console.log('Grados cargados en sidebar:', gradosData);
      } catch (error) {
        console.error('Error al cargar grados en sidebar:', error);
        // Fallback con grados por defecto
        setGrados([
          { id: 1, nombre: 'Primer Grado' },
          { id: 2, nombre: 'Segundo Grado' },
          { id: 3, nombre: 'Tercer Grado' }
        ]);
      } finally {
        setLoadingGrados(false);
      }
    };

    cargarGrados();
  }, []);

  // Función de navegación personalizada que no depende de React Navigation
  const handleNavigation = (route, params = {}) => {
    if (onNavigate) {
      onNavigate(route, params);
    } else {
      // Fallback: puedes usar window.location o history API
      console.log(`Navigating to: ${route}`, params);
    }
  };

  const handleGradoClick = (grado) => {
    handleNavigation('Alumnos', { grado: grado.nombre, gradoId: grado.id });
  };

  return (
    <View style={styles.sidebar}>
      {/* Header Docente */}
      <View style={styles.header}>
        <Image 
          source={{ uri: docente.avatar }} 
          style={styles.avatar}
          defaultSource={{ uri: docente.avatar }}
        />
        <View>
          <Text style={styles.nombre}>{docente.nombre}</Text>
          <Text style={styles.apellido}>{docente.apellido}</Text>
        </View>
      </View>

      {/* Opciones de menú */}
      <View style={styles.menu}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigation('InicioDocente')}
        >
          <Text style={styles.menuText}>🏠 Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => setShowGrados(!showGrados)}
        >
          <Text style={styles.menuText}>👥 Alumnos por Grado</Text>
          <Icon 
            IconComponent={showGrados ? MdExpandLess : MdExpandMore} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
        
        {showGrados && (
          <View style={styles.subMenu}>
            <TouchableOpacity 
              style={styles.subMenuItem} 
              onPress={() => handleNavigation('Alumnos', { grado: 'todos' })}
            >
              <Text style={styles.subMenuText}>📋 Todos los estudiantes</Text>
            </TouchableOpacity>
            
            {loadingGrados ? (
              <View style={styles.loadingGrado}>
                <Text style={styles.loadingText}>Cargando grados...</Text>
              </View>
            ) : (
              grados.map((grado) => (
                <TouchableOpacity 
                  key={grado.id} 
                  style={styles.subMenuItem} 
                  onPress={() => handleGradoClick(grado)}
                >
                  <Text style={styles.subMenuText}>
                    🎓 {grado.nombre}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigation('ActividadesDocente')}
        >
          <Text style={styles.menuText}>📚 Actividades</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigation('CrearActividad')}
        >
          <Text style={styles.menuText}>➕ Crear Actividad</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigation('Perfil')}
        >
          <Text style={styles.menuText}>👤 Mi Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigation('Salir')}
        >
          <Text style={styles.menuText}>🚪 Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: '#333333',
    height: '100vh',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  nombre: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  apellido: {
    color: '#ccc',
    fontSize: 14,
  },
  menu: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: '#555',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  subMenu: {
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 10,
  },
  subMenuItem: {
    padding: 12,
    marginVertical: 2,
    borderRadius: 6,
    backgroundColor: '#444',
  },
  subMenuText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingGrado: {
    padding: 14,
    alignItems: 'center',
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default Sidebar;