import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/auth/Auth";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import LoginScreen from "../screens/auth/Login";
import PatientInfo from "../screens/auth/PatientInfo";
import RoleSelector from "../screens/auth/RoleSelector";
import SignUpScreen from "../screens/auth/SignUp";
import VerifyScreen from "../screens/auth/Verify";
import VerifyIdentity from "../screens/auth/VerifyIdentity";
import DoctorChatScreen from "../screens/doctor/Chat";
import HomeScreen from "../screens/doctor/Home";
import PatientProfile from "../screens/doctor/PatientProfile";
import ProfileScreen from "../screens/doctor/Profile";
import DoctorScheduleScreen from "../screens/doctor/Schedule";
import PatientHome from "../screens/patient/PatientHome";
import Profile from "../screens/patient/PatientProfile";
import PatientSchedule from "../screens/patient/PatientSchedule";
import PatientChat from "../screens/patient/PatientChat";
import { CustomHeader, PatientHomeHeader } from "../components/Header";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Screens for a doctor
const doctorTabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
  { name: "Schedule", component: DoctorScheduleScreen, icon: "calendar" },
  { name: "Chat", component: DoctorChatScreen, icon: "chatbox" },
  { name: "Profile", component: ProfileScreen, icon: "person" },
];

// Screens for a patient (you'll need to create these screens)
const patientTabs = [
  { name: "Home", component: PatientHome, icon: "home" },
  { name: "Schedule", component: PatientSchedule, icon: "calendar" },
  { name: "Chat", component: PatientChat, icon: "chatbox" },
  { name: "Profile", component: Profile, icon: "person" },
];

function BottomTabs({ route }) {
  // Get userType from the route params
  const { userType } = route.params;

  // Select the correct set of tabs based on the user type
  const tabsToRender = userType === "doctor" ? doctorTabs : patientTabs;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          // Find the current tab's configuration to get the icon name
          const tabConfig = tabsToRender.find((tab) => tab.name === route.name);
          const iconName = focused
            ? tabConfig.icon
            : `${tabConfig.icon}-outline`;

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#023E8A",
        tabBarInactiveTintColor: "#023E8A",
        tabBarStyle: {
          backgroundColor: "#E6F2FF",
        },
        headerShown: false, // Apply headerShown to all screens in the navigator
        // tabBarShowLabel: false,
      })}
    >
      {/* Map over the selected array to create the screens */}
      {tabsToRender.map((tab) =>
        tab.name === "Home" && userType === "patient" ? ( // condition rendering
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              headerShown: true,
              header: ({ navigation }) => (
                <PatientHomeHeader
                  title="Sign Up"
                  navigation={navigation}
                  backgroundColor="#E6F2FF"
                />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        )
      )}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Sign Up"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Log In"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Verify"
        component={VerifyScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Verification"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
      <Stack.Screen
        name="RoleSelector"
        component={RoleSelector}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="PatientInfo"
        component={PatientInfo}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Detail Information"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Verification"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientProfile"
        component={PatientProfile}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Patient Profile"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
      <Stack.Screen
        name="VerifyIdentity"
        component={VerifyIdentity}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Verify Identity"
              navigation={navigation}
              backgroundColor="#E6F2FF"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
