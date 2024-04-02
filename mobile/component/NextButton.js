import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function NextButton({ percentage,index,scrollToNextItem ,lastIndex}) {
  const navigation = useNavigation()
  const size = 128;
  const strokeWidth =2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth/2
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            cx={center}
            stroke="#E6E7E8"
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="white"
          />
          <Circle
            cx={center}
            cy={center}
            r={radius}
            fill="white"
            stroke="#F4338F"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (circumference * percentage) / 100
            }
          />
        </G>
      </Svg>
      <TouchableOpacity style={styles.button}>
      <AntDesign name="arrowright" size={32} color="#fff" onPress={()=>
          index===lastIndex ? navigation.navigate("Inscrit") : scrollToNextItem(index+1)} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#F4338F",
    borderRadius: 100,
    padding: 20,
  },
});