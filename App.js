import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './AppContainer'; // Replace with your root component

export default function App() {
  return (
    <PaperProvider>
      <AppContainer />
    </PaperProvider>
  );
}
