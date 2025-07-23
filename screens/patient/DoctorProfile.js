import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Cardiologist } from "../../constant/data/doctorDetails";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/Buttons/CustomButton";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function DoctorProfile({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}  className=" flex-1 bg-background px-5">
      <ScrollView
        className=""
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1  bg-background">
          <View className="flex-col items-center gap-3 justify-center">
            <Image
              source={require("../../assets/profile/profile_m.png")}
              className="w-[140px] h-[140px] rounded-full border border-primary"
            />
            <Text className="text-2xl font-bold ">Dr. John Smith</Text>
            <View className=" flex-row  itmes-center">
              <Cardiologist width={24} height={24} />
              <Text className="text-lg ">Cardiologist</Text>
            </View>
            <TouchableOpacity className="text-sm  flex-row gap-5 items-center justify-center  w-full ">
              <View className="text-sm  flex-row gap-1 items-center ">
                <AntDesign name="star" size={20} color="#FFC107" />
                <TouchableOpacity
                  onPress={() => navigation.navigate("DoctorReview")}
                >
                  <Text className="text-primary underline ">
                    4.5 (200 reviews)
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* description  */}
            <Text className=" text-xl ">
              Dr. Carter is a board-certified cardiologist with over 15 years of
              experience. He specializes in treating heart diseases and
              providing preventive care.
            </Text>
          </View>

          {/* background info */}
          <View className=" flex-col  gap-3 mt-5 pb-5 border-b border-b-gray-100">
            <View className=" flex-row items-center gap-4">
              <Ionicons name="school-outline" size={35} color="#023E8A" />
              <Text className=" text-xl">Harvard Medical School</Text>
            </View>
            <View className=" flex-row items-center gap-4">
              <FontAwesome6 name="hospital" size={28} color="#023E8A" />
              <Text className=" text-xl">New York Medical Center</Text>
            </View>
            <View className=" flex-row items-center gap-4">
              <MaterialCommunityIcons
                name="certificate-outline"
                size={38}
                color="#023E8A"
              />
              <Text className=" text-xl">Certified in Cardiology</Text>
            </View>
          </View>

          <View className="  mt-5">
            <Text className="text-2xl font-bold ">Consultation Fees</Text>

            <View className=" flex-col gap-5 mt-5">
              <View className=" flex-row items-center  justify-between">
                <View className="flex-row gap-4 items-center">
                  <Ionicons name="videocam-outline" size={32} color="#023E8A" />
                  <Text className=" text-xl">Video consultation</Text>
                </View>
                <Text className=" font-semibold text-xl">Free</Text>
              </View>
              <View className=" flex-row items-center  justify-between">
                <View className="flex-row gap-4 items-center">
                  <Ionicons name="chatbox-outline" size={30} color="#023E8A" />
                  <Text className=" text-xl">Chat consultation</Text>
                </View>
                <Text className=" font-semibold text-xl">Free</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* go to bottom footer  */}
      <View className="">
        <View className="flex-row items-center gap-5 justify-center ">
          <CustomButton
            variant="secondary"
            title="Chat Now"
            icon={
              <Ionicons name="chatbox-outline" size={24} color={"#023E8A"} />
            }
            className="border border-primary !bg-background !w-[45%]"
            // onPress={() => navigation.navigate("TimeSlotSelector")}
          />
          <CustomButton
            variant="primary"
            title="Book Now"
            icon={
              <Ionicons name="calendar-outline" size={24} color={"white"} />
            }
            onPress={() => navigation.navigate("TimeSlotSelector")}
            className=" !w-[45%]"
          />
        </View>
      </View>
    </View>
  );
}
