import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ProfileEditCard = ({
  title,
  children,
  onEdit,
  backgroundColor = "bg-secondary",
}) => {
  return (
    <View className="mt-4 bg-white rounded-lg" style={{ elevation: 1 }}>
      <View
        className={`p-3 w-full flex-row justify-between rounded-t-lg ${backgroundColor}`}
      >
        <Text className="text-xl font-semibold">{title}</Text>
        <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="edit" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const settingsOptions = [
  {
    label: "Change Password",
    icon: <Ionicons name="key" size={25} color="#023E8A" />,
    textColor: "text-black",
    iconColor: "black",
    bgColor: "bg-secondary",
    route: "ChangePassword",
  },
  {
    label: "Two-Factor Authentication",
    icon: <Ionicons name="lock-closed" size={25} color="#023E8A" />,
    textColor: "text-black",
    iconColor: "black",
    bgColor: "bg-secondary",
    route: "PatientProfile",
  },
  {
    label: "Privacy Policy",
    icon: <Ionicons name="shield-half" size={25} color="#023E8A" />,
    textColor: "text-black",
    iconColor: "black",
    route: "PatientProfile",
    bgColor: "bg-secondary",
    route: "PrivacyPolicy",
  },
  {
    label: "Log Out",
    icon: <MaterialIcons name="logout" size={25} color="#023E8A" />,
    textColor: "text-black",
    iconColor: "black",
    bgColor: "bg-secondary",
    route: "",
  },
  {
    label: "Delete Account",
    icon: <MaterialIcons name="delete" size={25} color="red" />,
    textColor: "text-red-500",
    iconColor: "red",
    bgColor: "bg-red-100",
    route: "PatientProfile",
  },
];

export const SettingCard = ({
  backgroundColor = "bg-secondary",

  onLogoutPress,
}) => {
  const navigation = useNavigation();

  return (
    <View className="mt-4 w-full bg-white rounded-lg" style={{ elevation: 1 }}>
      <View className={`p-3 w-full rounded-t-lg ${backgroundColor}`}>
        <Text className="text-xl font-semibold">Security & Settings</Text>
      </View>

      {settingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={
            item.route === ""
              ? onLogoutPress
              : () => navigation.navigate(item.route)
          }
        >
          <View className="px-3 py-4 flex-row justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <View className={`p-2 rounded-full ${item.bgColor}`}>
                {item.icon}
              </View>
              <Text className={`text-lg font-semibold ${item.textColor}`}>
                {item.label}
              </Text>
            </View>
            <AntDesign name="right" size={25} color="black" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
