import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../assets/logo/docora_hospital.svg";

export const CustomHeader = ({
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

export const PatientHomeHeader = ({
  title,
  navigation,
  backgroundColor = "transparent",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor, paddingTop: insets.top + 20 , justifyContent: "space-between"},
      ]}
    >
      <Logo width={60} height={50} />
      <Ionicons name="notifications-outline" size={24} color="#023E8A" />
    </View>
  );
};

const styles = {
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  backButton: {
    position: "absolute",
    left: 10,
    bottom: 0,
  },
};
