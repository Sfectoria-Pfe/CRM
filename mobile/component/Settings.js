import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from "@expo/vector-icons";

export default function Settings({ navigation }) {
  const navigateToEditprofile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToSecurity = () => {
    console.log("security function");
  };

  const navigateToNotification = () => {
    console.log("Notification function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };

  const accountItems = [
    { icon: "person-outline", text: "Edit Profile", action: navigateToEditprofile },
    { icon: "security", text: "security", action: navigateToSecurity },
    { icon: "notifications-none", text: "Notification", action: navigateToNotification },
    { icon: "lock-outline", text: "privacy", action: navigateToPrivacy }
  ];

  const navigateToSubscription = () => {
    console.log("subscription function");
  };

  const navigateToSupport = () => {
    console.log("support function");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms And Policies function");
  };

  const navigateToReportProblem = () => {
    console.log("Report Problem function");
  };

  const addAccount = () => {
    console.log("add Account function");
  };

  const logout = () => {
    console.log("logout function");
  };

  const navigateToFreespace = () => {
    console.log("Free space function");
  };

  const navigateToDateSaver = () => {
    console.log("Date Saver function");
  };

  const supportItems = [
    { icon: "credit-card", text: "My Subscription", action: navigateToSubscription },
    { icon: "help-outline", text: "help-support", action: navigateToSupport },
    { icon: "info-outline", text: "terms and policies", action: navigateToTermsAndPolicies }
  ];

  const cacheAndCellularItems = [
    { icon: "delete", text: "free up space", action: navigateToFreespace },
    { icon: "save", text: "Date Saver", action: navigateToDateSaver }
  ];

  const actionItems = [
    { icon: "people-outline", text: "report a problem", action: navigateToReportProblem },
    { icon: "people-outline", text: "Add Account", action: addAccount },
    { icon: "logout", text: "log out", action: logout }
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity onPress={action} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingLeft: 12, backgroundColor: 'gray' }}>
      <MaterialIcons name={icon} size={24} color="black" />
      <Text style={{ marginLeft: 36, fontWeight: '600', fontSize: 16 }}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
     

      <ScrollView style={{ marginHorizontal: 12 }}>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 20, marginVertical: 10,color:"#0000e6" }}>Account</Text>
          <View style={{ borderRadius: 12, backgroundColor: 'gray' }}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 20, marginVertical: 10,color:"#0000e6" }}>support & about </Text>
          <View style={{ borderRadius: 12, backgroundColor: 'gray' }}>
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 20, marginVertical: 10 ,color:"#0000e6"}}>cache et cellular </Text>
          <View style={{ borderRadius: 12, backgroundColor: 'gray' }}>
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 20, marginVertical: 10 ,color:"#0000e6"}}>actions </Text>
          <View style={{ borderRadius: 12, backgroundColor: 'gray' }}>
            {actionItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

