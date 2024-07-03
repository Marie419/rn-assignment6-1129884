import React from 'react';
import { View, StyleSheet, Text,ScrollView, Image, TouchableOpacity, Alert, ScrollViewBase } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const products = [
    {
      id: '1',
      name: 'Office Wear',
      description: 'reversible angora cardigan',
      price: '$120',
      image: require('../assets/images/dress1.png'),
    },
    {
      id: '2',
      name: 'Black',
      description: 'reversible angora cardigan',
      price: '$120',
      image: require('../assets/images/dress2.png'),
    },
    {
        id: '3',
        name: 'Church Wear',
        description: 'reversible angora cardigan',
        price: '$120',
        image: require('../assets/images/dress3.png'),
    },
    {
        id: '4',
        name: 'Lamerei',
        description: 'reversible angora cardigan',
        price: '$120',
        image: require('../assets/images/dress4.png'),
    },
    {
        id: '5',
        name: '21WN',
        description: 'reversible angora cardigan',
        price: '$120',
        image: require('../assets/images/dress5.png'),
    },
    {
        id: '6',
        name: 'Lopo',
        description: 'reversible angora cardigan',
        price: '$120',
        image: require('../assets/images/dress6.png'),
    },
    {
        id: '7',
        name: '21WN',
        description: 'reversible angora cardigan',
        price: '$120',
        image: require('../assets/images/dress7.png'),
    },
    {
        id: '8',
        name: 'lame',
        description: 'reversible angora cardigan',
        price: '$120',
        image: require('../assets/images/dress3.png'),
    }
  ];

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert("Success", "Product added to cart!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView> 
    <View style={styles.homeCon}>
      <View style={styles.header}>
        <Image source={require('../assets/images/Menu.png')} style={styles.menu} />
        <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
        <Image source={require('../assets/images/Search.png')} style={styles.search} />
        <Image source={require('../assets/images/shoppingBag.png')} style={styles.shop} />
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.ourSt}>O U R  S T O R Y</Text>
        <View style={styles.subIcon1}>
          <Image source={require('../assets/images/Listview.png')} style={styles.icon} />
        </View>
        <View style={styles.subIcon2}>
          <Image source={require('../assets/images/Filter.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.prodCon}>
        <View style={styles.products}>
          {products.map((product) => (
            <View key={product.id} style={styles.product}>
              <Image source={product.image} style={styles.hI} />
              <Text style={styles.types}>{product.name}</Text>
              <Text style={styles.brand}>{product.description}</Text>
              <Text style={styles.price}>{product.price}</Text>
              <TouchableOpacity onPress={() => addToCart(product)} style={styles.addButton}>
                <Image source={require('../assets/images/add_circle.png')} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeCon: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    width: 30,
    height: 30,
  },
  shop: {
    width: 30,
    height: 30,
  },
  search: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 100,
    height: 40,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  ourSt: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  subIcon1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 80,
  },
  subIcon2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  prodCon: {
    marginTop: 50,
  },
  products: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  product: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    
    paddingBottom: 10,
  },
  hI: {
    width: 200,
    height: 260,
  },
  types: {
    fontSize: 18,
    margin: 5,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 14,
    color: '#AFB0B6',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
     
  },
  addIcon: {
    width: 30,
    height: 30,
    marginBottom:110
  },
});

export default HomeScreen;
