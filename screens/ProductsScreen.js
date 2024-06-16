import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TextInput, Alert, Image } from 'react-native';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db, auth } from '../firebase'; // Import Firestore and Authentication instances

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleEditProduct = async () => {
    try {
      await updateDoc(doc(db, 'products', selectedProduct.id), {
        title: editTitle,
        description: editDescription,
        price: parseFloat(editPrice),
        category: editCategory,
      });
      setModalVisible(false);
      // Update the product in the local state
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id
          ? { ...product, title: editTitle, description: editDescription, price: parseFloat(editPrice), category: editCategory }
          : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditTitle(product.title);
    setEditDescription(product.description);
    setEditPrice(product.price.toString());
    setEditCategory(product.category);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} // Dummy image URL
        style={styles.productImage}
      />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productCategory}>Category: {item.category}</Text>
      {currentUser && currentUser.uid === item.userId && (
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => openEditModal(item)} />
          <Button title="Delete" onPress={() => handleDeleteProduct(item.id)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No products found.</Text>}
      />

      {/* Modal for editing product */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Product Title"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Product Description"
              value={editDescription}
              onChangeText={setEditDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={editPrice}
              onChangeText={setEditPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={editCategory}
              onChangeText={setEditCategory}
            />
            <View style={styles.buttonContainer}>
              <Button title="Update Product" onPress={handleEditProduct} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
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
  productItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center', // Center the content
  },
  productImage: {
    width: 150, // Set width of the image
    height: 150, // Set height of the image
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', // Center the text
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
