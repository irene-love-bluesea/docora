import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { popularDrs } from "../../constant/data/doctorDetails";

export default function SearchDoctor({ navigation }) {
  const [search, setSearch] = useState("");
  const [popularDoctors, setPopularDoctors] = useState(popularDrs);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" flex-row items-center justify-between bg-background py-4  ">
        <TouchableOpacity onPress={() => navigation.goBack()} className="">
          <Ionicons name="chevron-back-sharp" size={30} color="black" />
        </TouchableOpacity>
        <View className=" flex-row items-center h-[50px] bg-white rounded-lg px-5 mx-5 w-3/4 ">
          <Ionicons name="search" size={20} color="#999" className="" />
          <TextInput
            className="border border-white h-full tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black "
            placeholder="Search  by specialty or doctor name"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity className="w-[50px] ">
          <AntDesign name="filter" size={28} color="black" />
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
            {popularDoctors?.map((item) => (
              <View
                key={item.id}
                className="flex-row  items-center my-2 gap-5 bg-white p-5 rounded-lg shadow-sm elevation-sm"
              >
                <Image
                  source={item?.image}
                  className="w-[60px] h-[60px] rounded-full border-primary border "
                />
                <View className="flex-col items-start  justify-between gap-1  w-2/3">
                  <Text className=" text-lg font-semibold">{item?.name} </Text>
                  <View className="text-sm text-gray-500 flex-row gap-5 items-center justify-between  w-full ">
                    <Text>{item?.speciality}</Text>
                    <View className="text-sm text-gray-500 flex-row gap-1 items-center ">
                      <AntDesign name="star" size={20} color="#FFC107" />
                      <Text className=" text-gray-500 ">{item.rating}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
