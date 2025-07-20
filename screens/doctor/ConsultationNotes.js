import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConsultationNotes() {
  return (
   <SafeAreaView style={{ flex: 1 }} className="bg-background">
       <ScrollView
         className="bg-background"
         style={{ flex: 1 }}
         contentContainerStyle={{
           flexGrow: 1,
         }}
         showsVerticalScrollIndicator={false}
       >
         <View className="flex-1 justify-start items-center px-5 bg-background pb-8">
           <View className="w-full flex-row items-center gap-5 mb-2">
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
           {/* Profile end */}


        <View>
            <Text className="text-xl font-semibold">
            Post Consultation Notes
            </Text>

             <Text className="text-lg font-semibold">Email</Text>
        </View>



        </View>
        </ScrollView>
        </SafeAreaView>
  )
}
