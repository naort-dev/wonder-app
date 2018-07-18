import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga'

Reactotron
  .configure({
    name: 'Wonder App Mobile'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect({ enabled: __DEV__ });

// setTimeout(() => {
//   Reactotron.connect({enabled: __DEV__})
// }, 5000);

console.tron = Reactotron;
export default Reactotron;