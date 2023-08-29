import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, Image,ImageBackground } from 'react-native';

import styles from './styles';
const Splash = () => {
    const navigation = useNavigation(); 
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000); 
      }, []);
    return (
      <View style={styles.container}>
        {/* <ImageBackground style={styles.background} source={require('../../assets/images/background.jpeg')}> */}
        <Image style={styles.image} source={require('../../assets/images/votingMachine.png')} />
          <Text style={styles.text}> Voting App </Text>

        {/* </ImageBackground> */}
         
     </View>
     
    )
  }
  
  export default Splash;