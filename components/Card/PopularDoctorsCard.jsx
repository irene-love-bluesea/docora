import { Image, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { specialtyIconMap } from "../../constant/data/doctorDetails";

export default function PopularDoctorsCard({ item }) {
  return (
    <View
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
  );
}
