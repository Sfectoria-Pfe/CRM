import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

const Voir = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.toutela3d.com/assets/projects/big/11-haut-de-gamme-3d-immobilier/05-3D-immobilier-miami-vue-nuit-villa-luxe.jpg' }} style={styles.headerImage} />

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Vente</Text>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreButtonText} onPress={() => navigation.navigate("Location")}>Voir Plus partie location</Text>
        </TouchableOpacity>

        <View style={styles.productContainer}>
          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://www.selexium.com/app/uploads/2022/05/media-marche-immobilier-luxe-hausse.jpg' }} style={styles.productImage} />
            <Text style={styles.productTitle}>maison s+3</Text>
            <Text style={styles.productTitle}>prix:400.000000D</Text>
            

          </TouchableOpacity>

          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://www.acecredit.fr/wp-content/uploads/villa-luxe-1200x801.jpg' }} style={styles.productImage} />
            <Text style={styles.productTitle}>maison s+2</Text>
            <Text style={styles.productTitle}>prix:800.0000000D</Text>

          </TouchableOpacity>
          
        </View>
        <View style={styles.productContainer}>
          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://img.gentside.com/article/1280/villa/la-villa-du-528-lakeview-ct-a-miami_1850b75fca87b6517d6846413ae04f9f03cc4e01.jpg' }} style={styles.productImage} />
            <Text style={styles.productTitle}>maison s+3</Text>
            <Text style={styles.productTitle}>prix:650.000000D</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.product}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/18b1VcAyCMhSXbSB0zowtsyUe4GM3LupZJ_PNXixjpepdtIR9NXs_TAy39SvNnNHT9IyJqzJJMzEimBQXysn1OkZHLAgGtewjTKMDIE=rj-w1440-h843-n-l70' }} style={styles.productImage} />
            <Text style={styles.productTitle}>Jean Coupe Droite</Text>
            <Text style={styles.productTitle}>prix:500.000000D</Text>

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
    width: 130,
    height: 130,
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
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Voir;
