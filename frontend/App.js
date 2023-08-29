import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminDashboard from "./components/Dashboards/AdminDashboard";
import CandidateDashboard from "./components/Dashboards/CandidateDashboard";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Splash from "./components/Splash/Splash";
import VoterDashboard from "./components/Dashboards/VoterDashboard";

export default function App() {
  const Stack = createNativeStackNavigator();
  console.log("aaaaaaaaaaaaaaaa");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false, 
          }}
        /> */}
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VoterDashboard" component={VoterDashboard} />
        <Stack.Screen name="CandidateDashboad" component={CandidateDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
   
  );
}