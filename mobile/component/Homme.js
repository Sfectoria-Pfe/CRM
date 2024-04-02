import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

function Homme({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/mm.jpg')}
        style={styles.background}
      >
        <Animatable.View
          animation="zoomIn"
          duration={1500}
          easing="ease-out"
          style={styles.innerContainer}
        >
          <Animatable.Image
            animation="rotate"
            duration={1500}
            easing="linear"
            iterationCount="infinite"
            style={styles.image}
            source={require('../assets/logo.png')}
          />
          <View style={styles.textContainer}>
            <Animatable.Text
              animation="fadeIn"
              duration={2000}
              iterationCount="infinite"
              style={styles.text}
              easing="ease-out"
            >
              Welcome
            </Animatable.Text>
          </View>
        </Animatable.View>
      </ImageBackground>

      {/* Cartes supplémentaires */}
      <ScrollView horizontal={true} style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={require('../assets/ville3.jpg')}
            style={styles.cardImage}
          >
            {/* Contenu de la carte (si nécessaire) */}
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={require('../assets/ville1.jpg')}
            style={styles.cardImage}
          >
            {/* Contenu de la carte (si nécessaire) */}
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ImageBackground
            source={require('../assets/ville2.jpg')}
            style={styles.cardImage}
          >
            {/* Contenu de la carte (si nécessaire) */}
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>

      {/* Description */}
      <Animatable.View
        style={styles.descriptionContainer}
        animation="fadeInUp"
        duration={2000}
        easing="ease-out"
      >
        <Text style={styles.descriptionTitle}>Contactez-nous :</Text>
        <Text style={styles.descriptionText}>Téléphone : 7111 4055</Text>
        <Text style={styles.descriptionText}>Email : mubawab55@gmail.com</Text>
        <Text style={styles.descriptionText}>Adresse : Immeuble Wafa, bureau M1, 1053 Avenue De La Bourse, Tunis 1003</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Voir")} style={styles.seeMore}>
          <Text style={styles.seeMoreText}>Voir plus</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    
    top:30,
   
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    height:170,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 30,
    marginTop: 35,
    top:100
  },
  textContainer: {},
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
    top:245,
    fontFamily:'Arial'
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    top:70
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#00AAFF',
    padding: 12,
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    
    
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  seeMore: {
    marginTop: 10,
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Homme;

