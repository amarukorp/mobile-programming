import React from 'react';
import { StyleSheet } from 'react-native';
import NavigationContainer from '@react-navigation/native';
import createNativeStackNavigator from '@react-navigation/native-stack'
import CalcScreen from './CalcScreen';
import HistoryScreen from './HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalcScreen}/>
        <Stack.Screen name="History" component={HistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

