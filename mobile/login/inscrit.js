import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const Inscrit = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Logique pour enregistrer l'utilisateur
    console.log('Nom:', firstName);
    console.log('Prénom:', lastName);
    console.log('Adresse:', address);
    console.log('Email:', email);
    console.log('Mot de passe:', password);
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.wrapper} animation="fadeIn" duration={1500}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Inscription</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Nom"
            textAlignVertical="center" // Alignement vertical
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Prénom"
            textAlignVertical="center" // Alignement vertical
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Adresse"
            textAlignVertical="center" // Alignement vertical
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="Email"
            textAlignVertical="center" // Alignement vertical
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Mot de passe"
            textAlignVertical="center" // Alignement vertical
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.link}>
          <Text style={styles.linkText}>Déjà inscrit ? Connectez-vous ici</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  wrapper: {
    width: '90%',
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000066',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Inscrit;

