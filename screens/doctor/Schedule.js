import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appointmentForDoctor } from "../../constant/data/appointment";
import { isSessionEnd, timeSortingAscending } from "../../utils/helper";
import AppointmentDCard from "../../components/Card/AppointmentDCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import FilterModal from "../../components/modals/FilterModal";

export default function PatientSchedule() {
  const [mode, setMode] = useState("upcoming");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const renderCard = ({ item }) => (
    <AppointmentDCard
      patientProfile={item?.patientData?.profile}
      patientName={item?.patientData?.name}
      patientAge={item?.patientData?.age}
      patientGender={item?.patientData?.gender}
      date={item.date}
      time={item.time}
      channelType={item.channelType}
      mode={item.mode}
      status={item.status}
    />
  );

  //after time appointment time  -> mode change to past integrate API
  const appointmentsMode = useMemo(() => {
    return appointmentForDoctor.map((appointment) => ({
      ...appointment,
      mode: isSessionEnd(appointment.date, appointment.time)
        ? "past"
        : "upcoming",
    }));
  }, [appointmentForDoctor]);

  const filterAppointments = useMemo(() => {
    const sortedAppoinments = timeSortingAscending(appointmentForDoctor);
    return sortedAppoinments.filter((appointment) => appointment.mode === mode);
  }, [appointmentsMode, mode]);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
    console.log(filterAppointments);
  };

  const handleFilterSubmit = () => {
    setFilterModalVisible(false);
    console.log(filterAppointments);
  };
  return (
    <SafeAreaView className=" flex-1 bg-background px-5">
      <View className=" flex-row justify-between items-center  py-5 bg-background ">
        <Text className="text-2xl font-alata">Appointments</Text>
        <TouchableOpacity onPress={() => handleFilterPress()}>
          <AntDesign name="filter" size={30} color="#023E8A" />
        </TouchableOpacity>
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
        renderItem={({ item }) => item?.mode === mode && renderCard({ item })}
      />

      <View className="flex-1 justify-center items-center">
        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onSubmit={handleFilterSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
