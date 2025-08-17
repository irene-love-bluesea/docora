import { Image, Text, View } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import Logo from "../../assets/logo/docora_hospital.svg";

export default function AuthScreen({ navigation }) {
  return (
    <View className=" flex-1 justify-center items-center p-5 bg-background">
      <Logo width={150} height={130} />
      <View className=" justify-center items-center mt-5">
        <Text className="text-[16px] mb-6 text-center text-grey-500 " >
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
        title="Go to doctor Profile"
        onPress={() => navigation.navigate("BottomTabs", { role: 'doctor' })}
      />
      <CustomButton
        variant="primary"
        title="Go to patient Profile"
        onPress={() => navigation.navigate("BottomTabs", { role: 'patient' })}
      />

      <CustomButton
        variant="primary"
        title="Go to identity verification"
        onPress={() => navigation.navigate("VerifyIdentity")}
      />

<CustomButton
        variant="primary"
        title="Go to review doctor"
        onPress={() => navigation.navigate("ViewConsultationNote")}
      />

    </View>
  );
}
