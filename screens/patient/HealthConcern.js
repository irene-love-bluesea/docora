import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { Cardiologist } from "../../constant/data/doctorDetails";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Dropdown from "../../components/Dropdown";
import CustomButton from "../../components/Buttons/CustomButton";
import MedicationInput from "../../components/MedicationInput";

export default function HealthConcern({navigation}) {
  const [symptom, setSymptom] = React.useState("");
  const [durationValue, setDurationValue] = React.useState("");
  const [durationOpen, setDurationOpen] = React.useState(false);
  const [medications, setMedications] = React.useState([]);
  const [photoSymptom, setPhotoSymptom] = React.useState([]);

  const duration = [
    { label: "1-3 Days", value: "1-3 Days" },
    { label: "3-5 Days", value: "3-5 Days" },
    { label: "5-7 Days", value: "5-7 Days" },
    { label: "More than 7 days", value: "More than 7 days" },
  ];

  const isHealthFormValid = symptom !== "" && durationValue !== "";

  // file upload
  const pickFile = async (fileType) => {
    try {
      if (photoSymptom.length >= 3) {
        alert(
          "You can only choose up to 3 files. Please remove some files first."
        );
        return;
      }
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (!result.canceled) {
        const validFiles = [];
        let limitReached = false;

        // Process each selected file
        for (const asset of result.assets) {
          if (validFiles.length + photoSymptom.length >= 3) {
            limitReached = true;
            alert(
              "You can only choose up to 3 files. Please remove some files first."
            );
            break;
          }

          if (asset.size > 5 * 1024 * 1024) {
            alert(`File "${asset.name}" is too large! Maximum size is 5MB.`);
            continue;
          }
          validFiles.push(asset);
        }
        if (validFiles.length > 0) {
          if (fileType === "photo_symptom") {
            setPhotoSymptom((prevFiles) => [...prevFiles, ...validFiles]);
          }
        }
      }
    } catch (err) {
      console.log(err);
      alert("Error while uploading file", err);
    }
  };

  const removeFile = (index) => {
    setPhotoSymptom((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setPhotoSymptom([]);
  };

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
          {/* Profile Card End */}

          <View className="flex-row items-start w-full gap-2 px-2 mt-3 border-y border-gray-200 justify-between">
            <View className="py-3 w-[48%] flex items-center">
              <Text className="text-lg font-semibold">Time</Text>
              <View className="mt-2 flex-row items-start gap-2">
                <MaterialIcons
                  name="access-time-filled"
                  size={22}
                  color="#023E8A"
                />
                <Text className="text-md font-normal text-gray-600">
                  14 July 2025{"\n"}09:00 AM - 09:15 AM
                </Text>
              </View>
            </View>
            <View className="mt-3 pb-5 border-l border-gray-300 w-[48%] flex items-center">
              <Text className="text-lg font-semibold">Channel</Text>
              <View className="flex-row items-start gap-2 mt-3">
                <MaterialIcons name="chat" size={22} color="#023E8A" />
                <Text className="text-md font-normal text-gray-600">Chat</Text>
              </View>
            </View>
          </View>
          {/* Time and Channel */}

          <View className="my-4 mb-3 w-full">
            <View className="mb-3">
              <Text className="text-lg font-medium mb-2">
                What is your symptoms or problem? *
              </Text>
              <TextInput
                className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                placeholder="Describe your symptoms / problems"
                placeholderTextColor="#999"
                multiline={true}
                textAlignVertical="top"
                value={symptom}
                style={{
                  paddingTop: 15,
                  height: 120,
                  textAlign: "left",
                }}
                onChangeText={setSymptom}
              />
            </View>

            <View className="mb-3 mt-2">
              <Text className="text-lg font-medium mb-2">
                How long have you had this problem? *
              </Text>
              <Dropdown
                data={duration}
                open={durationOpen}
                setOpen={setDurationOpen}
                value={durationValue}
                zIndex={3000}
                setValue={setDurationValue}
                placeholder="Duration"
              />
            </View>

            <MedicationInput
              medications={medications}
              onMedicationsChange={setMedications}
              initialValue="No"
              showTitle={true}
              titleText="Are you taking any medication currently?"

            />

            <View className="mb-3 mt-2">
              <Text className="text-lg font-medium mb-3">
                Photo Attachment (if any)
              </Text>
              {photoSymptom.length > 0 ? (
                <View>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-medium">Selected Files:</Text>
                    <TouchableOpacity onPress={clearAllFiles}>
                      <Text className="text-lg text-red-600 ">Clear All</Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView>
                    {photoSymptom.map((file, index) => (
                      <View
                        key={index}
                        className="px-1"
                      >
                        <View className="flex-row w-[90%] justify-between items-center mb-1 border-b border-gray-200 pb-2">
                          <Text className="text-lg text-blue-600">{file.name}</Text>
                          <TouchableOpacity onPress={() => removeFile(index)}>
                            <Ionicons
                              name="close-circle"
                              size={26}
                              color="#FF3B30"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => pickFile("photo_symptom")}
                    className="flex-row items-center justify-center mt-3 px-5 py-2 gap-5 border-dashed rounded-xl border-gray-300 border-2"
                  >
                    <Text className="text-lg text-gray-500">Tap to Upload</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => pickFile("photo_symptom")}>
                  <View className=" flex-row items-center justify-center  px-5 py-8 gap-5 border-dashed rounded-xl border-gray-300 border-2">
                    <Ionicons
                      name="cloud-upload-outline"
                      className=""
                      size={60}
                      color="#5C738A"
                    />
                    <View className="flex-col w-2/3 gap-2 ">
                      <Text className="text-xl text-center text-gray-500">
                        Tap to upload your photo
                      </Text>
                      <Text className="text-md text-center text-gray-500">
                        PDF , JPG , PNG (Max 5MB)
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* Form end */}

          <CustomButton
            title="Confirm"
            variant="primary"
            disabled={!isHealthFormValid}
        onPress={() => navigation.navigate("BottomTabs", { userType: 'patient' })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}