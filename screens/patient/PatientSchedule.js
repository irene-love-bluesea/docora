import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppointmentPCard from "../../components/Card/AppointmentPCard";
import { appointmentForPatient } from "../../constant/data/appointment";

export default function PatientSchedule() {
  const [mode, setMode] = useState("upcoming");

  const upComingAppointment = () => {
    setMode("upcoming");
  };
  const pastAppointment = () => {
    setMode("past");
  };

  const renderCard = ({ item }) => (
    <AppointmentPCard
      drProfile={item.drProfile}
      drName={item.drName}
      speciality={item.speciality}
      date={item.date}
      time={item.time}
      channelType={item.channelType}
      status={item.status}
    />
  );

  //after time appointment time  -> go to past

  return (
    <SafeAreaView className=" flex-1 bg-background px-5">
      <View className=" flex-row justify-between items-center px-5 py-5 bg-background ">
        <Text className="text-2xl font-alata">Appointments</Text>
        <Ionicons name="add-circle" size={30} color="#023E8A" />
      </View>
      <View className=" flex-row justify-between items-center  border border-secondary rounded-xl  w-full">
        <Pressable
          onPress={() => upComingAppointment()}
          className={` w-1/2  py-4  ${
            mode === "upcoming" ? "bg-primary rounded-l-xl " : "bg-secondary"
          }`}
        >
          <Text
            className={`text-center text-xl font-semibold ${
              mode === "upcoming" && "text-white"
            } `}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          onPress={() => pastAppointment()}
          className={`w-1/2 py-4 ${
            mode === "past" ? "bg-primary rounded-r-xl" : "bg-secondary"
          }`}
        >
          <Text
            className={`text-center text-xl font-semibold ${
              mode === "past" && "text-white"
            } `}
          >
            Past
          </Text>
        </Pressable>
      </View>

      <FlatList
        className="mt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={appointmentForPatient}
        keyExtractor={(item) => item.id}
        //mode == upcoming
        //mode == past
        renderItem={({ item }) => (
          item?.status === mode && 
          (
          renderCard({ item })
          )
        )}
      />
    </SafeAreaView>
  );
}
