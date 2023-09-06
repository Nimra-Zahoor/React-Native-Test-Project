import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getScheduledElections } from "../../APIcalls/Election/ElectionApi";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduledElections = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getScheduledElections();
        AsyncStorage.setItem('poll', JSON.stringify(response));

        setResults(response);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <View style={styles.container}>
      {results.map((election) => (
        <View key={election._id} style={styles.container}>
          <Text style={styles.electionName}>{election.name}</Text>
          <View style={styles.date}>
            <Text style={styles.date}>
              Start Date: {new Date(election.start_date).toLocaleDateString()}
            </Text>
            <Text style={styles.date}>
              End Date: {new Date(election.end_date).toLocaleDateString()}
            </Text>

          
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Polling",{electionId:election._id})}>
            <View
              style={{
                height: 35,
                backgroundColor: "pink",
                borderWidth: 0,
                width: 35,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft:25
              }}
            >
              <Text style={{ color: "white" }}>Poll</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    padding: 10,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  electionContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  electionName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  date: {
    marginLeft: 13,
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
});

export default ScheduledElections;
