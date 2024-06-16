import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import Firestore instance
import { auth } from '../firebase'; // Import Firebase auth instance

export default function AddProductScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [category, setCategory] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user object

  useEffect(() => {
    // Listen for changes in authentication state (user signed in or out)
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user); // Set current user object when authenticated
      } else {
        setCurrentUser(null); // User is signed out
      }
    });

    return unsubscribe; // Unsubscribe from listener on component unmount
  }, []);

  const handleSubmit = async () => {
    // Validate inputs
    if (!title || !description || !price || !category) {
      Alert.alert('All fields are required.');
      return;
    }

    // Ensure price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert('Price must be a valid number.');
      return;
    }

    try {
      // Add new product to Firestore
      const docRef = await addDoc(collection(db, 'products'), {
        title,
        description,
        price: parsedPrice,
        category,
        userId: currentUser.uid, // Use current user's UID
        createdAt: new Date().toISOString(),
      });

      console.log('Document written with ID: ', docRef.id);
      navigation.navigate('Products'); // Navigate to products screen after adding product
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Failed to add product. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
