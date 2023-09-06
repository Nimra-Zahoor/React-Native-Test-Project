import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../Auth/style";
import { scheduleElection } from "../../APIcalls/Election/ElectionApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

const ScheduleElection = () => {
  const [electionData, setElectionData] = useState({
    electionName: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const startDate = electionData.startDate.toDateString();
  const endDate = electionData.startDate.toDateString();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const navigation = useNavigation()
  const handleChange = (name, value) => {
    setElectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || electionData.startDate;
    setShowStartDatePicker(false);
    handleChange("startDate", currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || electionData.endDate;
    setShowEndDatePicker(false);
    handleChange("endDate", currentDate);
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      console.log(electionData);
      const response = await scheduleElection(electionData, token);
        Alert.alert("Success", "Elections Scheduled Successfully!");
        navigation.navigate('AdminDashboard');
      }
     catch (error) {
      console.error("Error scheduling elections:", error);
      Alert.alert("Error", "An error occurred while scheduling elections.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Election Schedule</Text>
      <TextInput
        style={styles.input}
        placeholder="Election Name"
        value={electionData.electionName}
        onChangeText={(text) => handleChange("electionName", text)}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.dateButton}
            title="Select Start Date"
            onPress={() => setShowStartDatePicker(true)}
          />
          <Text>{startDate}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.dateButton}
            title="Select End Date"
            onPress={() => setShowEndDatePicker(true)}
          />
          <Text>{endDate}</Text>
        </View>
      </View>
      {showStartDatePicker && (
        <DateTimePicker
          value={electionData.startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={electionData.endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ScheduleElection;
