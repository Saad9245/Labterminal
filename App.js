import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { AuthProvider } from './Context/AuthContext';
import AuthScreen from './Screens/AuthScreen';
//import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import SellerDashboard from './Screens/SellerDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}