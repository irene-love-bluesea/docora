import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {
    useSafeAreaInsets
} from "react-native-safe-area-context";
import { usePopularDoctors } from "../../api/hooks/useDoctorData";
import Logo from "../../assets/logo/docora_hospital.svg";
import PopularDoctorsCard from "../../components/Card/PopularDoctorsCard";
import SpecialitiesShowCard from "../../components/Card/SpecialitiesShowCard";
import {
    Cardiologist,
    Dentist,
    Dermatologist,
    GeneralPhysician,
    Pediatrician,
    Psychiatrist
} from "../../constant/data/doctorDetails";

export default function PatientHome({ navigation }) {
  const specialty = [
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

  const [specialtyData, setspecialtyData] = useState(specialty);
  const [popularDoctors, setPopularDoctors] = useState([]);
  const [search, setSearch] = useState("");
  // const { user, logout } = useAuth();
  // logout();

  const popularDoctorsMutation = usePopularDoctors();

  useEffect(() => {
    const loadPopularDoctors = async () => {
      try {
        const arr = await popularDoctorsMutation.mutateAsync();
        setPopularDoctors(arr); // <-- arr is an array now
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Doctors loading Failed";
        Alert.alert("Load Failed", errorMessage);
      }
    };
    loadPopularDoctors();
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ flex: 1, paddingTop: insets.top }}
      className=" bg-background"
    >
      <View className=" flex-row justify-between items-center px-5 py-5 bg-background ">
        <Logo width={60} height={50} />
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
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

          {/* specialty box  */}
          <View className="flex-row justify-center items-center flex-wrap gap-2 mt-4 mx-5">
            {specialtyData?.map((item) => (
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
              {popularDoctors.length === 0 ? (
                <Text>No doctors to show yet.</Text>
              ) : (
                popularDoctors.map((item) => (
                  <PopularDoctorsCard
                    key={item?._id || item?.userId?._id}
                    item={item}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
