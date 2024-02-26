import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import { GamePage } from './pages';
import { baseStyles } from './styles';

const App = () => {
  return (
    <SafeAreaView style={baseStyles.container}>
      <Text style={baseStyles.header}>
        <Image source={require('./images/logo.png')} />
        <Image source={require('./images/niplay.png')} />
      </Text>
      <GamePage />
    </SafeAreaView>
  )
};

export default App;
