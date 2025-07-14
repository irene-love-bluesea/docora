import { ScrollView, Text, View ,Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PatientOwnProfile() {
  return (
   <SafeAreaView style={{ flex: 1 }} className="bg-background">
    <Text className="text-2xl font-bold mt-6 mb-2 mx-5">Profile</Text>
         <ScrollView
           className="bg-background"
           style={{ flex: 1 }}
           contentContainerStyle={{
             flexGrow: 1,
           }}
           showsVerticalScrollIndicator={false}
         >
           <View className="flex-1 justify-start items-center px-5 py-4 bg-background pb-8">

             <View className="w-full p-3 rounded-lg bg-background flex-row justify-between items-center mb-2" style={{elevation: 2}}>
              <View className="flex-row items-center gap-3">
                 <Image
                 className="w-[60px] h-[60px] border border-gray-600 rounded-full"
                 source={require("../../assets/profile/patient_f.png")}
               />
               <View className="flex items-start">
                 <Text className="text-2xl text-center font-medium">
                   Sarah James
                 </Text>
                 <View className="flex-row items-center gap-1">
                   <Text className="text-lg text-gray-500 font-medium">
                     28 years old, Female
                   </Text>
                 </View>
               </View>
              </View>
              
              <TouchableOpacity>
                 <MaterialIcons name="edit" size={28} color="black" />
              </TouchableOpacity>
             </View>
             {/* Profile Card End */}

      </View>
      </ScrollView>
      </SafeAreaView>
  );
}
