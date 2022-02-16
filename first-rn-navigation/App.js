import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Settings') {
                iconName = 'settings';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'blacknp',
          })}
      >
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='Settings' component= {SettingScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
