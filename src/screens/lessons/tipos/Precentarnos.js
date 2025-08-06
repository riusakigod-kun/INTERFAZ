import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const JuegoSaludos = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nivel = searchParams.get('nivel') || 'facil';
  
  // Datos de los saludos por nivel de dificultad
  const saludosPorNivel = {
    facil: [
      { 
        id: 1, 
        quechua: "Imaynalla", 
        español: "Hola", 
        imagen: "👋",
        descripcion: "Saludo casual para cualquier momento del día",
        contexto: "Uso común entre amigos y familiares"
      },
      { 
        id: 2, 
        quechua: "Allinllachu", 
        español: "¿Cómo estás?", 
        imagen: "😊",
        descripcion: "Pregunta por el bienestar de la persona",
        contexto: "Saludo más formal y cortés"
      },
      { 
        id: 3, 
        quechua: "Allinmi", 
        español: "Estoy bien", 
        imagen: "👍",
        descripcion: "Respuesta positiva a '¿Cómo estás?'",
        contexto: "Respuesta común de bienestar"
      },
      { 
        id: 4, 
        quechua: "Yupaychani", 
        español: "Gracias", 
        imagen: "🙏",
        descripcion: "Expresión de agradecimiento",
        contexto: "Cortesía básica en cualquier situación"
      }
    ],
    intermedio: [
      { 
        id: 1, 
        quechua: "Paqarin kama", 
        español: "Hasta mañana", 
        imagen: "🌅",
        descripcion: "Despedida cuando nos vemos al día siguiente",
        contexto: "Despedida al final del día"
      },
      { 
        id: 2, 
        quechua: "Tupananchiskama", 
        español: "Hasta pronto", 
        imagen: "👋",
        descripcion: "Despedida general sin fecha específica",
        contexto: "Despedida común y versátil"
      },
      { 
        id: 3, 
        quechua: "Pampachaway", 
        español: "Disculpa", 
        imagen: "🙏",
        descripcion: "Pedir perdón o disculpas",
        contexto: "Cortesía cuando cometemos un error"
      },
      { 
        id: 4, 
        quechua: "Sumaqta puñuy", 
        español: "Buenas noches", 
        imagen: "🌙",
        descripcion: "Saludo y despedida nocturna",
        contexto: "Al ir a dormir o en la noche"
      },
      { 
        id: 5, 
        quechua: "Maypitam kachkanki", 
        español: "¿Dónde estás?", 
        imagen: "📍",
        descripcion: "Pregunta sobre la ubicación de alguien",
        contexto: "Cuando buscas a alguien"
      },
      { 
        id: 6, 
        quechua: "Kaypichu kachkanki", 
        español: "¿Estás aquí?", 
        imagen: "👀",
        descripcion: "Confirmación de presencia",
        contexto: "Para verificar si alguien está presente"
      }
    ],
    dificil: [
      { 
        id: 1, 
        quechua: "Imaynalla kashanki kay p'unchaypi", 
        español: "¿Cómo estás el día de hoy?", 
        imagen: "☀️",
        descripcion: "Pregunta formal por el bienestar del día",
        contexto: "Saludo formal y detallado"
      },
      { 
        id: 2, 
        quechua: "Kusasqaymi riqsisqayki", 
        español: "Me alegra conocerte", 
        imagen: "😊",
        descripcion: "Expresión de alegría al conocer a alguien",
        contexto: "Primera vez que conoces a una persona"
      },
      { 
        id: 3, 
        quechua: "Allin p'unchay kanki", 
        español: "Que tengas un buen día", 
        imagen: "🌟",
        descripcion: "Deseo de bienestar para el día",
        contexto: "Despedida positiva y formal"
      },
      { 
        id: 4, 
        quechua: "Ima sutikitaq", 
        español: "¿Cuál es tu nombre?", 
        imagen: "❓",
        descripcion: "Pregunta formal por el nombre",
        contexto: "Presentación formal"
      },
      { 
        id: 5, 
        quechua: "Noqaqa ... sutiyoq kani", 
        español: "Mi nombre es...", 
        imagen: "🙋",
        descripcion: "Presentación personal formal",
        contexto: "Respuesta al dar tu nombre"
      },
      { 
        id: 6, 
        quechua: "Allinta tupananchikkama", 
        español: "Hasta que nos volvamos a encontrar bien", 
        imagen: "🤝",
        descripcion: "Despedida formal y respetuosa",
        contexto: "Despedida muy formal o ceremonial"
      },
      { 
        id: 7, 
        quechua: "Taytanchispa bendicionninwan", 
        español: "Con la bendición de nuestro padre", 
        imagen: "🙏",
        descripcion: "Expresión religiosa de despedida",
        contexto: "Despedida con connotación espiritual"
      },
      { 
        id: 8, 
        quechua: "Munakuytachu apamunki", 
        español: "¿Traes amor/cariño?", 
        imagen: "❤️",
        descripcion: "Pregunta afectuosa tradicional",
        contexto: "Saludo muy íntimo entre familiares"
      }
    ]
  };

  const saludosQuechua = saludosPorNivel[nivel] || saludosPorNivel.facil;

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
  const generarOpciones = (saludoCorrecta) => {
    const opciones = [saludoCorrecta];
    
    // Agregar 2 opciones incorrectas
    while (opciones.length < 3) {
      const saludoAleatorio = saludosQuechua[Math.floor(Math.random() * saludosQuechua.length)];
      if (!opciones.find(op => op.id === saludoAleatorio.id)) {
        opciones.push(saludoAleatorio);
      }
    }
    
    // Mezclar las opciones
    return opciones.sort(() => Math.random() - 0.5);
  };

  // Inicializar pregunta
  useEffect(() => {
    if (preguntaActual < saludosQuechua.length) {
      const saludoActual = saludosQuechua[preguntaActual];
      setRespuestaCorrecta(saludoActual);
      setOpciones(generarOpciones(saludoActual));
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
          <h1 style={styles.tituloFinal}>👋 ¡Juego Completado! 🙏</h1>
          <div style={styles.puntuacionFinal}>
            <span style={styles.puntos}>Puntuación Final: {puntuacion}/{saludosQuechua.length * 10}</span>
            <span style={styles.mensaje}>
              {puntuacion >= (saludosQuechua.length * 8) ? '¡Excelente! Ya puedes saludar en Quechua!' : 
               puntuacion >= (saludosQuechua.length * 6) ? '¡Buen trabajo! Sigue practicando!' : 
               '¡Sigue practicando los saludos!'}
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
          Saludos - Nivel {nivel === 'facil' ? 'Básico' : nivel === 'intermedio' ? 'Intermedio' : 'Avanzado'}
        </h1>
        <div style={styles.puntuacionHeader}>
          Puntos: {puntuacion}
        </div>
      </div>

      <div style={styles.progreso}>
        <div style={styles.progresoTexto}>
          Pregunta {preguntaActual + 1} de {saludosQuechua.length}
        </div>
        <div style={styles.progresoBar}>
          <div 
            style={{
              ...styles.progresoFill,
              width: `${((preguntaActual + 1) / saludosQuechua.length) * 100}%`
            }}
          />
        </div>
        <div style={styles.intentosTexto}>
          Intentos restantes: {intentos}
        </div>
      </div>

      <div style={styles.preguntaContainer}>
        <div style={styles.saludoDisplay}>
          <div style={styles.saludoImagen}>{respuestaCorrecta?.imagen}</div>
          <div style={styles.saludoDescripcion}>{respuestaCorrecta?.descripcion}</div>
          <div style={styles.saludoContexto}>{respuestaCorrecta?.contexto}</div>
        </div>

        <div style={styles.audioContainer}>
          <h3 style={styles.pregunta}>¿Cómo se dice esto en Quechua?</h3>
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
    background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
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
    background: 'linear-gradient(90deg, #fd79a8, #fdcb6e)',
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
  saludoDisplay: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px'
  },
  saludoImagen: {
    fontSize: '80px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  saludoDescripcion: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: '1.4'
  },
  saludoContexto: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    fontWeight: 'bold',
    background: '#f0f0f0',
    padding: '8px 16px',
    borderRadius: '20px'
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
    color: '#a29bfe'
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

export default JuegoSaludos;