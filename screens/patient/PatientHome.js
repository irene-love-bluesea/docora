import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GeneralPhysician from "../../assets/icon/speciality/general.svg"
import Dermatologist from "../../assets/icon/speciality/dermatologist.svg"
import Pediatrician from "../../assets/icon/speciality/pediatrician.svg"
import Cardiologist from "../../assets/icon/speciality/cardiologist.svg"
import Psychiatrist from "../../assets/icon/speciality/psychiatrist.svg"
import Dentist from "../../assets/icon/speciality/dentist.svg"

export default function PatientHome() {

  const specialityData = [
    {
      id: 1, 
      name: "General Physician",
      icon: <GeneralPhysician width={30} height={30} />,
    },
    {
      id: 2, 
      name: "Dermatologist",
      icon: <Dermatologist width={30} height={30} />
    },
    {
      id: 3, 
      name: "Pediatrician",
      icon: <Pediatrician width={30} height={30} /> 
    },
    {
      id: 4, 
      name: "Dentist",
      icon: <Dentist width={30} height={30} />
    },
    {
      id: 5, 
      name: "Cardiologist",
      icon: <Cardiologist width={30} height={30} /> 
    
    },
    {
      id: 6, 
      name: "Psychiatrist",
      icon: <Psychiatrist width={30} height={30} />
    },
  ]
  const [search,setSearch] = useState('');
  return (
    <View className="flex-1  bg-background">
      {/* search bar  */}
      <View  className=" flex-row items-center bg-white rounded-lg px-5 mx-5 ">
        <Ionicons name="search" size={20} color="#999" className="" />
        <TextInput
          className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Search  by specialty or doctor name"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View> 

      {/* speciality box  */}
      <View className="flex-row  justify-center items-center flex-wrap gap-2  mt-4 mx-5">
        {
          specialityData?.map((item) => (
          <View key={item.id} style={{width:"49%"}} className="flex-col justify-center items-center gap-5 py-3  rounded-lg border border-white  bg-white mt-1 ">
            {item.icon}
            <Text className="text-lg font-semibold ">{item.name}</Text>
          </View>
          ))
        }
      </View>


      {/* most popular doctor  */}
      <View className=" mx-5">
        <Text className=" text-xl font-semibold mt-5">Most Popular Doctors</Text>

        <View className="mt-4">
          <View className="flex-row justify-between items-center">
            {/* <Image
              source={require("../../assets/logo/")}
              className="w-[60px] h-[60px] rounded-full"
            /> */}
            <View className="flex-col items-start">
              <Text>Dr. John Doe</Text>
              <Text className="text-sm text-gray-500">
                <GeneralPhysician width={30} height={30} />
                General Physician
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
