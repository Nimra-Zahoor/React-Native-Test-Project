import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={['#7286D3', '#E5E0FF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../../assets/images/votingMachine.png')}
        />
        <Text style={styles.text}>Voting App</Text>
      </View>
    </LinearGradient>
  );
};

export default Splash;
