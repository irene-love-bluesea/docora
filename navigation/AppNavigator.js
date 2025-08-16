import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../components/Providers/AuthProvider";
import {
  authScreens,
  doctorTabs,
  patientTabs,
  stackScreens,
} from "../constant/screens";
import { userRoles } from "../constant/data/role";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs({ route }) {
  // Get userType from the route params
  const { session } = useAuth();
  // console.log("user bottom tabs: ", user);

  if (!session) {
    return null;
  }
  const userType = session?.user?.role;
  // const { userType } = route.params;

  // Select the correct set of tabs based on the user type
  const tabsToRender = userType === "DOCTOR" ? doctorTabs : patientTabs;

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
      {tabsToRender.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      {/* Add BottomTabs screen with special handling */}
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Loop through all stack screens */}
      {stackScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}

export function AuthNavigator({user}) {
  let initialRouteName = "Auth";
  
  if (user) {
    if (!user?.verifyEmail) {
      initialRouteName = "Verify";
    } else if (user?.role === userRoles.UNDEFINED) {
      initialRouteName = "RoleSelector";
    }
  }

  const navigatorKey = user ? `auth-${user._id || 'user'}-${user.verifyEmail}-${user.role}` : 'auth-no-user';
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {authScreens.map((screen) => (
        <Stack.Screen
          key={navigatorKey}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}
