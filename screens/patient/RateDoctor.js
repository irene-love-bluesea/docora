import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cardiologist } from "../../constant/data/doctorDetails";
import { useState } from "react";
import RatingStar from "../../components/UI/RatingStar";
import CustomButton from "../../components/Buttons/CustomButton";

export default function RateDoctor() {
  const tags = {
    positiveTags: [
      { id: 1, name: "Good Listener", selected: false },
      { id: 2, name: "Explained Clearly", selected: false },
      { id: 3, name: "On Time", selected: false },
      { id: 4, name: "Helpful Advice", selected: false },
    ],
    improvementTags: [
      { id: 1, name: "Feel Rushed", selected: false },
      { id: 2, name: "Unclear instructrions", selected: false },
      { id: 3, name: "Late Start", selected: false },
    ],
  };
  const [rating, setRating] = useState(1);
  const [reviewTags, setReviewTags] = useState(tags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [publicReview, setPublicReview] = useState("");

  const handleTags = (tagName, tag) => {
    let updatedSelectedTags;
    const isTagSelected = selectedTags.some(selectedTag => selectedTag.id === tag.id);
    if (isTagSelected) {
      updatedSelectedTags = selectedTags.filter((selectedTag) => selectedTag.id !== tag.id);
    } else {
      updatedSelectedTags = [...selectedTags, tag];
    }
    setSelectedTags(updatedSelectedTags);

    const updatedTags = reviewTags[tagName].map((t) => ({
      ...t,
      selected: tag.id === t.id ? !t.selected : t.selected
    }));

    setReviewTags({...reviewTags, [tagName]: updatedTags});
  };
  
  const ratingHandler = () => {
    const rateData = {
      rating: rating,
      publicReview: publicReview,
      selectedTags: selectedTags,
      publicReview: publicReview,
    };
    console.log("rating", rateData);
    
  };
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        className="bg-background"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-start items-center px-5 bg-background pb-5">
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
          </View>
          <View className="px-5 ">
            <View>
              <Text className="text-xl font-semibold ">
                How was your appointment with Ethan Carter
              </Text>
              <Text className=" text-gray-500 mt-2">
                Your feedback helps improve our services and assists other
                patients
              </Text>
            </View>

            <View className=" mt-5">
              <Text className=" text-xl font-semibold">Overall Rating</Text>
              <View className=" flex-row items-end  gap-5 mt-2">
                <RatingStar rating={rating} setRating={setRating} />
              </View>
            </View>

            <View className=" mt-5">
              <Text className=" text-xl font-semibold">
                Select Tags ( Optional )
              </Text>

              <View className="mt-3 ">
                <View className="">
                  <Text className=" text-gray-500">What went well?</Text>
                </View>

                <View className=" flex-row flex-wrap  gap-4 mt-3 w-[70%]">
                  {reviewTags?.positiveTags?.map((tag) => (
                    <Pressable
                      key={tag?.id}
                      onPress={() => handleTags("positiveTags", tag)}
                      className={` ${
                        tag?.selected ? "bg-primary " : " bg-white"
                      } py-2 px-3 rounded-2xl  `}
                    >
                      <Text
                        className={`text-md font-medium ${
                          tag?.selected && " text-white "
                        } `}
                      >
                        {tag?.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="mt-3 ">
                <View className="">
                  <Text className=" text-gray-500">How could be improved?</Text>
                </View>

                <View className=" flex-row flex-wrap  gap-4 mt-3 w-[70%]">
                  {reviewTags?.improvementTags?.map((tag) => (
                    <Pressable
                      key={tag?.id}
                      onPress={() => handleTags("improvementTags", tag)}
                      className={` ${
                        tag?.selected ? "bg-primary " : " bg-white"
                      } py-2 px-3 rounded-2xl  `}
                    >
                      <Text
                        className={`text-md font-medium ${
                          tag?.selected && " text-white "
                        } `}
                      >
                        {tag?.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="mt-3 ">
                <View className=" flex-row  items-center gap-4 mt-3 ">
                  <Text className=" text-xl font-semibold w-[40%]">
                    Public review (Optional)
                  </Text>
                  <Text className=" text-gray-500">
                    Visible on doctor’s profile
                  </Text>
                </View>

                <TextInput
                  className="border border-white tracking-wider rounded-xl mt-3 px-4 py-2 text-base bg-white text-black"
                  placeholder="Share your experience to help others..."
                  placeholderTextColor="#999"
                  multiline={true}
                  textAlignVertical="top"
                  value={publicReview}
                  style={{
                    paddingTop: 15,
                    height: 120,
                    textAlign: "left",
                  }}
                  onChangeText={setPublicReview}
                />
              </View>
              <CustomButton
                title="Submit Feedback"
                className="my-4 "
                variant="primary"
                onPress={() => ratingHandler()}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
