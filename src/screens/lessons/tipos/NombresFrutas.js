import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const JuegoFrutas = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nivel = searchParams.get('nivel') || 'facil';
  
  // Datos de las frutas por nivel de dificultad
  const frutasPorNivel = {
    facil: [
      { 
        id: 1, 
        quechua: "Mansana", 
        español: "Manzana", 
        imagen: "🍎",
        descripcion: "Fruta roja y dulce"
      },
      { 
        id: 2, 
        quechua: "Platanu", 
        español: "Plátano", 
        imagen: "🍌",
        descripcion: "Fruta amarilla y alargada"
      },
      { 
        id: 3, 
        quechua: "Naranha", 
        español: "Naranja", 
        imagen: "🍊",
        descripcion: "Fruta cítrica de color naranja"
      },
      { 
        id: 4, 
        quechua: "Uvas", 
        español: "Uvas", 
        imagen: "🍇",
        descripcion: "Pequeñas frutas moradas o verdes"
      }
    ],
    intermedio: [
      { 
        id: 1, 
        quechua: "Frutilla", 
        español: "Fresa", 
        imagen: "🍓",
        descripcion: "Fruta roja con pequeñas semillas"
      },
      { 
        id: 2, 
        quechua: "Piña", 
        español: "Piña", 
        imagen: "🍍",
        descripcion: "Fruta tropical con corona"
      },
      { 
        id: 3, 
        quechua: "Durazno", 
        español: "Durazno", 
        imagen: "🍑",
        descripcion: "Fruta suave y jugosa"
      },
      { 
        id: 4, 
        quechua: "Limun", 
        español: "Limón", 
        imagen: "🍋",
        descripcion: "Fruta cítrica muy ácida"
      },
      { 
        id: 5, 
        quechua: "Papa aya", 
        español: "Papaya", 
        imagen: "🥭",
        descripcion: "Fruta tropical grande y dulce"
      },
      { 
        id: 6, 
        quechua: "Sandía", 
        español: "Sandía", 
        imagen: "🍉",
        descripcion: "Fruta grande, verde por fuera, roja por dentro"
      }
    ],
    dificil: [
      { 
        id: 1, 
        quechua: "Tumbo", 
        español: "Tumbo", 
        imagen: "🥝",
        descripcion: "Fruta andina ovalada y peluda"
      },
      { 
        id: 2, 
        quechua: "Aguaymanto", 
        español: "Aguaymanto", 
        imagen: "🟡",
        descripcion: "Fruta pequeña dorada envuelta en hojas"
      },
      { 
        id: 3, 
        quechua: "Chirimoya", 
        español: "Chirimoya", 
        imagen: "💚",
        descripcion: "Fruta con piel verde y pulpa blanca"
      },
      { 
        id: 4, 
        quechua: "Lucuma", 
        español: "Lúcuma", 
        imagen: "🟠",
        descripcion: "Fruta peruana de pulpa amarilla"
      },
      { 
        id: 5, 
        quechua: "Capulí", 
        español: "Capulí", 
        imagen: "🍒",
        descripcion: "Pequeña fruta andina parecida a cereza"
      },
      { 
        id: 6, 
        quechua: "Pacay", 
        español: "Pacay", 
        imagen: "🫛",
        descripcion: "Vaina larga con semillas dulces"
      },
      { 
        id: 7, 
        quechua: "Sacha inchi", 
        español: "Sacha inchi", 
        imagen: "🌰",
        descripcion: "Semilla oleaginosa amazónica"
      },
      { 
        id: 8, 
        quechua: "Camu camu", 
        español: "Camu camu", 
        imagen: "🔴",
        descripcion: "Fruta amazónica rica en vitamina C"
      }
    ]
  };

  const frutasQuechua = frutasPorNivel[nivel] || frutasPorNivel.facil;

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [opciones, setOpciones] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [intentos, setIntentos] = useState(2);
  const [puntuacion, setPuntuacion] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mensajeResultado, setMensajeResultado] = useState('');
  const [mostrandoResultado, setMostrandoResultado] = useState(false);

  // Generar opciones para la pregunta actual
  const generarOpciones = (frutaCorrecta) => {
    const opciones = [frutaCorrecta];
    
    // Agregar 2 opciones incorrectas
    while (opciones.length < 3) {
      const frutaAleatoria = frutasQuechua[Math.floor(Math.random() * frutasQuechua.length)];
      if (!opciones.find(op => op.id === frutaAleatoria.id)) {
        opciones.push(frutaAleatoria);
      }
    }
    
    // Mezclar las opciones
    return opciones.sort(() => Math.random() - 0.5);
  };

  // Inicializar pregunta
  useEffect(() => {
    if (preguntaActual < frutasQuechua.length) {
      const frutaActual = frutasQuechua[preguntaActual];
      setRespuestaCorrecta(frutaActual);
      setOpciones(generarOpciones(frutaActual));
      setRespuestaSeleccionada(null);
      setMostrandoResultado(false);
    } else {
      setJuegoTerminado(true);
    }
  }, [preguntaActual]);

  // Reproducir audio (simulado - en una app real usarías Web Audio API)
  const reproducirAudio = (texto, idioma) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = idioma === 'español' ? 'es-ES' : 'qu-PE'; // Quechua (si está disponible)
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const manejarRespuesta = (opcionSeleccionada) => {
    if (mostrandoResultado) return;
    
    setRespuestaSeleccionada(opcionSeleccionada);
    setMostrandoResultado(true);
    
    if (opcionSeleccionada.id === respuestaCorrecta.id) {
      setMensajeResultado('¡Correcto! 🎉');
      setPuntuacion(puntuacion + 10);
      
      setTimeout(() => {
        setPreguntaActual(preguntaActual + 1);
        setIntentos(2);
      }, 2000);
    } else {
      setIntentos(intentos - 1);
      setMensajeResultado(`❌ Incorrecto. Te quedan ${intentos - 1} intento(s)`);
      
      if (intentos - 1 <= 0) {
        setMensajeResultado(`❌ Sin intentos. La respuesta correcta era: ${respuestaCorrecta.quechua}`);
        setTimeout(() => {
          setPreguntaActual(preguntaActual + 1);
          setIntentos(2);
        }, 3000);
      } else {
        setTimeout(() => {
          setMostrandoResultado(false);
          setRespuestaSeleccionada(null);
        }, 2000);
      }
    }
  };

  const reiniciarJuego = () => {
    setPreguntaActual(0);
    setPuntuacion(0);
    setIntentos(2);
    setJuegoTerminado(false);
    setMensajeResultado('');
    setMostrandoResultado(false);
  };

  const volverActividades = () => {
    navigate('/alumno/actividades');
  };

  if (juegoTerminado) {
    return (
      <div style={styles.container}>
        <div style={styles.resultadoFinal}>
          <h1 style={styles.tituloFinal}>🍎 ¡Juego Completado! 🍊</h1>
          <div style={styles.puntuacionFinal}>
            <span style={styles.puntos}>Puntuación Final: {puntuacion}/{frutasQuechua.length * 10}</span>
            <span style={styles.mensaje}>
              {puntuacion >= (frutasQuechua.length * 8) ? '¡Excelente trabajo!' : 
               puntuacion >= (frutasQuechua.length * 6) ? '¡Buen trabajo!' : 
               '¡Sigue practicando!'}
            </span>
          </div>
          <div style={styles.botonesFinales}>
            <button style={styles.botonReiniciar} onClick={reiniciarJuego}>
              🔄 Jugar de nuevo
            </button>
            <button style={styles.botonVolver} onClick={volverActividades}>
              ← Volver a actividades
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={volverActividades}>
          ← Volver
        </button>
        <h1 style={styles.titulo}>
          Frutas - Nivel {nivel === 'facil' ? 'Básico' : nivel === 'intermedio' ? 'Intermedio' : 'Avanzado (Frutas Peruanas)'}
        </h1>
        <div style={styles.puntuacionHeader}>
          Puntos: {puntuacion}
        </div>
      </div>

      <div style={styles.progreso}>
        <div style={styles.progresoTexto}>
          Pregunta {preguntaActual + 1} de {frutasQuechua.length}
        </div>
        <div style={styles.progresoBar}>
          <div 
            style={{
              ...styles.progresoFill,
              width: `${((preguntaActual + 1) / frutasQuechua.length) * 100}%`
            }}
          />
        </div>
        <div style={styles.intentosTexto}>
          Intentos restantes: {intentos}
        </div>
      </div>

      <div style={styles.preguntaContainer}>
        <div style={styles.frutaDisplay}>
          <div style={styles.frutaImagen}>{respuestaCorrecta?.imagen}</div>
          <div style={styles.frutaDescripcion}>{respuestaCorrecta?.descripcion}</div>
        </div>

        <div style={styles.audioContainer}>
          <h3 style={styles.pregunta}>¿Cómo se llama esta fruta en Quechua?</h3>
          <div style={styles.audioButtons}>
            <button 
              style={styles.audioButton}
              onClick={() => reproducirAudio(respuestaCorrecta?.español, 'español')}
            >
              🔊 Español: {respuestaCorrecta?.español}
            </button>
            <button 
              style={styles.audioButton}
              onClick={() => reproducirAudio(respuestaCorrecta?.quechua, 'quechua')}
            >
              🔊 Quechua: {respuestaCorrecta?.quechua}
            </button>
          </div>
        </div>

        <div style={styles.opcionesContainer}>
          {opciones.map((opcion, index) => (
            <button
              key={index}
              style={{
                ...styles.opcionButton,
                backgroundColor: respuestaSeleccionada === opcion ? 
                  (opcion.id === respuestaCorrecta.id ? '#4CAF50' : '#f44336') : 
                  '#f0f0f0',
                color: respuestaSeleccionada === opcion ? 'white' : '#333',
                cursor: mostrandoResultado ? 'not-allowed' : 'pointer'
              }}
              onClick={() => manejarRespuesta(opcion)}
              disabled={mostrandoResultado}
            >
              <span style={styles.opcionLetra}>
                {String.fromCharCode(97 + index)})
              </span>
              <div style={styles.opcionContent}>
                <span style={styles.opcionEmoji}>{opcion.imagen}</span>
                <span style={styles.opcionTexto}>{opcion.quechua}</span>
              </div>
            </button>
          ))}
        </div>

        {mostrandoResultado && (
          <div style={styles.resultadoMensaje}>
            <div style={{
              ...styles.mensajeTexto,
              color: mensajeResultado.includes('Correcto') ? '#4CAF50' : '#f44336'
            }}>
              {mensajeResultado}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
  },
  backButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },
  titulo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  puntuacionHeader: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '8px 16px',
    borderRadius: '20px'
  },
  progreso: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backdropFilter: 'blur(10px)'
  },
  progresoTexto: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '150px'
  },
  progresoBar: {
    flex: 1,
    height: '8px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progresoFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00b894, #00cec9)',
    borderRadius: '4px',
    transition: 'width 0.5s ease'
  },
  intentosTexto: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '120px'
  },
  preguntaContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '30px'
  },
  frutaDisplay: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  },
  frutaImagen: {
    fontSize: '120px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  frutaDescripcion: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  audioContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  },
  pregunta: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 0
  },
  audioButtons: {
    display: 'flex',
    gap: '15px'
  },
  audioButton: {
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#333'
  },
  opcionesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '500px'
  },
  opcionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px 25px',
    border: 'none',
    borderRadius: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
  },
  opcionLetra: {
    fontSize: '20px',
    fontWeight: 'bold',
    minWidth: '30px'
  },
  opcionContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 1
  },
  opcionEmoji: {
    fontSize: '32px'
  },
  opcionTexto: {
    fontSize: '20px',
    flex: 1
  },
  resultadoMensaje: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '20px 30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  },
  mensajeTexto: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  resultadoFinal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '30px',
    padding: '40px'
  },
  tituloFinal: {
    color: 'white',
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 0
  },
  puntuacionFinal: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  },
  puntos: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fd79a8'
  },
  mensaje: {
    fontSize: '18px',
    color: '#333'
  },
  botonesFinales: {
    display: 'flex',
    gap: '20px'
  },
  botonReiniciar: {
    background: '#00b894',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 30px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  botonVolver: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 30px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

export default JuegoFrutas;