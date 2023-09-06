import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { startPolling } from '../../APIcalls/Poll/PollApis';
import { styles } from '../Dashboards/style';
import { useRoute } from '@react-navigation/native';

function PollingControl() {
  const [poll, setPoll] = useState(null);
  const [duration, setDuration] = useState('');
  const route = useRoute();
  const electionId = route.params?.electionId;
  const handleStartPolling = async () => {
    try {
      const response = await startPolling(duration,electionId);
      setPoll(response);
      Alert.alert('Poll Started');
    } catch (error) {
      Alert.alert('Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
     <View>
          <TextInput
            style={styles.input}
            placeholder='Enter Polling duration in mins'
            value={duration}
            onChangeText={(text) => setDuration(text)}
            keyboardType='numeric'
          />
          <Button title='Start' onPress={handleStartPolling} />
        </View>
    </View>
  );
}

export default PollingControl;
