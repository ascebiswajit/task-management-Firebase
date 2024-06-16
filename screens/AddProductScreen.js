// screens/AddProductScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import Firestore instance

export default function AddProductScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        title,
        description,
        price,
        category,
      });
      console.log('Document written with ID: ', docRef.id);
      navigation.navigate('Products'); // Navigate to products screen after adding product
    } catch (error) {
      console.error('Error adding document: ', error);
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
