import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
    Alert,
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
import { useFilterBySpecialty, useSearchBySpecialtyAndName } from "../../api/hooks/useDoctorData";
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
    const [doctorList, setDoctorList] = useState([]);

        const normalizeDoctor = (item = {}, idx = 0) => {
                const id = item?._id || item?.userId?._id || idx;
                const name =
                    item.name ||
                    item.fullName ||
                    item.doctorName ||
                    item.userId?.name ||
                    item.userId?.fullName ||
                    item.userId?.doctorName ||
                    "Unknown";

                const profileUrl =
                    item.profileUrl ||
                    item.profilePhoto ||
                    item.image ||
                    item.userId?.profileUrl ||
                    item.userId?.profilePhoto ||
                    item.userId?.image;

                const specialtyVal =
                    item.specialty ||
                    item.specialization ||
                    item.userId?.specialty ||
                    item.userId?.specialization ||
                    "";

                const rating = item.averageRating ?? item.rating ?? item.userId?.averageRating ?? item.userId?.rating ?? "-";

                return { ...item, _id: id, name, profileUrl, specialty: specialtyVal, averageRating: rating };
        };


    const { mutate, data: doctors, isLoading, isError } = useFilterBySpecialty();
    useEffect(() => {
        if (specialty) {
            mutate(specialty);
        }
    }, [specialty, mutate]);

    useEffect(() => {
        if (Array.isArray(doctors)) {
            setDoctorList(doctors.map((item, idx) => normalizeDoctor(item, idx)));

        }
    }, [doctors]);

    const insets = useSafeAreaInsets();

    const { mutate: searchBySpecialtyAndName, isPending: isSearching } = useSearchBySpecialtyAndName();

    const performSearch = (term) => {
        const value = term.trim();
        if (!value) {
            setDoctorList(doctors || []);
            return;
        }

        searchBySpecialtyAndName(
            { specialty, name: value },
            {
                onSuccess: (data) => {
                    const normalized = (data ?? []).map((item, idx) => normalizeDoctor(item, idx));
                    setDoctorList(normalized);
                },
                onError: (error) => {
                    const message = error?.response?.data?.message || error?.message || "Search failed";
                    Alert.alert("Unable to search", message);
                },
            }
        );
    };

    const handleSearch = () => {
        performSearch(search);
    };

    useEffect(() => {
        const term = search.trim();

        if (!term) {
            setDoctorList((doctors || []).map((item, idx) => normalizeDoctor(item, idx)));
            return undefined;
        }

        const timer = setTimeout(() => {
            performSearch(term);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, doctors]);

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
                            placeholder="Search by doctor name"
                            value={search}
                            onChangeText={setSearch}
                            returnKeyType="search"
                                onSubmitEditing={handleSearch}
                        />
                    </View>

                    {/* filtered by specialty doctor */}
                    <View className=" mx-5 mb-5">
                        <View className="mt-4">
                            {isLoading || isSearching ? (
                                <Text className="text-center text-lg text-gray-500">Loading doctors...</Text>
                            ) : isError ? (
                                <Text className="text-center text-lg text-red-500">Failed to load doctors.</Text>
                            ) : !doctorList || doctorList.length === 0 ? (
                                <Text className="text-center text-lg text-gray-500">No doctors to show yet.</Text>
                            ) : (
                                doctorList.map((item) => (
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
