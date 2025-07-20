import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import BaseModal from "./BaseModal";
import FormField from "../FormField";
import CustomButton from "../Buttons/CustomButton";
import Dropdown from "../Dropdown";

const MedicalEditModal = ({
  visible,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  bloodTypeOptions,
  bloodTypeOpen,
  setBloodTypeOpen,
  allergyOptions,
  allergyOpen,
  setAllergyOpen,
  chronicOptions,
  chronicOpen,
  setChronicOpen,
}) => {
  const [localFormData, setLocalFormData] = useState({
    bloodType: "",
    allergies: [],
    chronic: [],
    medications: "",
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (visible && !isInitialized) {
      setLocalFormData({
        bloodType: formData.bloodType || "",
        allergies: Array.isArray(formData.allergies) ? formData.allergies : [],
        chronic: Array.isArray(formData.chronic) ? formData.chronic : [],
        medications: formData.medications || "",
      });
      setIsInitialized(true);
    } else if (!visible) {
      setIsInitialized(false);
    }
  }, [
    visible,
    formData.bloodType,
    formData.allergies,
    formData.chronic,
    formData.medications,
    isInitialized,
  ]);

  const handleLocalChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onFormChange("bloodType", localFormData.bloodType);
    onFormChange("allergies", localFormData.allergies);
    onFormChange("chronic", localFormData.chronic);
    onFormChange("medications", localFormData.medications);
    onSubmit();
  };

  const handleClose = () => {
    setLocalFormData({
      bloodType: formData.bloodType || "",
      allergies: formData.allergies || [],
      chronic: formData.chronic || [],
      medications: formData.medications || "",
    });
    setBloodTypeOpen(false);
    setAllergyOpen(false);
    setChronicOpen(false);
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={handleClose}
      title="Edit Medical Information"
    >
      {/* Blood Type Dropdown (Single Select) */}
      <Text className="w-full my-2 text-lg font-medium ml-2">Blood Type</Text>
      <Dropdown
        data={bloodTypeOptions}
        open={bloodTypeOpen}
        setOpen={setBloodTypeOpen}
        value={localFormData.bloodType}
        zIndex={5000}
        placeholder="Select your blood type"
        setValue={(callback) => {
          const newValue =
            typeof callback === "function"
              ? callback(localFormData.bloodType)
              : callback;
          handleLocalChange("bloodType", newValue);
        }}
        onOpen={() => {
          setChronicOpen(false);
          setAllergyOpen(false);
        }}
      />

      {/* Allergies Dropdown (Multi Select) */}
      <Text className="w-full my-2 text-lg font-medium ml-2">Allergies</Text>
      <Dropdown
        data={allergyOptions}
        open={allergyOpen}
        setOpen={setAllergyOpen}
        value={localFormData.allergies}
        mode="BADGE"
        multiple={true}
        zIndex={3000}
        placeholder="Select your allergies"
        setValue={(callback) => {
          const newValue =
            typeof callback === "function"
              ? callback(localFormData.allergies)
              : callback;
          handleLocalChange("allergies", newValue);
        }}
        onOpen={() => {
          setChronicOpen(false);
          setBloodTypeOpen(false);
        }}
      />

      {/* Chronic Dropdown (Multi Select) */}
      <Text className="w-full my-2 text-lg font-medium ml-2">
        Chronic Conditions
      </Text>
      <Dropdown
        data={chronicOptions}
        open={chronicOpen}
        setOpen={setChronicOpen}
        value={localFormData.chronic}
        mode="BADGE"
        multiple={true}
        zIndex={2000}
        placeholder="Select Chronic Conditions"
        setValue={(callback) => {
          const newValue =
            typeof callback === "function"
              ? callback(localFormData.chronic)
              : callback;
          handleLocalChange("chronic", newValue);
        }}
        onOpen={() => {
          setAllergyOpen(false);
          setBloodTypeOpen(false);
        }}
      />

      <FormField
        label="Current Medications"
        value={localFormData.medications}
        onChangeText={(text) => handleLocalChange("medications", text)}
        placeholder="Enter current medications (comma separated)"
      />

      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={handleSubmit}
      />
    </BaseModal>
  );
};

export default MedicalEditModal;
