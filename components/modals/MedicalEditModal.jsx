import { useEffect, useState } from "react";
import { Text } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import Dropdown from "../Form/Dropdown";
import FormField from "../Form/FormField";
import BaseModal from "./BaseModal";

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
  isLoading,
}) => {
  const [localFormData, setLocalFormData] = useState({
    bloodType: "",
    allergies: [],
    chronic: [],
    medications: "",
  });

  useEffect(() => {
    if (visible) {
      setLocalFormData({
        bloodType: formData.bloodType || "",
        allergies: Array.isArray(formData.allergies) ? formData.allergies : [],
        chronic: Array.isArray(formData.chronic) ? formData.chronic : [],
        medications: formData.medications || "",
      });
    }
  }, [visible, formData]);

  const handleLocalChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Prepare the data to send
    const dataToSubmit = {
      bloodType: localFormData.bloodType,
      allergies: localFormData.allergies,
      chronic: localFormData.chronic,
      medications: localFormData.medications,
    };

    // Update parent form data
    onFormChange("bloodType", dataToSubmit.bloodType);
    onFormChange("allergies", dataToSubmit.allergies);
    onFormChange("chronic", dataToSubmit.chronic);
    onFormChange("medications", dataToSubmit.medications);
    
    // Call parent submit handler with the data directly
    onSubmit(dataToSubmit);
  };

  const handleClose = () => {
    // Reset to original form data
    setLocalFormData({
      bloodType: formData.bloodType || "",
      allergies: Array.isArray(formData.allergies) ? formData.allergies : [],
      chronic: Array.isArray(formData.chronic) ? formData.chronic : [],
      medications: formData.medications || "",
    });
    
    // Close all dropdowns
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
        multiline={true}
        numberOfLines={3}
      />

      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </BaseModal>
  );
};

export default MedicalEditModal;