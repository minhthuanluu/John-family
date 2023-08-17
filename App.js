// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Splash from './screens/Splash';
import Profile from './screens/Profile';
import { HOME, PROFILE, SPLASH } from './utils/screens';

function HomeScreen() {
  return <Home/>
}

function SplashScreen() {
  return <Splash/>
}

function ProfileScreen() {
  return <Profile/>
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={SPLASH} component={SplashScreen} />
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={PROFILE} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;