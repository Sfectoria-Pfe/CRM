import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { imagedataurl } from "../constante/data";

const PhotosRoutes = () => (
  <View>
    <Text>Photos</Text>
  </View>
);

const LikesRoutes = () => (
  <View>
    <Text>Likes</Text>
  </View>
);

const renderScene = SceneMap({
  first: PhotosRoutes,
  second: LikesRoutes,
});

const Profile = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Photos" },
    { key: "second", title: "Likes" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "#9999ff",
      }}
      style={{
        backgroundColor: "white",
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? "black" : "gray" }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const handleProfileUpdate = (updatedData) => {
    // Mettez à jour les données du profil avec les données mises à jour
  };
  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="gray" />
      <View style={{ flex: 1 }}>
        <View style={{ width: "100%", height: 228 }}>
          <Image
            source={{
              uri: "https://pichet.twic.pics/var/site/storage/images/_aliases/product_item/8/6/4/1/651468-3-fre-FR/69ae60754a97-Teasing_vignette_690x380.jpg",
            }}
            resizeMode="cover"
            style={{ flex: 1 }}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              overflow: "hidden", // Clip the image to the circular border
              borderColor: "primary",
              borderWidth: 5,
              marginTop: -190,
            }}
          >
            <Image
              source={{
                uri: "https://pichet.twic.pics/var/site/storage/images/_aliases/product_item/8/6/4/1/651468-3-fre-FR/69ae60754a97-Teasing_vignette_690x380.jpg",
              }}
              resizeMode="contain"
              style={{ flex: 1, width: "100%", height: "100%" }}
            />
          </View>

          <Text
            style={{
              fontSize: 24,
              color: "#9999ff",
              marginVertical: 8,
            }}
          >
            Roua Alarji
          </Text>
          <Text
            style={{
              color: "#9999ff",
              fontSize: 21,
            }}
          >
            arjiroua@gmail.com
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="location-on" size={24} color="#9999ff" />
            <Text style={{ fontSize: 25, marginLeft: 4 ,color:"#9999ff"}}>tunis gafsa</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#9999ff",
              borderRadius: 10,
              marginHorizontal: 20,
            }}
            onPress={handleProfileUpdate} // Ajout de la gestion de l'événement onPress
          >
            <Text style={{ fontSize: 25, color: "white" }} onPress={() => navigation.navigate("EditProfile")}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000099" }}>122</Text>
              <Text style={{ fontSize: 16, color: "#000099" }}>
                Followers
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000099" }}>67</Text>
              <Text style={{ fontSize: 16, color: "#000099" }}>
                Followings
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000099" }}>77K</Text>
              <Text style={{ fontSize: 16, color: "#000099" }}>Likes</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: 22, marginBottom: 20 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
      {/* Le reste de votre contenu */}
    </SafeAreaView>
  );
};

export default Profile;






