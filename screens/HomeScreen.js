// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function HomeScreen({ route, navigation }) {
  const { user } = route.params;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      {user.displayName && <Text>Welcome, {user.displayName}</Text>}
      {user.photoURL && <Image source={{ uri: user.photoURL }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />}
      <Button title="Logout" onPress={handleLogout} />
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
