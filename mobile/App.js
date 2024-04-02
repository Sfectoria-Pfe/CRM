import React from 'react';
import { Provider } from "react-redux";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Main from './Main';
import { store } from './store';
export default function App() {
  return (
    <Provider store={store}>
    <GestureHandlerRootView>
      <Main/>
      </GestureHandlerRootView>
    </Provider>
  );
}
