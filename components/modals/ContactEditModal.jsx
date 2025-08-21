import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import BaseModal from "./BaseModal";
import CustomButton from "../Buttons/CustomButton";
import FormField from "../Form/FormField";

const ContactEditModal = ({ 
  visible, 
  onClose, 
  formData, 
  onSubmit,
  isLoading
}) => {
  const [localFormData, setLocalFormData] = useState({
    email: "",
    phone: "",
    address: ""
  });

  // State to track which fields have been changed
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    if (visible) {
      setLocalFormData({
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || ""
      });
      // Reset changed fields when the modal opens
      setChangedFields({}); 
    }
  }, [visible, formData]);

  const handleLocalChange = (field, value) => {
    setLocalFormData(prev => {
      // Check if the value is different from the original data
      if (prev[field] !== value) {
        setChangedFields(prevChanged => ({ ...prevChanged, [field]: true }));
      } else {
        // If the user reverts the change, remove the field from changedFields
        setChangedFields(prevChanged => {
          const newChanged = { ...prevChanged };
          delete newChanged[field];
          return newChanged;
        });
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = () => {
    // Prepare the payload with ONLY the changed data
    const payload = {};
    Object.keys(changedFields).forEach(field => {
      payload[field] = localFormData[field];
    });

    // You can also add a check to make sure at least one field was changed
    if (Object.keys(payload).length > 0) {
      onSubmit(payload);
    } else {
      // If no changes, simply close the modal
      onClose();
    }
  };

  const handleClose = () => {
    // Reset to original form data
    setLocalFormData({
      email: formData.email || "",
      phone: formData.phone || "",
      address: formData.address || ""
    });
    setChangedFields({});
    onClose();
  };

  // Basic email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === "" || emailRegex.test(email);
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
        disabled={isLoading || Object.keys(changedFields).length === 0}
      />
    </BaseModal>
  );
};

export default ContactEditModal;