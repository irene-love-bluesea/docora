import React from "react";
import BaseModal from "./BaseModal";
import FormField from "../FormField";
import CustomButton from "../Buttons/CustomButton";

const ContactEditModal = ({ 
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
      title="Edit Contact Information"
    >
      <FormField
        label="Email"
        value={formData.email}
        onChangeText={(text) => onFormChange('email', text)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <FormField
        label="Phone"
        value={formData.phone}
        onChangeText={(text) => onFormChange('phone', text)}
        placeholder="Enter your phone"
        keyboardType="phone-pad"
      />

      <FormField
        label="Address"
        value={formData.address}
        onChangeText={(text) => onFormChange('address', text)}
        placeholder="Enter your address"
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

export default ContactEditModal;