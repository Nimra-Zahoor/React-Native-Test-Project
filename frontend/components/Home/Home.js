import { View, Text, Image, ImageBackground } from "react-native";

import styles from "./Style";
import Login from "../Auth/Login";
const Home = () => {
    console.log('Hello world')
    debugger
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}> Hi Welcome To Voting App</Text>
      <Login />
    </View>
  );
};

export default Home;
