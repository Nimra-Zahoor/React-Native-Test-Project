import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const PollingTimer = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    try {
      const storedPoll = AsyncStorage.getItem('poll');
      if (storedPoll) setPoll(storedPoll);
    } catch (error) {
      console.error('Error parsing poll from sessionStorage:', error);
    }

    if (poll) {
      const endTime = Date.parse(poll.end_time);
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, endTime - currentTime);
        setRemainingTime(remainingTime);
        if (remainingTime === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [poll]);

  const formatTime = (time) => {
    if (!time) {
      return 'Poll Ended';
    }
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text>Time Remaining in Polling:</Text>
      <Text>{formatTime(remainingTime)}</Text>
    </View>
  );
};

export default PollingTimer;
