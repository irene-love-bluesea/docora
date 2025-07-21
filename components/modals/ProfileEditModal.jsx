import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import Dropdown from "../Form/Dropdown";
import FormField from "../Form/FormField";
import BaseModal from "./BaseModal";

const ProfileEditModal = ({
  visible,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  genderOptions,
  genderOpen,
  setGenderOpen,
  birthOpen,
  setBirthOpen,
  userType
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const [localFormData, setLocalFormData] = useState({
    name: "",
    gender: "",
  });

  useEffect(() => {
    if (visible) {
      setLocalFormData({
        name: formData.name || "",
        gender: formData.gender || "",
      });

      if (formData.birthday) {
        const initialDate = new Date(formData.birthday);
        if (!isNaN(initialDate.getTime())) {
          // Check if it's a valid date
          setBd(initialDate);
          setBirthDateSelected(true);
        }
      } else {
        setBd(new Date()); // Reset to current date if no birthday provided
        setBirthDateSelected(false);
      }
    }
  }, [visible, formData]);

  const calculateAge = (birthday) => {
    if (!birthday) return "";
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleLocalChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBirthdayChange = (event, selectedDate) => {
    const currentDate = selectedDate || bd;
    setBirthOpen(Platform.OS === "ios");
    if (selectedDate) {
      setBd(currentDate);
      setBirthDateSelected(true);
      // Automatically update age when birthday changes
      const calculatedAge = calculateAge(currentDate);
      handleLocalChange("age", calculatedAge);
    }
  };

  const handleSubmit = () => {
    onFormChange("name", localFormData.name);
    onFormChange("age", calculateAge(bd));
    onFormChange("birthday", bd.toISOString());
    onFormChange("gender", localFormData.gender);
    onSubmit();
  };

  const handleClose = () => {
    setLocalFormData({
      name: formData.name || "",
      gender: formData.gender || "",
    });

    if (formData.birthday) {
      const initialDate = new Date(formData.birthday);
      if (!isNaN(initialDate.getTime())) {
        setBd(initialDate);
        setBirthDateSelected(true);
      }
    } else {
      setBd(new Date());
      setBirthDateSelected(false);
    }

    // Close any open dropdowns
    setGenderOpen(false);
    setBirthOpen(false);
    onClose();
  };

  const [bd, setBd] = React.useState(new Date());
  const [birthDateSelected, setBirthDateSelected] = React.useState(false);
  const isVaildAge = calculateAge(bd) >= 15;

  return (
    <View>
      {userType === "patient" ? (
        <BaseModal visible={visible} onClose={handleClose} title="Edit Profile">
      <FormField
        label="Name"
        value={localFormData.name}
        onChangeText={(text) => handleLocalChange("name", text)}
        placeholder="Enter your name"
      />

      <View className="mb-3 w-full">
        <Text className="text-lg font-medium mb-2">Birthday *</Text>
        <TouchableOpacity
          onPress={() => {
            setGenderOpen(false);
            setBirthOpen(true);
          }}
        >
          <View className="p-5 bg-white rounded-xl">
            <Text>{birthDateSelected ? formatDate(bd) : "mm/dd/yyyy"}</Text>
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
                setBirthDateSelected(true);
              }
            }}
            maximumDate={new Date()}
          />
        )}
        {!isVaildAge && birthDateSelected && (
          <Text className="text-md text-red-500 mt-2">
            * You should be at least 15 years old.
          </Text>
        )}
      </View>

      <View className="px-2 w-full mb-2">
        <Text className="text-lg font-medium mb-2">Gender</Text>
        <Dropdown
          data={genderOptions}
          open={genderOpen}
          setOpen={setGenderOpen}
          value={localFormData.gender}
          setValue={(callback) => {
            const newValue =
              typeof callback === "function"
                ? callback(localFormData.gender)
                : callback;
            handleLocalChange("gender", newValue);
          }}
          placeholder="Select your gender"
          onOpen={() => setBirthOpen(false)}
        />
      </View>

      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={handleSubmit}
        disabled={birthDateSelected && !isVaildAge}
      />
    </BaseModal>
      ):(
        <BaseModal visible={visible} onClose={handleClose} title="Edit Name">
      <FormField
        label="Name"
        value={localFormData.name}
        onChangeText={(text) => handleLocalChange("name", text)}
        placeholder="Enter your name"
      />
      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={handleSubmit}
        disabled={localFormData.name === ""}
      />
    </BaseModal>



      )}
    </View>
  );
};

export default ProfileEditModal;
