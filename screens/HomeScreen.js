// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth'; // Import Firebase auth
import { auth } from '../firebase'; // Import Firebase auth

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigation.navigate('Login'); // Navigate to login screen after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Add Product" onPress={handleAddProduct} />
      <Button title="Products" onPress={() => navigation.navigate('Products')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
