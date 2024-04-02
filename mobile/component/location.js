import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Location = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://pichet.twic.pics/var/site/storage/images/_aliases/product_item/8/6/4/1/651468-3-fre-FR/69ae60754a97-Teasing_vignette_690x380.jpg' }} style={styles.headerImage} />

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>location</Text>

        <View style={styles.productContainer}>
          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://s.pro-immobilier.leboncoin.fr/api/v1/prd-media/images/2000000175900/49886/3d43072f-94af-4e7a-8cf3-540ac4be82c0?rule=big-thumbnail' }} style={styles.productImage} />
            <Text style={styles.productTitle}>maison s+3</Text>
            <Text style={styles.productTitle}>prix:365D</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://immobiliere-leroyaume.com/wp-content/uploads/2021/03/nuit-7e-1024x624.jpg' }} style={styles.productImage} />
            <Text style={styles.productTitle}>maison s+2</Text>
            <Text style={styles.productTitle}>prix:850D</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.productContainer}>
          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://m1.quebecormedia.com/emp/emp/20201119_commonground_ALEXANDERT4_lounge_HD423af839-423e-4e77-9cec-b9270dd0f666_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=6002&h=4000&width=925' }} style={styles.productImage} />
            <Text style={styles.productTitle}>maison s+3</Text>
            <Text style={styles.productTitle}>prix:600D</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://www.lavieeco.com/wp-content/uploads/2023/06/Loyer-appartement.jpg' }} style={styles.productImage} />
            <Text style={styles.productTitle}>Jean Coupe Droite</Text>
            <Text style={styles.productTitle}>prix:700D</Text>

          </TouchableOpacity>
          
        </View>
        

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  product: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Location;
