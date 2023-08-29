import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminDashboard from "./components/Dashboards/AdminDashboard";
import CandidateDashboard from "./components/Dashboards/CandidateDashboard";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Splash from "./components/Splash/Splash";
import VoterDashboard from "./components/Dashboards/VoterDashboard";

const Stack = createNativeStackNavigator();
export default function App() {
  console.log("a");

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false, 
          }}
        /> */}
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}