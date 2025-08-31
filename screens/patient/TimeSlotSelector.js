import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { allTimeSlots } from "../../constant/data/timeSlot";
import TimeSelection from "../../components/UI/TimeSelection";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../../components/Buttons/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { addMinutesToTimeString, convertApiTimeToDisplayTime, getTimeSlotsForDate, getUpcomingDays } from "../../utils/helper";
import ModalChannel from "../../components/modals/ModalChannel";
import { useFetchDoctorSchedule } from "../../api/hooks/useSchedule";

export default function TimeSlotSelector({route}) {
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [upComingDays, setUpComingDays] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const isValid = selectedTime && selectedDate;
  
  const {doctor , doctorId} = route?.params;
  // console.log("doctor >",doctor);
  const {data: schedule} = useFetchDoctorSchedule(doctorId);
  
  const [timeSlots, setTimeSlots] = useState(allTimeSlots);
  const [updatedSlots, setUpdatedSlots] = useState(allTimeSlots);
  const scheduleData  = schedule?.data;

  useEffect(() => {
    const dateArr = scheduleData?.map((item) => item.date);
    const upComingDays = getUpcomingDays(dateArr);
    
    setUpComingDays(upComingDays);
    if (upComingDays && upComingDays.length > 0) {
      setSelectedDate(upComingDays[0]);
    }
  }, [scheduleData]);

  useEffect(() => {
    if (selectedDate && scheduleData) {
      const updatedSlots = getTimeSlotsForDate(scheduleData, selectedDate);
      setTimeSlots(updatedSlots); // time slot updated
      // Reset selected time when date changes
      setSelectedTime(null);
    }
  }, [selectedDate, scheduleData]);

  const handleTime = (selectedSlot) => {
    if (!selectedSlot?.startTime) {
      console.warn('Invalid slot selected');
      return;
    }
  
    if (selectedSlot.disabled || selectedSlot.isBooked) {
      return;
    }
  
    setSelectedTime(selectedSlot.startTime); // Store the ISO string
  };

  const handleDateChange = (day) => {
    setSelectedDate(day);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const confirmHandler = () => {
    if (!isValid) return;
    setSelectedChannel(null);
    setModalVisible(true);
  };

  // Loading state
  if (!scheduleData) {
    return (
      <SafeAreaView className="flex-1 bg-background px-5 justify-center items-center">
        <Text className="text-lg text-gray-500">Loading schedule...</Text>
      </SafeAreaView>
    );
  }

   // No available dates
  if (upComingDays.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background px-5 justify-center items-center">
        <Text className="text-lg text-gray-500">No available dates</Text>
      </SafeAreaView>
    );
  }


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
                    onPress={() => handleDateChange(day)}
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
                      {day?.dateFormat?.substring(0, 2)}
                    </Text>
                    <Text
                      className={`text-lg  ${
                        selectedDate?.value === day?.value
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {day?.dateFormat?.substring(2, 6)}
                    </Text>
                  </TouchableOpacity>
                )
            )}
          </View>
        </ScrollView>
        <View className=" mt-10">
          {Object.keys(timeSlots).map((period) => {
            // Only show periods that have available slots
            const availableSlots = timeSlots[period].filter(slot => 
              !slot.disabled || slot.isBooked
            );
            
            if (availableSlots.length === 0) {
              return null; // Don't render empty periods
            }

            return (
              <TimeSelection
                key={period}
                title={period}
                timeSlots={timeSlots[period]}
                handleTime={handleTime}
                selectedTime={selectedTime}
              />
            );
          })}
        </View>
         {/* Show message if no slots available for selected date */}
        {Object.values(timeSlots).every(slots => 
          slots.every(slot => slot.disabled && !slot.available)
        ) && (
          <View className="mt-10 p-4 bg-gray-100 rounded-lg">
            <Text className="text-center text-gray-600">
              No available time slots for this date
            </Text>
          </View>
        )}
      </ScrollView>
      <View className="flex-row items-center gap-5 justify-between mb-5 border-t border-t-gray-300 pt-3">
        <View className=" flex-col gap-3 w-[45%] ">
          <View className=" flex-row  items-center  gap-2 ">
            <Ionicons name="calendar-outline" size={24} color={"#023E8A"} />
            <Text className=" text-lg  font-semibold text-primary">
              {selectedDate?.dateFormat}
            </Text>
          </View>
          <View className=" flex-row  items-center  gap-2 ">
            <AntDesign name="clockcircleo" size={24} color={"#023E8A"} />
            {selectedTime ? (
              <Text className="text-lg font-semibold text-primary">
                {convertApiTimeToDisplayTime(selectedTime)} - {addMinutesToTimeString(convertApiTimeToDisplayTime(selectedTime), 15)}
              </Text>
            ) : (
              <Text className="text-lg font-semibold text-primary">
                Select Time
              </Text>
            )}
          </View>
        </View>

        <CustomButton
          variant="primary"
          title="Confirm"
          onPress={() => confirmHandler()}
          className=" !w-[40%]"
          disabled={!isValid}
        />
      </View>

      {/* Consultation Channel Selection Modal */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalChannel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          doctorProfile={doctor}
        />
      </Modal>
    </SafeAreaView>
  );
}
