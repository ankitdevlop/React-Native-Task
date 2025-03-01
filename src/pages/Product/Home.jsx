import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, deleteProduct } from './slice/slice';
import Loader from '../Loader/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading, products } = useSelector((state) => state.productSlice);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      await dispatch(getAllProduct()).unwrap();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [dispatch])
  );

  useFocusEffect(
    useCallback(() => {
      setFilteredProducts(products);
    }, [products])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const confirmDelete = async () => {
    if (selectedProductId) {
      try {
        await dispatch(deleteProduct(`/${selectedProductId}`)).unwrap();
          setFilteredProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProductId)
        );
  
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ProductForm')}
      >
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>
      {filteredProducts?.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('Product Details', { product_id: item.id })}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => navigation.navigate('ProductForm', { product_id: item.id })}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setSelectedProductId(item.id);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No products available</Text>
      )}
      <Modal isVisible={modalVisible} animationIn="slideInUp" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Delete Product?</Text>
          <Text style={styles.modalText}>Are you sure you want to delete this product?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#e74c3c' }]}
              onPress={confirmDelete}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#95a5a6' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },

  /* Modal Styles */
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
