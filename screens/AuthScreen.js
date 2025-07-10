import { Image, Text, View } from 'react-native';
import CustomButton from '../components/Buttons/CustomButton';
import Logo from  '../assets/logo/docora_hospital.svg';

export default function AuthScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Logo width={150} height={130}  />
      <View className=" justify-center items-center mt-5">
        <Text className="text-[16px] mb-6 text-center text-grey-500">
          Online consultation & treatment at your fingertips.
        </Text>
      </View>
      <CustomButton
        title="Sign Up"
        variant='primary'
      />
      <CustomButton variant="secondary" title="Log In" 
       onPress={() => navigation.navigate('Home')} />
      
    </View>
  );
}
