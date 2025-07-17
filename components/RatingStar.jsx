import { Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export default function RatingStar({ rating, setRating }) {
  const [maxRating, setMaxRating] = useState(5);
  return (
    <View className="flex-row items-center gap-2 mt-2">
      {Array.from({ length: maxRating }, (_, index) => (
        <Pressable key={index} onPress={() => setRating(index + 1)}>
          <AntDesign
            name="star"
            size={22}
            color={rating >= index + 1 ? "#FFC107" : "#ccc"}
          />
        </Pressable>
      ))}
    </View>
  );
}
