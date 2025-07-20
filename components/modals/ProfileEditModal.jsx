import React from "react";
import { View, Text } from "react-native";
import BaseModal from "./BaseModal";
import FormField from "../FormField";
import Dropdown from "../Dropdown";
import CustomButton from "../Buttons/CustomButton";

const ProfileEditModal = ({
  visible,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  genderOptions,
  genderOpen,
  setGenderOpen,
}) => {
  const [selectedGender, setSelectedGender] = React.useState(formData.gender);

  // Sync back to parent when submitting the form
  const handleSubmit = () => {
    onFormChange("gender", selectedGender);
    onSubmit(); // Call parent's submit handler
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="Edit Profile">
      <FormField
        label="Name"
        value={formData.name}
        onChangeText={(text) => onFormChange("name", text)}
        placeholder="Enter your name"
      />

      <FormField
        label="Age"
        value={formData.age}
        onChangeText={(text) => onFormChange("age", text)}
        placeholder="Enter your age"
        keyboardType="number-pad"
      />

      <View className="px-2 w-full mb-2">
        <Text className="text-lg font-medium mb-2">Gender</Text>
        <Dropdown
          data={genderOptions}
          open={genderOpen}
          setOpen={setGenderOpen}
          value={selectedGender}
          setValue={setSelectedGender}
          placeholder="Select your gender"
        />
      </View>

      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={handleSubmit}
      />
    </BaseModal>
  );
};

export default ProfileEditModal;
