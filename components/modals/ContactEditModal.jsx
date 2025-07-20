import React, { useState, useEffect } from "react";
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
    Object.keys(localFormData).forEach(key => {
      onFormChange(key, localFormData[key]);
    });
    onSubmit();
  };

  const handleClose = () => {
    setLocalFormData({
      email: formData.email || "",
      phone: formData.phone || "",
      address: formData.address || ""
    });
    onClose();
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
      />

      <FormField
        label="Phone"
        value={localFormData.phone}
        onChangeText={(text) => handleLocalChange('phone', text)}
        placeholder="Enter your phone"
        keyboardType="phone-pad"
      />

      <FormField
        label="Address"
        value={localFormData.address}
        onChangeText={(text) => handleLocalChange('address', text)}
        placeholder="Enter your address"
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

export default ContactEditModal;