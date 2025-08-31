import { Text, View, TouchableOpacity } from "react-native";
import { convertApiTimeToDisplayTime } from "../../utils/helper";

function isSameStartTime(startTime1, startTime2) {
  if (!startTime1 || !startTime2) return false;
  return new Date(startTime1).getTime() === new Date(startTime2).getTime();
}
export default function TimeSelection({ title, timeSlots, handleTime, selectedTime }) {
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
                  key={time?.startTime}
                  onPress={() => !time.isBooked && handleTime(time)}
                  className={`${
                    isSameStartTime(selectedTime, time?.startTime) ? "bg-primary" : "bg-white"
                  } ${!time?.isBooked ? "opacity-100" : "opacity-50 bg-gray-400"}
                   border border-secondary rounded-full px-3 py-2 items-center justify-center`}
                >
                  <Text
                    className={`w-[80px] text-center ${
                      isSameStartTime(selectedTime, time?.startTime) ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {convertApiTimeToDisplayTime(time?.startTime)}
                  </Text>
                </TouchableOpacity>
              )
          )}
        </View>
      </View>
    )
  );
}
