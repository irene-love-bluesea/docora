import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import BaseModal from "./BaseModal";
import CustomButton from "../Buttons/CustomButton";
import FormField from "../Form/FormField";

const ContactEditModal = ({ 
  visible, 
  onClose, 
  formData, 
  onFormChange, 
  onSubmit,
  isLoading
}) => {

  const [localFormData, setLocalFormData] = useState({
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (visible) {
      setLocalFormData({
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || ""
      });
    }
  }, [visible, formData]);

  const handleLocalChange = (field, value) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Prepare the data to send
    const dataToSubmit = {
      email: localFormData.email,
      phone: localFormData.phone,
      address: localFormData.address,
    };

    // Update parent form data
    onFormChange("email", dataToSubmit.email);
    onFormChange("phone", dataToSubmit.phone);
    onFormChange("address", dataToSubmit.address);
    
    // Call parent submit handler with the data directly
    onSubmit(dataToSubmit);
  };

  const handleClose = () => {
    // Reset to original form data
    setLocalFormData({
      email: formData.email || "",
      phone: formData.phone || "",
      address: formData.address || ""
    });
    onClose();
  };

  // Basic email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === "" || emailRegex.test(email);
  };

  // Check if form has valid data
  const isFormValid = () => {
    return isValidEmail(localFormData.email) && 
           localFormData.phone.trim() !== "" && 
           localFormData.address.trim() !== "";
  };
  
  return (
    <BaseModal
      visible={visible}
      onClose={handleClose}
      title="Edit Contact Information"
    >
      <FormField
        label="Email"
        value={localFormData.email}
        onChangeText={(text) => handleLocalChange('email', text)}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {localFormData.email !== "" && !isValidEmail(localFormData.email) && (
        <Text className="text-red-500 text-sm mt-1 ml-2">
          Please enter a valid email address
        </Text>
      )}

      <FormField
        label="Phone"
        value={localFormData.phone}
        onChangeText={(text) => handleLocalChange('phone', text)}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <FormField
        label="Address"
        value={localFormData.address}
        onChangeText={(text) => handleLocalChange('address', text)}
        placeholder="Enter your address"
        multiline={true}
        numberOfLines={3}
      />

      <CustomButton
        title="Confirm"
        width="w-[60%]"
        variant="green"
        onPress={handleSubmit}
        disabled={!isFormValid() || isLoading}
      />
    </BaseModal>
  );
};

export default ContactEditModal;