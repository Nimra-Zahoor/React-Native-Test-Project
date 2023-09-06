import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { getAllUsersOtherThanAdmin ,inviteUser} from "../../APIcalls/Invite/InviteApi";
import { styles } from "../Dashboards/style";
function Invite() {
  const [selectedUser, setSelectedUser] = useState("");
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
   const fetchResults = async () => {
      try {
        const response = await getAllUsersOtherThanAdmin();
        setResults(response);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    }

    fetchResults();
  }, []);

  async function handleInvite() {
    try {
     const res =  await inviteUser(selectedUser);
      Alert.alert("Invitation sent successfully!");
      navigation.navigate("AdminDashboard"); 
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color:'blue'}}>Invite User</Text>
      <Text>Select User:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedUser(value)}
        items={results.map((user) => ({
          label: `CNIC: ${user.cnic} Constituency: ${user.constituency}`,
          value: user._id,
        }))}
        value={selectedUser}
        placeholder={{
          label: "Select User by CNIC",
          value: null,
        }}
      />
      <Button title="Invite User" onPress={handleInvite} />
    </View>
  );
}

export default Invite;
