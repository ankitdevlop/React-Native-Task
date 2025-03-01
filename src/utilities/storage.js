import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (newProduct) => {
    try {
        const storedProducts = await getData(); // Get existing products
        const updatedProducts = storedProducts
            ? [...storedProducts.filter(p => p.id !== newProduct.id), newProduct] // Replace existing product
            : [newProduct];

        await AsyncStorage.setItem('ProductData', JSON.stringify(updatedProducts));
    } catch (e) {
        console.error('Failed to save the data to storage. Please try again later.', e);
    }
};

export const getData = async () => {
    try {
        const storedData = await AsyncStorage.getItem('ProductData');
        return storedData ? JSON.parse(storedData) : []; // Parse JSON, return empty array if null
    } catch (e) {
        console.error('Failed to retrieve the data from storage. Please try again later.', e);
        return [];
    }
};
