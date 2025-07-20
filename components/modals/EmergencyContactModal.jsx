import React from "react";
import BaseModal from "./BaseModal";
import FormField from "../FormField";
import CustomButton from "../Buttons/CustomButton";

const EmergencyContactModal = ({ 
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
      title="Edit Emergency Contact"
    >
      <FormField
        label="Name"
        value={formData.name}
        onChangeText={(text) => onFormChange('name', text)}
        placeholder="Enter emergency contact name"
      />

      <FormField
        label="Phone"
        value={formData.phone}
        onChangeText={(text) => onFormChange('phone', text)}
        placeholder="Enter emergency contact phone"
        keyboardType="phone-pad"
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

export default EmergencyContactModal;