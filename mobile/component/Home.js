import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulation d'un chargement asynchrone
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Met fin au chargement après 2 secondes
    }, 2000);

    // Nettoyage du timer lors du démontage du composant pour éviter les fuites de mémoire
    return () => clearTimeout(timer);
  }, []);

  // Affichage de l'indicateur de chargement ou du contenu de la page en fonction de l'état isLoading
  return (
    <View style={styles.container}>
      {isLoading ? (
        // Affichage de l'indicateur de chargement
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        // Affichage du contenu de la page avec animation sur le texte
        <Animatable.View animation="fadeIn" style={styles.content}>
          <Animatable.Text animation="fadeIn" style={styles.text}>Bienvenue</Animatable.Text>
           <Button
            title='cliquer ici'
            onPress={() => navigation.navigate("Orboarding")}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#527dff'
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    width: 200,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
});