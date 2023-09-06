import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import CandidateDashboard from "./components/Dashboards/CandidateDashboard";
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Splash from "./components/Splash/Splash";
import VoterDashboard from "./components/Dashboards/VoterDashboard";
import ScheduleElections from "./components/Elections/ScheduleElections";
import CreateConstituency from "./components/Constituency/CreateConstituency";
import Invite from "./components/Invite/Invite";
import PollControl from "./components/Poll/PollControl";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AdminDashboard" component={AdminDashboard}    options={{
          title: ' Admin Dashboard',
          headerStyle: {
            backgroundColor: '#black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Schedule Elections" component={ScheduleElections} />
        <Stack.Screen
          name="Create Constituency"
          component={CreateConstituency}
        />

        <Stack.Screen
          name="CandidateDashboard"
          component={CandidateDashboard}
        />
        <Stack.Screen name="VoterDashBoard" component={VoterDashboard} />
        <Stack.Screen name="Invite" component={Invite} />
        <Stack.Screen name="Polling" component={PollControl} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
