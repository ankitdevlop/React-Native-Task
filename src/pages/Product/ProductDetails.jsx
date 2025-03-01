import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { getProductDetails } from './slice/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../Loader/Loader';

const ProductDetails = ({ route, navigation }) => {
  const { product_id } = route.params;
  const dispatch = useDispatch()
  const { isLoading, productData } = useSelector((state) => state.productSlice);
  console.log('product', product_id)
  const fetchProductsDetails = async () => {
    try {
      const query = `/${product_id}`
      await dispatch(getProductDetails(query)).unwrap();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProductsDetails();
    }, [dispatch])
  );
  console.log(productData)
  return (
    <View>

      {!productData ? (

        <Loader loading={isLoading} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: productData?.image }} style={styles.productImage} />

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{productData?.title}</Text>
            <Text style={styles.price}>${productData?.price}</Text>

            <Text style={styles.description}>{productData?.description}</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                ⭐ {productData?.rating?.rate}
              </Text>
              <Text style={styles.countText}>
                ({productData?.rating?.count} Reviews)
              </Text>
            </View>

          </View>
        </ScrollView>
      )

      }

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom: 20,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1c40f',
    fontFamily: 'serif',
  },
  countText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
    fontFamily: 'sans-serif-medium',
  },
  productImage: {
    width: '90%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  detailsContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#27ae60',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
