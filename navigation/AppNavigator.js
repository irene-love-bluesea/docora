import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AuthScreen from "../screens/auth/Auth";
import HomeScreen from "../screens/doctor/Home";
import SignUpScreen from "../screens/auth/SignUp";
import LoginScreen from "../screens/auth/Login";
import VerifyScreen from "../screens/auth/Verify";
import DoctorScheduleScreen from "../screens/doctor/Schedule";
import DoctorChatScreen from "../screens/doctor/Chat";
import ProfileScreen from "../screens/doctor/Profile";
import PatientProfile from "../screens/doctor/PatientProfile";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import VerifyIdentity from "../screens/auth/VerifyIdentity";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = ({
  title,
  navigation,
  backgroundColor = "transparent",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor, paddingTop: insets.top + 20 },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back-sharp" size={30} color="black" />
      </TouchableOpacity>
      <Text className="font-alata" style={styles.headerTitle}>
        {title}
      </Text>
    </View>
  );
};

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "DoctorSchedule") {
            iconName = focused ? "calendar-sharp" : "calendar-outline";
          } else if (route.name === "DoctorChat") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "DoctorProfile") {
            iconName = focused ? "person" : "person-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#023E8A",
        tabBarInactiveTintColor: "#023E8A",
        tabBarStyle: {
          backgroundColor: "#E6F2FF",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DoctorSchedule"
        component={DoctorScheduleScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DoctorChat"
        component={DoctorChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DoctorProfile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
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

const styles = {
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  backButton: {
    position: "absolute",
    left: 10,
    bottom: 20,
  },
};
