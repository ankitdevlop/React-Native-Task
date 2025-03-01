import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProductDetails, updateProduct } from './slice/slice';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../Loader/Loader';

// Validation Schema
const productSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  image: yup.string().url('Invalid image URL').required('Image URL is required'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
});

const ProductForm = () => {
  const { isLoading } = useSelector((state) => state.productSlice);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { product_id } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (product_id) {
      setLoading(true);
      dispatch(getProductDetails(`/${product_id}`))
        .unwrap()
        .then((data) => {
          setProductData(data);
          setValue('title', data.title);
          setValue('price', data.price.toString());
          setValue('image', data.image);
          setValue('description', data.description);
        })
        .finally(() => setLoading(false));
    }
  }, [product_id]);

  const onSubmit = async (data) => {
    try {
      if (product_id) {
        await dispatch(updateProduct({ query: `/${product_id}`, requestData: data })).unwrap();
        dispatch({
          type: 'productSlice/updateProductInState',
          payload: { id: product_id, ...data },
        });
      } else {
        const newProduct = await dispatch(addProduct(data)).unwrap();
        dispatch({
          type: 'productSlice/addProductToState',
          payload: newProduct,
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Loader loading={isLoading} />
      <Text style={styles.header}>{product_id ? 'Update Product' : 'Add Product'}</Text>

      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter product title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Text style={styles.label}>Price</Text>
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      <Text style={styles.label}>Image URL</Text>
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter image URL"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.image && <Text style={styles.error}>{errors.image.message}</Text>}

      {productData?.image && <Image source={{ uri: productData.image }} style={styles.productImage} />}

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textarea}
            placeholder="Enter product description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : product_id ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    borderRadius: 5,
    height: 80,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductForm;
