import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { login } from '../store/auth';
import { useNavigation } from '@react-navigation/native'; // Importer la fonction useNavigation

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Initialiser la navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    dispatch(login({ email, password })).then((response) => {
      // Une fois que le login est réussi, naviguer vers la page MyTabs
      if (response.payload) {
        navigation.navigate('MyTabs');
      } else {
        Alert.alert('Connexion échouée', 'Email ou mot de passe invalide');
      }
    }).catch((error) => {
      Alert.alert('Connexion échouée', 'Une erreur est survenue lors de la connexion');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Connexion</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Mot de passe"
          />
        </View>

        <Button title="Se connecter" onPress={handleSubmit} />
        <View style={{ marginTop: 10 }} />
       
      </View>
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
    width: '80%',
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
    marginBottom: 15,
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
});

export default Login;



