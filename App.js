// App.js or Main.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase'; // Import Firebase auth
import LoginScreen from './screens/LoginScreen'; // Import your login screen
import HomeScreen from './screens/HomeScreen'; // Import your home screen
import AddProductScreen from './screens/AddProductScreen'; // Import add product screen
import ProductsScreen from './screens/ProductsScreen'; // Import products screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
