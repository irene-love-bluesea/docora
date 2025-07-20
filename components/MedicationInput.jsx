import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Dropdown from "./Dropdown";
import { RadioButton } from "react-native-paper";
import CustomButton from "./Buttons/CustomButton";

const MedicationInput = ({ 
  medications,
  onMedicationsChange, 
  initialValue = "No",
  showTitle = true,
  titleText = "",
  subTitle = "Add your medication",
  onRadioChange,
  containerStyle = {}
}) => {
  const [medicationValue, setMedicationValue] = React.useState(initialValue);
  const [medicationName, setMedicationName] = React.useState("");
  const [selectedAmount, setSelectedAmount] = React.useState("");
  const [selectedTimes, setSelectedTimes] = React.useState("");
  const [showAmountPicker, setShowAmountPicker] = React.useState(false);
  const [showTimesPicker, setShowTimesPicker] = React.useState(false);

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

  const addMedication = () => {
    if (medicationName.trim() && selectedAmount && selectedTimes) {
      const newMedication = {
        name: medicationName,
        amount: selectedAmount,
        times: selectedTimes,
      };
      const updatedMedications = [...medications, newMedication];
      onMedicationsChange(updatedMedications);

      // Reset form
      setMedicationName("");
      setSelectedAmount("");
      setSelectedTimes("");
    }
  };

  const removeMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    onMedicationsChange(updatedMedications);
  };

  const handleRadioChange = (newValue) => {
    setMedicationValue(newValue);
    onRadioChange && onRadioChange(newValue);
    if (newValue === "No" && medications.length > 0) {
      onMedicationsChange([]);
    }
  };

  return (
    <View style={containerStyle} className="mb-3 mt-2">
      {showTitle && (
        <Text className="text-lg font-medium mb-2">
          {titleText}
        </Text>
      )}
      
      <RadioButton.Group
        onValueChange={handleRadioChange}
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
          {subTitle}
        </Text>
        
        {/* Display existing medications */}
        {medications.map((medication, index) => (
          <View key={index} className="mb-3">
            <View className="flex-row w-[90%] items-center justify-between gap-3 py-2 border-b border-gray-300">
              <View className="flex-row items-center gap-3">
                <MaterialCommunityIcons
                name="pill"
                size={20}
                color="green"
              />
              <Text className="text-md font-medium text-green-700">
                {medication.name} • {medication.amount} • {medication.times}
              </Text>
              </View>
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

        {/* Add new medication form */}
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
  );
};

export default MedicationInput;