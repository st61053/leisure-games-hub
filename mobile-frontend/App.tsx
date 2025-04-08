import './gesture-handler';
import "@/global.css";
import { store } from './app/store';
import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}
