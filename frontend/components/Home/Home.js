import { View, Text, Image, ImageBackground } from "react-native";

import styles from "./Style";
import Login from "../Auth/Login";
const Home = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

export default Home;
