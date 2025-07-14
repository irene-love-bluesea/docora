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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dropdown from "../../components/Dropdown";
import { RadioButton } from "react-native-paper";
import CustomButton from "../../components/Buttons/CustomButton";

export default function HealthConcern() {
  const [symptom, setSymptom] = React.useState("");
  const [durationValue, setDurationValue] = React.useState("");
  const [durationOpen, setDurationOpen] = React.useState(false);
  const [medicationValue, setMedicationValue] = React.useState("No");
  const [medications, setMedications] = React.useState([]);
  const [medicationName, setMedicationName] = React.useState("");
  const [selectedAmount, setSelectedAmount] = React.useState("");
  const [selectedTimes, setSelectedTimes] = React.useState("");
  const [showAmountPicker, setShowAmountPicker] = React.useState(false);
  const [showTimesPicker, setShowTimesPicker] = React.useState(false);
  const [photoSymptom, setPhotoSymptom] = React.useState([]);

  const duration = [
    { label: "1-3 Days", value: "1-3 Days" },
    { label: "3-5 Days", value: "3-5 Days" },
    { label: "5-7 Days", value: "5-7 Days" },
    { label: "More than 7 days", value: "More than 7 days" },
  ];
  const amount = [
    { label: "50mg", value: "50mg" },
    { label: "100mg", value: "100mg" },
    { label: "150mg", value: "150mg" },
    { label: "200mg", value: "200mg" },
    { label: "250mg", value: "250mg" },
    { label: "300mg", value: "300mg" },
    { label: "350mg", value: "350mg" },
    { label: "400mg", value: "400mg" },
    { label: "450mg", value: "450mg" },
    { label: "500mg", value: "500mg" },
  ];
  const timesOptions = [
    { label: "1 time a day", value: "1 time a day" },
    { label: "2 time a day", value: "2 time a day" },
    { label: "3 time a day", value: "3 time a day" },
    { label: "4 time a day", value: "4 time a day" },
    { label: "Once a week", value: "Once a week" },
    { label: "Twice a week", value: "Twice a week" },
    { label: "As needed", value: "As needed" },
  ];

  const haveMedication = medicationValue === "Yes";
  const medicationFormValid =
    medicationName !== "" && selectedAmount !== "" && selectedTimes !== "";
  const isHealthFormValid = symptom !== "" && durationValue !== "";

  const addMedication = () => {
    if (medicationName.trim() && selectedAmount && selectedTimes) {
      const newMedication = {
        name: medicationName,
        amount: selectedAmount,
        times: selectedTimes,
      };
      setMedications([...medications, newMedication]);

      // Reset form
      setMedicationName("");
      setSelectedAmount("");
      setSelectedTimes("");
    }
  };

  const removeMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

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
                //   onOpen={() => handleDropdownOpen("duration")}
              />
            </View>

            <View className="mb-3 mt-2">
              <Text className="text-lg font-medium mb-2">
                Are you taking any medication currently?
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setMedicationValue(newValue)}
                value={medicationValue}
              >
                <View className="flex-row items-center gap-4 mb-2">
                  <View className="flex-row items-center">
                    <RadioButton value="Yes" />
                    <Text>Yes</Text>
                  </View>
                  <View className="flex-row items-center">
                    <RadioButton value="No" />
                    <Text>No</Text>
                  </View>
                </View>
              </RadioButton.Group>

              <View className="p-5 border border-gray-400 rounded-xl">
                <Text className="text-lg font-medium mb-2">
                  Add your medication
                </Text>
                {medications.map((medication, index) => (
                  <View key={index} className="mb-3">
                    <View className="flex-row w-[90%] items-center gap-3 py-2 border-b border-gray-300">
                      <MaterialCommunityIcons
                        name="pill"
                        size={20}
                        color="green"
                      />
                      <Text className="text-md font-medium text-green-700">
                        {medication.name} • {medication.amount} •{" "}
                        {medication.times}
                      </Text>
                      {/* <Text className="text-md font-medium">
                        </Text> */}
                      <TouchableOpacity onPress={() => removeMedication(index)}>
                        <Ionicons
                          name="close-circle"
                          size={24}
                          color="#FF3B30"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <TextInput
                  className="border w-[100%] border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
                  placeholder="Medication name"
                  placeholderTextColor="#999"
                  value={medicationName}
                  editable={haveMedication}
                  onChangeText={setMedicationName}
                  style={[
                    !haveMedication && {
                      backgroundColor: "white",
                      borderColor: "gray",
                      opacity: 0.4,
                    },
                  ]}
                />

                <View className="my-4 flex-row items-center justify-between">
                  <Dropdown
                    containerWidth="50%"
                    data={amount}
                    open={showAmountPicker}
                    setOpen={setShowAmountPicker}
                    value={selectedAmount}
                    disabled={!haveMedication}
                    zIndex={1000}
                    setValue={setSelectedAmount}
                    placeholder="Select amount"
                    // onOpen={() => handleDropdownOpen("amount")}
                  />

                  <Dropdown
                    containerWidth="48%"
                    data={timesOptions}
                    open={showTimesPicker}
                    setOpen={setShowTimesPicker}
                    value={selectedTimes}
                    disabled={!haveMedication}
                    zIndex={1000}
                    setValue={setSelectedTimes}
                    placeholder="Select time"
                    // onOpen={() => handleDropdownOpen("time")}
                  />
                </View>
                <CustomButton
                  title="Add medication"
                  variant="green"
                  disabled={!medicationFormValid}
                  icon={<AntDesign name="plus" size={20} color="white" />}
                  onPress={addMedication}
                />
              </View>
            </View>

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
            title="Submit Appointment"
            variant="primary"
            disabled={!isHealthFormValid}
            onPress={() => navigation.navigate("PatientHome")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
