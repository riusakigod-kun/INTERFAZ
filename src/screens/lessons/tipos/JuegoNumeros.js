import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const JuegoNumeros = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nivel = searchParams.get('nivel') || 'facil';
  
  // Datos de los números por nivel de dificultad
  const numerosPorNivel = {
    facil: [
      { numero: 1, quechua: "Huk", español: "Uno", imagen: "🌟" },
      { numero: 2, quechua: "Iskay", español: "Dos", imagen: "⭐⭐" },
      { numero: 3, quechua: "Kimsa", español: "Tres", imagen: "🌟🌟🌟" },
      { numero: 4, quechua: "Tawa", español: "Cuatro", imagen: "⭐⭐⭐⭐" },
      { numero: 5, quechua: "Pichqa", español: "Cinco", imagen: "🌟🌟🌟🌟🌟" }
    ],
    intermedio: [
      { numero: 6, quechua: "Soqta", español: "Seis", imagen: "⭐⭐⭐⭐⭐⭐" },
      { numero: 7, quechua: "Qanchis", español: "Siete", imagen: "🌟🌟🌟🌟🌟🌟🌟" },
      { numero: 8, quechua: "Pusaq", español: "Ocho", imagen: "⭐⭐⭐⭐⭐⭐⭐⭐" },
      { numero: 9, quechua: "Isqon", español: "Nueve", imagen: "🌟🌟🌟🌟🌟🌟🌟🌟🌟" },
      { numero: 10, quechua: "Chunka", español: "Diez", imagen: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐" },
      { numero: 20, quechua: "Iskay chunka", español: "Veinte", imagen: "🔢" },
      { numero: 30, quechua: "Kimsa chunka", español: "Treinta", imagen: "🔢" },
      { numero: 50, quechua: "Pichqa chunka", español: "Cincuenta", imagen: "🔢" }
    ],
    dificil: [
      { numero: 100, quechua: "Pachak", español: "Cien", imagen: "💯" },
      { numero: 200, quechua: "Iskay pachak", español: "Doscientos", imagen: "💯💯" },
      { numero: 500, quechua: "Pichqa pachak", español: "Quinientos", imagen: "🏛️" },
      { numero: 1000, quechua: "Waranqa", español: "Mil", imagen: "🏔️" },
      { numero: 15, quechua: "Chunka pichqayoq", español: "Quince", imagen: "🔢" },
      { numero: 25, quechua: "Iskay chunka pichqayoq", español: "Veinticinco", imagen: "🔢" },
      { numero: 75, quechua: "Qanchis chunka pichqayoq", español: "Setenta y cinco", imagen: "🔢" },
      { numero: 99, quechua: "Isqon chunka isqonyoq", español: "Noventa y nueve", imagen: "🔢" }
    ]
  };

  const numerosQuechua = numerosPorNivel[nivel] || numerosPorNivel.facil;

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
  const generarOpciones = (numeroCorrector) => {
    const opciones = [numeroCorrector];
    
    // Agregar 2 opciones incorrectas
    while (opciones.length < 3) {
      const numeroAleatorio = numerosQuechua[Math.floor(Math.random() * numerosQuechua.length)];
      if (!opciones.find(op => op.numero === numeroAleatorio.numero)) {
        opciones.push(numeroAleatorio);
      }
    }
    
    // Mezclar las opciones
    return opciones.sort(() => Math.random() - 0.5);
  };

  // Inicializar pregunta
  useEffect(() => {
    if (preguntaActual < numerosQuechua.length) {
      const numeroActual = numerosQuechua[preguntaActual];
      setRespuestaCorrecta(numeroActual);
      setOpciones(generarOpciones(numeroActual));
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
    
    if (opcionSeleccionada.numero === respuestaCorrecta.numero) {
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
          <h1 style={styles.tituloFinal}>🎊 ¡Juego Completado! 🎊</h1>
          <div style={styles.puntuacionFinal}>
            <span style={styles.puntos}>Puntuación Final: {puntuacion}/100</span>
            <span style={styles.mensaje}>
              {puntuacion >= 80 ? '¡Excelente trabajo!' : 
               puntuacion >= 60 ? '¡Buen trabajo!' : 
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
          Números - Nivel {nivel === 'facil' ? 'Básico (1-5)' : nivel === 'intermedio' ? 'Intermedio (6-50)' : 'Avanzado (100-1000)'}
        </h1>
        <div style={styles.puntuacionHeader}>
          Puntos: {puntuacion}
        </div>
      </div>

      <div style={styles.progreso}>
        <div style={styles.progresoTexto}>
          Pregunta {preguntaActual + 1} de {numerosQuechua.length}
        </div>
        <div style={styles.progresoBar}>
          <div 
            style={{
              ...styles.progresoFill,
              width: `${((preguntaActual + 1) / numerosQuechua.length) * 100}%`
            }}
          />
        </div>
        <div style={styles.intentosTexto}>
          Intentos restantes: {intentos}
        </div>
      </div>

      <div style={styles.preguntaContainer}>
        <div style={styles.numeroDisplay}>
          <div style={styles.numeroGrande}>{respuestaCorrecta?.numero}</div>
          <div style={styles.numeroImagen}>{respuestaCorrecta?.imagen}</div>
        </div>

        <div style={styles.audioContainer}>
          <h3 style={styles.pregunta}>¿Cómo se dice este número en Quechua?</h3>
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
                  (opcion.numero === respuestaCorrecta.numero ? '#4CAF50' : '#f44336') : 
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
              <span style={styles.opcionTexto}>{opcion.quechua}</span>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
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
  numeroDisplay: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  },
  numeroGrande: {
    fontSize: '120px',
    fontWeight: 'bold',
    color: '#667eea',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  numeroImagen: {
    fontSize: '24px'
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
    fontWeight: 'bold'
  },
  opcionTexto: {
    fontSize: '20px'
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
    color: '#667eea'
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
    background: '#4CAF50',
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

export default JuegoNumeros;
