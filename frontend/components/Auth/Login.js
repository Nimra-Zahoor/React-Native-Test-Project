import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { login } from "../../APIcalls/Auth/authenticationAPIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./style";
const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const handleChange = (name, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!user.email || !user.password || !user.userType) {
      alert("Please fill in all the fields.");
      return;
    }
    try {
      const response = await login(user);
      if (response.status !== 400) {
        await AsyncStorage.setItem("jwt", response.token);
        alert(response.message);

        if (user.userType === "Admin") {
          navigation.navigate("AdminDashboard");
        } else if (user.userType === "Voter") {
          navigation.navigate("VoterDashboard");
        } else if (user.userType === "Candidate") {
          navigation.navigate("CandidateDashboard");
        }
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Error Login: " + error.message);
      alert("Login Failed");
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={(value) => handleChange("userType", value)}
          value={user.userType}
        >
          <View style={styles.radioButtonContainer}>
          <RadioButton.Item label="Admin" value="Admin" />
            <RadioButton.Item label="Voter" value="Voter" />
            <RadioButton.Item label="Candidate" value="Candidate" />
            </View>
        </RadioButton.Group>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        onChangeText={(value) => handleChange("email", value)}
        value={user.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        secureTextEntry
        onChangeText={(value) => handleChange("password", value)}
        value={user.password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        New to Voting App?{" "}
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default Login;
