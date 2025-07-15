import { use, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { allTimeSlots } from "../../constant/data/timeSlot";
import TimeSelection from "../../components/TimeSelection";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../../components/Buttons/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { addMinutesToTimeString, getUpcomingDays } from "../../utils/helper";
import ModalChannel from "../../components/ModalChannel";
import { se } from "date-fns/locale";

export default function TimeSlotSelector() {
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState(allTimeSlots);

  const [selectedDate, setSelectedDate] = useState(null);
  const [upComingDays, setUpComingDays] = useState([]);
  const [updatedSlots, setUpdatedSlots] = useState(allTimeSlots);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const isValid = selectedTime && selectedDate ;

  useEffect(() => {
    const upComingDays = getUpcomingDays();
    setUpComingDays(upComingDays);
    setSelectedDate(upComingDays[0]);
  }, []);

  const handleTime = (selectedSlot) => {
    setSelectedTime(selectedSlot);

    setTimeSlots((prevTimeSlots) => {
      Object.keys(prevTimeSlots).forEach((period) => {
        updatedSlots[period] = prevTimeSlots[period].map((slot) => ({
          ...slot,
          selected: slot.id === selectedSlot.id,
        }));
      });

      return updatedSlots;
    });
  };

  useEffect(() => {
    console.log(modalVisible);
    
  })
  const confirmHandler = () => {
    // if(!isValid) return;
    console.log(selectedDate, selectedTime);
    setModalVisible(true);
  };

  // const closeModal = () => {
  //   setModalVisible(false);
  //   setSelectedChannel(null);
  // };

  return (
    <SafeAreaView className=" flex-1 bg-background px-5">
      <ScrollView
        className=""
        // contentContainerStyle={{
        //   flexGrow: 1,
        // }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View className=" flex-row items-start gap-3">
            {upComingDays.map(
              (day) =>
                !day?.disabled && (
                  <TouchableOpacity
                    className={` flex-col items-center  py-2 px-3 border-secondary border rounded-2xl w-[55px]  ${
                      selectedDate.value === day?.value
                        ? "bg-primary"
                        : " bg-white"
                    }`}
                    key={day?.id}
                    onPress={() => setSelectedDate(day)}
                  >
                    <Text
                      className={`text-lg  ${
                        selectedDate?.value === day?.value
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {day?.value}
                    </Text>
                    <Text
                      className={` ${
                        selectedDate?.value === day?.value
                          ? "text-white"
                          : "text-black"
                      } text-2xl font-bold `}
                    >
                      {day?.dateFormat.substring(0, 2)}
                    </Text>
                    <Text
                      className={`text-lg  ${
                        selectedDate?.value === day?.value
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {day?.dateFormat.substring(3, 6)}
                    </Text>
                  </TouchableOpacity>
                )
            )}
          </View>
        </ScrollView>
        <View className=" mt-10">
          {Object.keys(timeSlots).map((period) => (
            <TimeSelection
              key={period}
              title={period}
              timeSlots={timeSlots[period]}
              handleTime={handleTime}
            />
          ))}
        </View>
      </ScrollView>
      <View className="flex-row items-center gap-5 justify-center mb-5 border-t border-t-gray-300 pt-3">
        <View className=" flex-col gap-3 w-[45%] ">
          <View className=" flex-row  items-center  gap-3 ">
            <Ionicons name="calendar-outline" size={24} color={"#023E8A"} />
            <Text className=" text-lg  font-semibold text-primary">
              {selectedDate?.dateFormat}
            </Text>
          </View>
          <View className=" flex-row  items-center  gap-3 ">
            <AntDesign name="clockcircleo" size={24} color={"#023E8A"} />
            {selectedTime ? (
              <Text className=" text-lg  font-semibold text-primary">
                {selectedTime?.value} -{" "}
                {addMinutesToTimeString(selectedTime?.value, 15)}
              </Text>
            ) : (
              <Text className=" text-lg  font-semibold text-primary">
                Select Time
              </Text>
            )}
          </View>
        </View>

        <CustomButton
          variant="primary"
          title="Confirm"
          onPress={() => confirmHandler()}
          className=" !w-[45%]"
          disabled={!isValid}
        />
      </View>

      {/* Consultation Channel Selection Modal */}

      <ModalChannel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />
    </SafeAreaView>
  );
}
