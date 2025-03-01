import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Product/Home';
import { Provider } from 'react-redux'
import { store } from './src/utilities/store';
import ProductDetails from './src/pages/Product/ProductDetails';
import ProductForm from './src/pages/Product/ProductForm';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

const App = () => {
  const [updateNoticeModal, setUpdateNoticeModal] = useState(false);

  useEffect(() => {
    setUpdateNoticeModal(true);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products" component={Home} />
          <Stack.Screen name="Product Details" component={ProductDetails} />
          <Stack.Screen name="ProductForm" component={ProductForm} />
        </Stack.Navigator>
      </NavigationContainer>
      
      <Modal isVisible={updateNoticeModal} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Data Updates</Text>
          <Text style={styles.modalText}>
            Updates or newly added data may not reflect immediately due to API limitations.
          </Text>
          <Button title="OK" onPress={() => setUpdateNoticeModal(false)} />
        </View>
      </Modal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    textAlign: 'center',
  },
});

export default App;