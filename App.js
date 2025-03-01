import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Product/Home';
import { Provider } from 'react-redux'
import { store } from './src/utilities/store';
import ProductDetails from './src/pages/Product/ProductDetails';
import ProductForm from './src/pages/Product/ProductForm';

const Stack = createStackNavigator();

// const HomeScreen = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text>Home Screen</Text>
//     <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
//   </View>
// );

// const DetailsScreen = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text>Details Screen</Text>
//     <Button title="Go Back" onPress={() => navigation.goBack()} />
//   </View>
// );

const App = () => (
  <Provider store={store}>

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Products" component={Home} />
      <Stack.Screen name="Product Details" component={ProductDetails} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
