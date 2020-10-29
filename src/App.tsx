/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {AppNavigator} from './AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {observer, Provider} from 'mobx-react';

const App = observer(
  class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
      super(props);
    }

    render() {
      return (
        <React.Fragment>
          <SafeAreaProvider>
            <Provider>
              <AppNavigator />
            </Provider>
          </SafeAreaProvider>
        </React.Fragment>
      );
    }
  },
);

interface IAppProps {}

interface IAppState {}

export default App;
