import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'; // Import RadioButton

import styles from './style';

const Login = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState(null);
  
  const handleLogin = () => {
    if (selectedRole === 'Admin') {
      navigation.navigate('AdminDashoard');
    } else if (selectedRole === 'Voter') {
      navigation.navigate('VoterDashboard');
    } else if (selectedRole === 'Candidate') {
      navigation.navigate('CandidateDashboard');
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login X</Text>
      <View style={styles.container}>
        <RadioButton.Group style={styles.radioContainer} onValueChange={(value) => setSelectedRole(value)} value={selectedRole}>
          <RadioButton.Item style={styles.radioButton} label="Admin" value="Admin" />
          <RadioButton.Item style={styles.radioButton} label="Voter" value="Voter" />
          <RadioButton.Item style={styles.radioButton} label="Candidate" value="Candidate" />
        </RadioButton.Group>

      </View>
      <TextInput style={styles.input} placeholder="Enter Your Email" />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        New to Voting App?{' '}
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default Login;
