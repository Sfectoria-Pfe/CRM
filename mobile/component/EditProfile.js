import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { imagedataurl } from '../constante/data';
import { TextInput, Button } from 'react-native-paper';

function EditProfile({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(imagedataurl[0]);
  const [nom, setNom] = useState("Fatma");
  const [prenom, setprenom] = useState("Ben Ali");

  const [adresse, setAdresse] = useState("Tunis-Gafsa");
  const [email, setEmail] = useState("fatmabenali@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleImageSelection = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleSaveChanges = () => {
    // Ajoutez ici la logique pour sauvegarder les modifications du profil
    console.log("Changes saved!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 22 }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 25, left: 0 }}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginVertical: 22 }}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Image source={{ uri: selectedImage }} style={{ height: 170, width: 170, borderRadius: 85, borderWidth: 2, borderColor: '#E0E0E0',top:12 }} />
            <View style={{ position: 'absolute', bottom: 0, right: 10, zIndex: 9999 }}>
              <MaterialIcons name="photo-camera" size={32} color="primary" />
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          label="Nom"
          value={nom}
          onChangeText={value => setNom(value)}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="prenom"
          value={prenom}
          onChangeText={value => setprenom(value)}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Adresse"
          value={adresse}
          onChangeText={value => setAdresse(value)}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry
          style={{ marginBottom: 12 }}
        />
        <Button mode="contained" onPress={handleSaveChanges} style={{ marginBottom: 12 }}>
          Save Changes
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;


