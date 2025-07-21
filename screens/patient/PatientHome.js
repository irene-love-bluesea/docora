import { useState } from "react";
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Logo from "../../assets/logo/docora_hospital.svg";
import {
  Cardiologist,
  Dentist,
  Dermatologist,
  GeneralPhysician,
  Pediatrician,
  popularDrs,
  Psychiatrist,
} from "../../constant/data/doctorDetails";
import PopularDoctorsCard from "../../components/Card/PopularDoctorsCard";

export default function PatientHome({ navigation }) {
  const specialityR = [
    {
      id: 1,
      name: "General Physician",
      icon: <GeneralPhysician width={30} height={30} />,
    },
    {
      id: 2,
      name: "Dermatologist",
      icon: <Dermatologist width={30} height={30} />,
    },
    {
      id: 3,
      name: "Pediatrician",
      icon: <Pediatrician width={30} height={30} />,
    },
    {
      id: 4,
      name: "Dentist",
      icon: <Dentist width={30} height={30} />,
    },
    {
      id: 5,
      name: "Cardiologist",
      icon: <Cardiologist width={30} height={30} />,
    },
    {
      id: 6,
      name: "Psychiatrist",
      icon: <Psychiatrist width={30} height={30} />,
    },
  ];

  const [specialityData, setSpecialityData] = useState(specialityR);
  const [popularDoctors, setPopularDoctors] = useState(popularDrs);
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background ">
      <View className=" flex-row justify-between items-center px-5 py-5 bg-background ">
        <Logo width={60} height={50} />
        <TouchableOpacity onPress={() => navigation.navigate("NotificationPatient")}>
            <Ionicons name="notifications-outline" size={26} color="#023E8A" />
        </TouchableOpacity>
      </View>
      <ScrollView
        className=" bg-background pt-3 "
        style={{
          flex: 1,
          // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="">
          {/* search bar  */}
          <View className=" flex-row items-center bg-white rounded-lg px-5 mx-5 ">
            <Ionicons name="search" size={20} color="#999" className="" />
            <TextInput
              className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
              placeholder="Search  by specialty or doctor name"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* speciality box  */}
          <View className="flex-row justify-center items-center flex-wrap gap-2 mt-4 mx-5">
            {specialityData?.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SearchDoctor", {
                    speciality: item.name,
                  });
                }}
                key={item.id}
                className="flex-col justify-center items-center gap-5 py-3 rounded-lg border border-white bg-white mt-1 flex-1 min-w-[140px] max-w-[48%]"
              >
                {item.icon}
                <Text className="text-lg font-semibold text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* most popular doctor  */}
          <View className=" mx-5 mb-5">
            <Text className=" text-xl font-semibold mt-5">
              Most Popular Doctors
            </Text>

            <View className="mt-4">
              {popularDoctors?.map((item) => (
                <PopularDoctorsCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
