import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilterByName } from "../../api/hooks/useDoctorData";

export default function SearchDoctor({ navigation, route }) {
  const initialQuery = route?.params?.initialQuery ?? "";
  const initialResults = route?.params?.results ?? [];

  const [search, setSearch] = useState(initialQuery);
  const [doctors, setDoctors] = useState(initialResults);

  const {
    mutate: searchByName,
    isPending: isSearching,
  } = useFilterByName();

  useEffect(() => {
    if (Array.isArray(initialResults) && initialResults.length) {
      setDoctors(initialResults);
    }
  }, [initialResults]);

  const normalizeDoctor = (item = {}, idx = 0) => {
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

    const specialty =
      item.specialty ||
      item.specialization ||
      item.userId?.specialty ||
      item.userId?.specialization ||
      "";

    const rating = item.averageRating ?? item.rating ?? item.userId?.averageRating ?? item.userId?.rating ?? "-";

    const id = item?._id || item?.userId?._id || idx;

    return {
      ...item,
      _id: id,
      name,
      profileUrl,
      specialty,
      averageRating: rating,
    };
  };

  const performSearch = (term) => {
    const value = term.trim();
    if (!value) {
      setDoctors([]);
      return;
    }

    searchByName(value, {
      onSuccess: (data) => {
        console.log("SearchDoctor results", Array.isArray(data) ? data.length : 0, data);
        const normalized = (data ?? []).map((item, idx) => normalizeDoctor(item, idx));
        setDoctors(normalized);
      },
      onError: (error) => {
        const message = error?.response?.data?.message || error?.message || "Search failed";
        Alert.alert("Unable to search", message);
      },
    });
  };

  const handleSearch = () => {
    performSearch(search);
  };

  // Debounced search on typing
  useEffect(() => {
    const term = search.trim();

    // Clear results if input empty
    if (!term) {
      setDoctors([]);
      return undefined;
    }

    const timer = setTimeout(() => {
      performSearch(term);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <View className=" flex-row gap-0  items-center justify-between  py-4  ">
        <TouchableOpacity onPress={() => navigation.goBack()} className=" mx-2 ">
          <Ionicons name="chevron-back-sharp" size={30} color="black" />
        </TouchableOpacity>
        <View className=" flex-row items-center h-[50px] bg-white rounded-lg px-5  w-3/4 me-3">
          <Ionicons name="search" size={20} color="#999" className="" />
          <TextInput
            className="border border-white h-full tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black "
            placeholder="Search by doctor name"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity className="w-[50px] " onPress={handleSearch} disabled={isSearching}>
          <AntDesign name="filter" size={28} color="#023E8A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className=" bg-background "
        style={{
          flex: 1,
          //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className=" mb-5">
          <View className="mt-4 mx-5">
            {isSearching ? (
              <Text className="text-center text-lg text-gray-500">Searching doctors...</Text>
            ) : doctors?.length ? (
              doctors.map((raw, idx) => {
                const item = normalizeDoctor(raw, idx);
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("DoctorProfile", { doctorId: item?._id })}
                    key={item?._id || idx}
                    className="flex-row  items-center my-2 gap-5 bg-white p-5 rounded-lg shadow-sm elevation-sm"
                  >
                    <Image
                      source={item?.profileUrl ? { uri: item.profileUrl } : require("../../assets/profile/profile_m.png")}
                      className="w-[60px] h-[60px] rounded-full border-primary border "
                    />
                    <View className="flex-col items-start  justify-between gap-1  w-2/3">
                      <Text className=" text-lg font-semibold">{item?.name}</Text>
                      <View className="text-sm text-gray-500 flex-row gap-5 items-center justify-between  w-full ">
                        <Text>{item?.specialty}</Text>
                        <View className="text-sm text-gray-500 flex-row gap-1 items-center ">
                          <AntDesign name="star" size={20} color="#FFC107" />
                          <Text className=" text-gray-500 ">{item?.averageRating}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text className="text-center text-lg text-gray-500">No doctors found yet.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
