import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';

const Signup = () => {
  console.log("Signup page console");
    const navigation = useNavigation();
        const handleRegisterPress = () =>{
            navigation.navigate('Signup')

    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Here</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Username"
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default Signup;
