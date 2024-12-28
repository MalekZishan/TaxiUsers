import {LogBox, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import ErrorBoundaries from './src/components/Wrapper/ErrorBoundaries';
import {pStore, store} from './src/Store/Store';
import RootNavigator from './src/navigation/RootNavigator';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import notificationService from './src/Services/notificationServices';
type Props = {};

const App: React.FC<Props> = ({}) => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    notificationService();
  }, []);

  return (
    <KeyboardProvider enabled statusBarTranslucent>
      <ErrorBoundaries key={'Drive Easy'}>
        <Provider store={store} key={'Drive Easy'}>
          <PersistGate
            loading={null}
            persistor={pStore}
            key={'tDrive Easyrimit'}>
            <StatusBar
              backgroundColor={'transparent'}
              barStyle={'dark-content'}
              translucent
              animated={true}
            />
            <RootNavigator key={'Drive Easy'} />
          </PersistGate>
        </Provider>
      </ErrorBoundaries>
    </KeyboardProvider>
  );
};

export default App;
