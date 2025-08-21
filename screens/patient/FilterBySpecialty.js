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
// Import the correct hook
import { useFilterBySpecialty } from "../../api/hooks/useDoctorData";
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

export default function FilterBySpecialty({ navigation, route }) {
    const { specialty } = route.params;
    
    const specialtyMap = [
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

    const [specialtyData, setSpecialtyData] = useState(specialtyMap);
    const [search, setSearch] = useState("");
    
    const { mutate, data: doctors, isLoading, isError } = useFilterBySpecialty();
    console.log("Doctors",doctors);
    useEffect(() => {
        if (specialty) {
            mutate(specialty);
        }
    }, [specialty, mutate]);

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
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="">
                    {/* search bar */}
                    <View className=" flex-row items-center bg-white rounded-lg px-5 mx-5 ">
                        <Ionicons name="search" size={20} color="#999" />
                        <TextInput
                            className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
                            placeholder="Search by specialty or doctor name"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>

                    {/* filtered by specialty doctor */}
                    <View className=" mx-5 mb-5">
                        <View className="mt-4">
                            {isLoading ? (
                                <Text className="text-center text-lg text-gray-500">Loading doctors...</Text>
                            ) : isError ? (
                                <Text className="text-center text-lg text-red-500">Failed to load doctors.</Text>
                            ) : !doctors || doctors.length === 0 ? (
                                <Text className="text-center text-lg text-gray-500">No doctors to show yet.</Text>
                            ) : (
                                doctors.map((item) => (
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
