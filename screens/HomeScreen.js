import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDoc, doc } from 'firebase/firestore';
import { Avatar, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const handleGoToProducts = () => {
    navigation.navigate('Products');
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Icon size={40} icon="account" />
            </TouchableOpacity>
          }>
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      </View>
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.docsButton}
          onPress={handleGoToProducts}
        >
          <Icon name="document-text" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleAddProduct}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  docsButton: {
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10, // Add margin between the buttons
  },
  floatingButton: {
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
