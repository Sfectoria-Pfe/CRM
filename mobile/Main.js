import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from './component/buttontabs';
import Orboarding from './component/Orboarding';
import { NavigationContainer } from "@react-navigation/native";
import Inscrit from './login/inscrit';
import Home from './component/Home';
import Login from './login/login';
import Voir from './component/consulter';
import Location from './component/location';
import { useSelector, useDispatch } from "react-redux";
import { me } from "./store/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfile from './component/EditProfile';
import Profile from './component/Profile';
function Main() {
    const Stack = createNativeStackNavigator();
    const user = useSelector((state) => state.auth?.me);
    const dispatch = useDispatch();
  
    useEffect(() => {
      (async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          dispatch(me());
        }
      })();
    }, [dispatch]);
  
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {!user ? (
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Inscrit" component={Inscrit} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Voir" component={Voir} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="Orboarding" component={Orboarding} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Profile" component={Profile} />

          </Stack.Navigator>
        ) : (
            <Inscrit/>
          
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Main;
