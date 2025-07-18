import { Image, Text, View } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import Logo from "../../assets/logo/docora_hospital.svg";

export default function AuthScreen({ navigation }) {
  return (
    <View className="font-inter flex-1 justify-center items-center p-5 bg-background">
      <Logo width={150} height={130} />
      <View className=" justify-center items-center mt-5">
        <Text className="text-[16px] mb-6 text-center text-grey-500">
          Online consultation & treatment at your fingertips.
        </Text>
      </View>
      <CustomButton
        title="Sign Up"
        variant="primary"
        onPress={() => navigation.navigate("SignUp")}
      />
      <CustomButton
        variant="secondary"
        title="Log In"
        onPress={() => navigation.navigate("Login")}
      />
      <CustomButton
        variant="primary"
        title="Go to Patient Profile"
        onPress={() => navigation.navigate("BottomTabs", { userType: 'patient' })}
      />
      <CustomButton
        variant="primary"
        title="Go to Time slot selector"
        onPress={() => navigation.navigate("TimeSlotSelector")}
      />
      <CustomButton
        variant="primary"
        title="Go to Rate Doctor"
        onPress={() => navigation.navigate("RateDoctor")}
      />
    </View>
  );
}
