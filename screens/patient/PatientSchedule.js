import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppointmentPCard from "../../components/Card/AppointmentPCard";
import { appointmentForPatient } from "../../constant/data/appointment";
import { isSessionEnd, timeSortingAscending } from "../../utils/helper";

export default function PatientSchedule({ navigation }) {
  const [mode, setMode] = useState("upcoming");

  const renderCard = ({ item }) => (
    <AppointmentPCard
      drProfile={item.drProfile}
      drName={item.drName}
      speciality={item.speciality}
      date={item.date}
      time={item.time}
      channelType={item.channelType}
      mode={item.mode}
      status={item.status}
      navigation={navigation}
    />
  );

  //after time appointment time  -> mode change to past integrate API
  const appointmentsMode = useMemo(() => {
    return appointmentForPatient.map(appointment => ({
      ...appointment,
      mode: isSessionEnd(appointment.date, appointment.time) ? "past" : "upcoming",
    }))
  }, [appointmentForPatient]);

  const filterAppointments = useMemo(() => {
     const sortedAppoinments =timeSortingAscending(appointmentForPatient);
    return sortedAppoinments.filter(appointment => appointment.mode === mode);
  }, [appointmentsMode, mode]);

  return (
    <SafeAreaView className=" flex-1 bg-background px-5">
      <View className=" flex-row justify-between items-center  py-5 bg-background ">
        <Text className="text-2xl font-alata">Appointments</Text>
        {/* <Ionicons name="add-circle" size={30} color="#023E8A" /> */}
      </View>
      <View className=" flex-row justify-beteen items-center  border border-secondary rounded-xl  w-full">
        <Pressable
          onPress={() => setMode("upcoming")}
          className={` w-1/2  py-4 rounded-l-xl ${
            mode === "upcoming" ? "bg-primary  " : "bg-secondary"
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
          onPress={() => setMode("past")}
          className={`w-1/2 py-4 rounded-r-xl ${
            mode === "past" ? "bg-primary rounded-r-xl" : "bg-secondary "
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
        data={filterAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          item?.mode === mode && 
          (
          renderCard({ item })
          )
        )}
      />
    </SafeAreaView>
  );
}
