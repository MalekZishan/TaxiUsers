/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import i18next from './src/Language/i18Next'

AppRegistry.registerComponent(appName, () => App);
