import { useState } from "react";
import { Text, View } from "react-native";
import {
  afternoonTimeSlots,
  eveningTimeSlots,
  morningTimeSlots,
} from "../../constant/data/timeSlot";
import TimeSelection from "../../components/TimeSelection";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from "../../components/Buttons/CustomButton";

export default function TimeSlotSelector() {
  const [selectedTime, setSelectedTime] = useState(null);
  const allTimeSlots = {
    Morning: morningTimeSlots,
    Afternoon: afternoonTimeSlots,
    Evening: eveningTimeSlots,
  };
  const [timeSlots, setTimeSlots] = useState(allTimeSlots);

  const handleTime = (selectedSlot) => {
    setSelectedTime(selectedSlot);

    // Update all time slots to reflect the selection
    setTimeSlots((prevTimeSlots) => {
      const updatedSlots = {};

      Object.keys(prevTimeSlots).forEach((period) => {
        updatedSlots[period] = prevTimeSlots[period].map((slot) => ({
          ...slot,
          selected: slot.id === selectedSlot.id,
        }));
      });

      return updatedSlots;
    });
  };

  return (
    <View className="flex-1 p-5 bg-background">
      {Object.keys(timeSlots).map((period) => (
        <TimeSelection
          key={period}
          title={period}
          timeSlots={timeSlots[period]}
          handleTime={handleTime}
        />
      ))}

      {/* Display selected time */}
      {/* {selectedTime && (
        <View className="mt-4 p-4 bg-green-50 rounded-lg">
          <Text className="text-green-800 font-semibold">
            Selected Time: {selectedTime.value}
          </Text>
        </View>
      )} */}

      <View className="flex-row items-center justify-center  mt-5 ">
        <View className=" flex-col gap-3 w-[50%]">
          <View className=" flex-row  items-center  gap-3 "> 
            <Ionicons name="calendar-outline" size={24} color={"#023E8A"} />
            <Text className=" text-lg  font-semibold text-primary">09 June 2025</Text>
          </View>
          <View className=" flex-row  items-center  gap-3 "> 
            <AntDesign name="clockcircleo" size={24} color={"#023E8A"} />
            <Text className=" text-lg  font-semibold text-primary">9:00 AM - 9:15 AM</Text>
          </View>
        </View>
        <CustomButton variant="primary" title="Confirm" onPress={() => {}} className=" !w-[50%]" />
      </View>
    </View>
  );
}
