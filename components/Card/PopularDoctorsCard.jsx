import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, Text, View } from "react-native";
import { specialtyIconMap } from "../../constant/data/doctorDetails";

export default function PopularDoctorsCard({ item }) {
  const Icon = specialtyIconMap[item?.specialty] || (() => null); // Fallback if no icon is found
  return (
    <View
      className="flex-row  items-center my-2 gap-5 bg-white border border-secondary p-5 rounded-lg shadow-sm elevation-sm"
    >
      <Image
        source={{ uri: item?.profileUrl }}
        className="w-[60px] h-[60px] rounded-full border-primary border "
      />
      <View className="flex-col items-start  justify-between gap-1  w-2/3">
        <Text className=" text-lg font-semibold">{item?.name} </Text>
        <View className="text-sm text-gray-500 flex-row gap-5 items-center justify-between  w-full ">
          <View className="flex-row items-center gap-1">
              <Icon width={20} height={20} color="#023E8A" />
              <Text>{item?.specialty}</Text>
          </View>
          <View className="text-sm text-gray-500 flex-row gap-1 items-center ">
            <AntDesign name="star" size={20} color="#FFC107" />
            <Text className=" text-gray-500 ">{item?.averageRating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
