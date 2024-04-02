import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Animated } from 'react-native';
import { orData } from '../constante/data';
import NextButton from "./NextButton";

export default function Orboarding() {
  const flatListRef = useRef(null);

  const scrollToNextItem = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={orData}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={item.imgP} style={{width:300,height:450}} />
            <Text style={styles.title}>{item.title}</Text>
            <NextButton
              percentage={(index + 1) * (100 / orData.length)}
              scrollToNextItem={scrollToNextItem}
              index={index}
              lastIndex={orData.length - 1}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
   
  },
  image: {
    width: 320, // Largeur de l'image
    height: 250, // Hauteur de l'image
    resizeMode: 'contain', // Style de redimensionnement de l'image
    marginBottom: 20,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 100,
    padding:30
  },
});
