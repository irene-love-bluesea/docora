import React from "react";
import BaseModal from "./BaseModal";
import FormField from "../FormField";
import CustomButton from "../Buttons/CustomButton";

const MedicalEditModal = ({ 
  visible, 
  onClose, 
  formData, 
  onFormChange, 
  onSubmit 
}) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Edit Medical Information"
    >
      <FormField
        label="Blood Type"
        value={formData.bloodType}
        onChangeText={(text) => onFormChange('bloodType', text)}
        placeholder="Enter blood type"
      />

      <FormField
        label="Allergies"
        value={formData.allergies}
        onChangeText={(text) => onFormChange('allergies', text)}
        placeholder="Enter allergies (comma separated)"
        keyboardType="default"
      />

      <FormField
        label="Chronic Conditions"
        value={formData.chronic}
        onChangeText={(text) => onFormChange('chronic', text)}
        placeholder="Enter chronic conditions(comma separated)"
      />

      <FormField
        label="Current Medications"
        value={formData.medications}
        onChangeText={(text) => onFormChange('medications', text)}
        placeholder="Enter current medications(comma separated)"
      />

      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={onSubmit}
      />
    </BaseModal>
  );
};

export default MedicalEditModal;