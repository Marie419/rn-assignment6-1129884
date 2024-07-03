import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      try {
        let cart = await AsyncStorage.getItem('cart');
        if (isMounted) {
          cart = cart ? JSON.parse(cart) : [];
          setCart(cart);
          calculateTotalCost(cart);
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

  const calculateTotalCost = (cart) => {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)), 0);
    setTotalCost(total);
  };

  const removeFromCart = async (productId) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart = cart.filter((item) => item.id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCart(cart);
      calculateTotalCost(cart);
      Alert.alert("Success", "Product removed from cart!");
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

    return (
      <View style={styles.productContainer} key={item.id}>
        <Image source={imageSource} style={styles.productImage} onError={(error) => console.log('Error loading image:', error.nativeEvent.error)} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name.toUpperCase()}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <Image source={require('../assets/images/remove.png')} style={styles.remove} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
              <Image source={require('../assets/images/Search.png')} style={styles.search} />
            </View>
            <Text style={styles.headText}>CHECK OUT</Text>
            <View style={styles.underline}>
              <View style={styles.diamond} />
            </View>
          </>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.footer}>
        <View style={styles.totalCostContainer}>
          <Text style={styles.totalCostLabel}>EST TOTAL</Text>
          <Text style={styles.totalCostAmount}>${totalCost.toFixed(2)}</Text>
        </View>
        <View style={styles.checkoutButton}>
          <Image source={require('../assets/images/shoppingBag.png')} style={styles.shop} />
          <Text style={styles.shopText}>CHECKOUT</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logo: {
    width: 100,
    height: 40,
    position: 'absolute',
    left: '50%',
    marginLeft: -50,
  },
  search: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 16,
  },
  headText: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 16,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 10,
    width: '60%',
    alignSelf: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  diamond: {
    width: 15,
    height: 15,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    bottom: -8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  flatListContainer: {
    paddingBottom: 100,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
    marginTop: 20,
  },
  productImage: {
    width: 100,
    height: 150,
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
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    width: 24,
    height: 24,
  },
  cost: {
    paddingVertical: 20,
  },
  totalCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  totalCostLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalCostAmount: {
    fontSize: 18,
    color: 'orange',
  },
  footer: {
    width: '100%',
    borderTopColor: '#ccc',
    marginBottom: -15
  },
  shop: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  shopText: {
    fontSize: 24,
    marginLeft: 8,
    color: '#fff',
  },
  checkoutButton: {
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 418,
    marginLeft: -18
  },
});

export default CartScreen;
