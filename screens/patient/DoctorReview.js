import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomProgressBar from "../../components/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cardiologist } from "../../constant/data/doctorDetails";

export default function DoctorReview({ navigation }) {
  const reviewsData = [
    {
      id: 1,
      name: "Michale R",
      rating: "5.0",
      timeAgo: "2 days ago",
      profileImage: require("../../assets/profile/patient_m.png"),
      review:
        "Dr. Johnson was compassionate and professional throughout my visit. She made sure I felt heard and walked me through every step of the diagnosis. I left the appointment feeling informed and confident in the treatment plan.",
      tags: ["Good Listener", "Explain Clearly"],
    },
    {
      id: 2,
      name: "Sophia J",
      rating: "4.9",
      timeAgo: "4 days ago",
      profileImage: require("../../assets/profile/patient_f.png"),
      review:
        "Dr. Johnson provided exceptional care from start to finish. He was attentive, explained everything in detail, and answered all my questions with patience. I truly felt like a partner in my own healthcare.",
      tags: ["On Time", "Helpful Advice"],
    },
    {
      id: 3,
      name: "Robert C",
      rating: "4.8",
      timeAgo: "2 week ago",
      profileImage: require("../../assets/profile/patient_m.png"),
      review:
        "Dr. Johnson was incredibly thorough and took time to explain my condition. She listened to all my concerns and provided clear treatment options.",
      tags: ["Good Listener", "On Time"],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <ScrollView
        className="bg-background"
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start items-center px-5 bg-background pb-8">
          <View className="w-full flex-row items-center gap-5 mb-2">
            <Image
              className="w-[60px] h-[60px] border border-gray-600 rounded-full"
              source={require("../../assets/profile/profile_m.png")}
            />
            <View>
              <Text className="text-2xl text-center font-medium">
                Dr. Ethan Carter
              </Text>
              <View className="flex-row items-center gap-1">
                <Cardiologist width={20} height={20} />
                <Text className="text-lg text-gray-500 font-medium">
                  Cardiologist
                </Text>
              </View>
            </View>
          </View>

          {/* white card */}
          <View className="mt-5 bg-white rounded-xl p-5 border border-gray-100">
            <View className="flex-row justify-between w-full">
              <Text className="text-xl font-medium">Ratings</Text>
              <View className="flex-row gap-1">
                <Text className="text-xl font-medium"> 4.8 </Text>
                <AntDesign name="star" size={22} color="#FFC107" />
                <AntDesign name="star" size={22} color="#FFC107" />
                <AntDesign name="star" size={22} color="#FFC107" />
                <AntDesign name="star" size={22} color="#FFC107" />
                <AntDesign name="star" size={22} color="#FFC107" />
              </View>
            </View>
            <Text className="text-gray-600 my-2">Based on 150 Reviews</Text>
            {/* Progress bar */}
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-medium">
                5.0 <AntDesign name="star" size={16} color="black" />
              </Text>
              <CustomProgressBar
                value={0.7}
                color={"#00C32D"}
                width={200}
                multiplier={1}
              />
              <Text className="text-lg font-medium">95</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-medium">
                4.0 <AntDesign name="star" size={16} color="black" />
              </Text>
              <CustomProgressBar
                value={0.4}
                color={"#00C32D"}
                width={200}
                multiplier={1}
              />
              <Text className="text-lg font-medium">25</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-medium">
                3.0 <AntDesign name="star" size={16} color="black" />
              </Text>
              <CustomProgressBar
                value={0.2}
                color={"#C3AC00"}
                width={200}
                multiplier={1}
              />
              <Text className="text-lg font-medium"> 5</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-medium">
                3.0 <AntDesign name="star" size={16} color="black" />
              </Text>
              <CustomProgressBar
                value={0.1}
                color={"#C30003"}
                width={200}
                multiplier={1}
              />
              <Text className="text-lg font-medium"> 2</Text>
            </View>
            {/* Progress bar end */}
          </View>
          {/* white card end */}

          <Text className="text-2xl text-left w-full my-3 font-semibold">
            Reviews
          </Text>

          {/* Review Item Start */}
          {reviewsData.map((review) => (
            <View
              key={review.id}
              className="w-full px-2 border-b py-3 mb-2 border-gray-300"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center gap-2">
                  <Image
                    className="w-[50px] h-[50px] rounded-full"
                    source={review.profileImage}
                  />
                  <View className="flex gap-1">
                    <Text className="text-xl font-semibold">{review.name}</Text>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">{review.rating}</Text>
                      <AntDesign name="star" size={16} color="#FFC107" />
                    </View>
                  </View>
                </View>
                <Text className="text-gray-500 text-md font-medium">
                  {review.timeAgo}
                </Text>
              </View>

              <Text className="px-2 mb-3 text-md font-medium text-gray-500">
                {review.review}
              </Text>

              <View className="flex-row w-full gap-3">
                {review.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="px-3 py-2 border border-green-600 rounded-3xl"
                  >
                    <Text className="text-green-600 text-normal font-semibold">
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
          {/* Review Item End */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
