import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/core";
import ScheduledElections from "../Elections/ScheduledElections";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppliedCandidates from "../Candidates/AppliedCandidates";
import PollingTimer from "../Poll/PollingTimer";
export default function AdminDashboard() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <PollingTimer/>
      <View>
        <View style={styles.container}>
          <View style={styles.columnContainer3}>
            <Text>
              <ScheduledElections/>
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <AppliedCandidates />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.columnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Schedule Elections")}
          >
            <Text style={styles.title}>Schedule {"           "} Elections</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnContainer2}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Create Constituency")}
          >
            <Text style={styles.title}>Create{"          "} Constituency</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.columnContainer3}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Invite")}>
              <Text style={styles.title}>Invite For Adminship</Text>
              <Text style={styles.title2}>Tap for Inviting users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Invite")}>
            <View
              style={{
                height: 35,
                backgroundColor: "pink",
                borderWidth: 0,
                width: 35,
                marginLeft: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
               
               <Text style={{ color: "white" }}>{">"}</Text>
              </View>
               </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
