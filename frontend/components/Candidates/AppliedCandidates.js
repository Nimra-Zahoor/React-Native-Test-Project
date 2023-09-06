import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchAppliedCandidates } from "../../APIcalls/Candidate/candidatesApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CloudinaryImage } from "react-native-cloudinary";

import { styles } from "../Dashboards/style";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function AppliedCandidates() {
  const [candidates, setCandidates] = useState([]);
  //   const cld = new Cloudinary({
  //     cloud: {
  //         cloudName: 'demo'
  //     }
  // });

  const handleApproval = async (candidateId) => {
    try {
      const success = await approveCandidate(token, userType, candidateId);

      if (success) {
        alert("Approved");
        setCandidates((prevCandidates) => {
          return prevCandidates.map((candidate) => {
            if (candidate._id === candidateId) {
              return { ...candidate, approved: true };
            }
            return candidate;
          });
        });
      }
    } catch (error) {
      console.error("Error approving candidate:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const candidatesData = await fetchAppliedCandidates(token);
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.containerCandidate}>
      <View>
        {candidates?.map((candidate) => (
          <View key={candidate._id} style={styles.mainCardView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.subCardView}></View>

              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {candidate.user.username}
                </Text>
                <View style={{ marginTop: 4, borderWidth: 0, width: "85%" }}>
                  <Text style={{ color: "grey", fontSize: 12 }}>
                    {candidate.partyName}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 50,
                backgroundColor: "pink",
                borderWidth: 0,
                width: 100,
                marginLeft: -26,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleApproval;
                }}
              >
                <Text style={{color:'white'}}>Approve as Candidate</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
