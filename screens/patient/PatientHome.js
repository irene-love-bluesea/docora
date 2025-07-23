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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
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
import SpecialitiesShowCard from "../../components/Card/SpecialitiesShowCard";

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

  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 , paddingTop: insets.top}} 
    className=" bg-background">
        <View className=" flex-row justify-between items-center px-5 py-5 bg-background ">
          <Logo width={60} height={50} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
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
                <SpecialitiesShowCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  icon={item.icon}
                  navigation={navigation}
                />
              ))}
            </View>

            {/* most popular doctor  */}
            <View className=" mx-5 mb-5">
              <Text className=" text-xl font-semibold mt-5">
                Most Popular Doctors
              </Text>

              <View className="mt-4">
                {popularDoctors?.map((item) => (
                  <PopularDoctorsCard key={item?.id} item={item} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
    </View>
  );
}
