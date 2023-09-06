import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { styles } from "../Auth/style";
import { createCofunctionnstituency } from "../../APIcalls/Constutiency/ConstituencyAPIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateConstituency()  {
  const [constituency, setConstituency] = useState({ name: "", location: "" });
  const handleChange = (name, value) => {
    setConstituency((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async( ) =>{
     try{
        const token = await AsyncStorage.getItem('jwt');
        console.log(token,constituency);
        const response = await createConstituency(constituency,token);
        Alert.alert("Success", "Constituency Created Successfully!",response);
        navigation.navigate('AdminDashboard');
     }
     catch(error){
        Alert.alert("Error","Error While Creating the Constituency");
     }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Constituency</Text>
      <TextInput
        style={styles.input}
        placeholder="Constituency Name"
        value={constituency.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Constituency Location"
        value={constituency.location}
        onChangeText={(text) => handleChange("location", text)}
      />
      <Button style={styles.button} title="Create" onPress={handleSubmit}></Button>
    </View>
  );
}
