import { AppRegistry } from 'react-native';
import App from './src/app';

// Registra la app para web
AppRegistry.registerComponent('MiProyecto', () => App);
AppRegistry.runApplication('MiProyecto', {
  rootTag: document.getElementById('root')
});