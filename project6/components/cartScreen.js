import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      try {
        let cart = await AsyncStorage.getItem('cart');
        if (isMounted) {
          setCart(cart ? JSON.parse(cart) : []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const removeFromCart = async (productId) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart = cart.filter((item) => item.id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCart(cart);
      Alert.alert("Success", "Product removed from cart!");
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.productContainer} key={`${item.id}-${index}`}>
      {item.image ? (
        <Image source={{ uri: String(item.image) }} style={styles.productImage} />
      ) : (
        <View style={styles.productImagePlaceholder} />
      )}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Image source={require('../assets/images/remove.png')} style={styles.removeButton} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContainer: {
    paddingBottom: 100,
    marginTop: 70,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
  },
  productImage: {
    width: 100,
    height: 150,
    backgroundColor: '#eaeaea', // Placeholder background
  },
  productImagePlaceholder: {
    width: 100,
    height: 150,
    backgroundColor: '#eaeaea',
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#AFB0B6',
  },
  productPrice: {
    fontSize: 20,
    color: 'orange',
  },
  removeButton: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});

export default CartScreen;
