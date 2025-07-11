import React, { useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dropdown from "../../components/Dropdown";

const gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Rather not to say", value: "RatherNotToSay" },
];
const bloodType = [
  { label: "O", value: "O" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "AB", value: "AB" },
];
const allergy = [
  { label: "Penicillin", value: "Penicillin" },
  { label: "Aspirin", value: "Aspirin" },
  { label: "SulfaDrugs", value: "SulfaDrugs" },
  { label: "NSAIDs", value: "NSAIDs" },
  { label: "Latex", value: "Latex" },
  { label: "Peanuts", value: "Peanuts" },
  { label: "Shellfish", value: "Shellfish" },
  { label: "Eggs", value: "Eggs" },
  { label: "Dairy", value: "Dairy" },
  { label: "Iodine", value: "Iodine" },
  { label: "InsectStings", value: "InsectStings" },
  { label: "None", value: "None" },
];
const chronical = [
  { label: "Asthma", value: "Asthma" },
  { label: "Diabetes ", value: "Diabetes" },
  { label: "Hypertension", value: "Hypertension" },
  { label: "Cancer", value: "Cancer" },
  { label: "Arthritis", value: "Arthritis" },
  { label: "Alzheimers", value: "Alzheimers" },
  { label: "Heart Disease", value: "Heart Disease" },
  { label: "Liver Disease", value: "Liver Disease" },
  { label: "None", value: "None" },
];

export default function PatientInfo({ navigation }) {
  const [genderValue, setGenderValue] = React.useState("");
  const [genderOpen, setGenderOpen] = React.useState(false);
  const [bloodTypeValue, setBloodTypeValue] = React.useState("");
  const [bloodTypeOpen, setBloodTypeOpen] = React.useState(false);
  const [bd, setBd] = React.useState(new Date());
  const [birthOpen, setBirthOpen] = React.useState(false);
  const [allergies, setAllergies] = React.useState([]);
  const [allergyOpen, setAllergyOpen] = React.useState(false);
  const [chronic, setChronic] = React.useState([]);
  const [chronicOpen, setChronicOpen] = React.useState(false);

  const handleDropdownOpen = (dropdownName) => {
    switch (dropdownName) {
      case "gender":
        setGenderOpen(true);
        setBloodTypeOpen(false);
        setAllergyOpen(false);
        setChronicOpen(false);
        break;
      case "blood":
        setBloodTypeOpen(true);
        setGenderOpen(false);
        setAllergyOpen(false);
        setChronicOpen(false);
        break;
      case "allergy":
        setAllergyOpen(true);
        setBloodTypeOpen(false);
        setGenderOpen(false);
        setChronicOpen(false);
        break;
      case "chronic":
        setAllergyOpen(false);
        setBloodTypeOpen(false);
        setGenderOpen(false);
        setChronicOpen(true);
        break;
      default:
        setGenderOpen(false);
        setAllergyOpen(false);
        setBloodTypeOpen(false);
        setChronicOpen(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setGenderOpen(false);
          setBloodTypeOpen(false);
          setAllergyOpen(false);
          setChronicOpen(false);
        }}
      >
        <View className="flex-1 justify-start items-center p-5 bg-background">
          <View className="mb-3 w-full">
            <Text className="text-lg font-medium mb-2">Gender *</Text>
            <Dropdown
              data={gender}
              open={genderOpen}
              setOpen={setGenderOpen}
              value={genderValue}
              zIndex={3000}
              setValue={setGenderValue}
              placeholder="Select your gender"
              onOpen={() => handleDropdownOpen("gender")}
            />
          </View>

          <View className="mb-3 w-full">
            <Text className="text-lg font-medium mb-2">Birthday *</Text>
            <TouchableOpacity
              onPress={() => {
                setGenderOpen(false);
                setBloodTypeOpen(false);
                setBirthOpen(true);
              }}
            >
              <View className="p-5 bg-white rounded-xl">
                <Text>
                  {bd && bd.toDateString() !== new Date().toDateString()
                    ? formatDate(bd)
                    : "mm/dd/yyyy"}
                </Text>
              </View>
            </TouchableOpacity>
            {birthOpen && (
              <DateTimePicker
                value={bd}
                mode="date"
                onChange={(event, selectedDate) => {
                  setBirthOpen(Platform.OS === "ios");
                  if (selectedDate) {
                    setBd(selectedDate);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View className="mb-3 w-full">
            <Text className="text-lg font-medium mb-2">Blood Type *</Text>
            <Dropdown
              data={bloodType}
              open={bloodTypeOpen}
              setOpen={setBloodTypeOpen}
              value={bloodTypeValue}
              zIndex={2000}
              setValue={setBloodTypeValue}
              placeholder="Select your blood type"
              onOpen={() => handleDropdownOpen("blood")}
            />
          </View>

          <View className="mb-3 w-full">
            <Text className="text-lg font-medium mb-2">Allergy</Text>
            {/* <MultiDropDown/> */}
            <Dropdown
              data={allergy}
              open={allergyOpen}
              setOpen={setAllergyOpen}
              value={allergies}
              mode="BADGE"
              multiple={true}
              zIndex={1000}
              setValue={setAllergies}
              placeholder="Select your Allergy"
              onOpen={() => handleDropdownOpen("allergy")}
            />
          </View>

          <View className="mb-3 w-full">
            <Text className="text-lg font-medium mb-2">Chronic Condition</Text>
            {/* <MultiDropDown/> */}
            <Dropdown
              data={chronical}
              open={chronicOpen}
              setOpen={setChronicOpen}
              value={chronic}
              mode="BADGE"
              multiple={true}
              zIndex={100}
              setValue={setChronic}
              placeholder="Select your Chronic Conditions"
              onOpen={() => handleDropdownOpen("chronic")}
            />
          </View>

          <CustomButton
            title="Go to Patient Profile"
            variant="primary"
            onPress={() => navigation.navigate("PatientProfile")}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
