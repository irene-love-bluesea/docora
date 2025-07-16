import { Text, View, TouchableOpacity } from "react-native";

export default function TimeSelection({ title, timeSlots, handleTime }) {
  const allSlotsDisabled = timeSlots?.every((slot) => slot?.disabled);

  return (
    !allSlotsDisabled && (
      <View className="mb-5">
        <Text className="font-medium text-xl">{title}</Text>
        <View className="mt-4 flex-row flex-wrap gap-3">
          {timeSlots?.map(
            (time) =>
              !time?.disabled && (
                <TouchableOpacity
                  key={time?.id}
                  onPress={() => time.available && handleTime(time)}
                  className={`${
                    time?.selected ? "bg-primary text-white" : "bg-white"
                  }
                  ${time?.available ? "opacity-100 " : "opacity-50 bg-gray-400"}
                   text-md border border-secondary rounded-full px-3 py-2 items-center justify-center`}
                >
                  <Text
                    className={`  w-[80px] text-center ${
                      time?.selected ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {time?.value}
                  </Text>
                </TouchableOpacity>
              )
          )}
        </View>
      </View>
    )
  );
}
