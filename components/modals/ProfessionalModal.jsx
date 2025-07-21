import { useEffect, useState } from "react";
import { Text } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import Dropdown from "../Form/Dropdown";
import FormField from "../Form/FormField";
import BaseModal from "./BaseModal";

const ProfessionalModal = ({
  visible,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  experienceOptions,
  experienceOpen,
  setExperienceOpen,
  specialtyOptions,
  specialtyOpen,
  setSpecialtyOpen,
}) => {
  const [localFormData, setLocalFormData] = useState({
    experience: "",
    specialty: "",
    workPlace: "",
    graduated: "",
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (visible && !isInitialized) {
      setLocalFormData({
        experience: formData.experience || "",
        specialty: formData.specialty || "",
        workPlace: formData.workPlace || "",
        graduated: formData.graduated || "",
      });
      setIsInitialized(true);
    } else if (!visible) {
      setIsInitialized(false);
    }
  }, [
    visible,
    formData.experience,
    formData.specialty,
    formData.workPlace,
    formData.graduated,
    isInitialized,
  ]);

  const handleLocalChange = (field, value) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onFormChange("experience", localFormData.experience);
    onFormChange("specialty", localFormData.specialty);
    onFormChange("workPlace", localFormData.workPlace);
    onFormChange("graduated", localFormData.graduated);
    onSubmit();
  };

  const handleClose = () => {
    setLocalFormData({
      experience: formData.experience || "",
      specialty: formData.specialty || "",
      workPlace: formData.workPlace || "",
      graduated: formData.graduated || "",
    });
    setExperienceOpen(false);
    setSpecialtyOpen(false);
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={handleClose}
      title="Edit Medical Information"
    >
      {/* Experience Dropdown (Single Select) */}
      <Text className="w-full my-2 text-lg font-medium ml-2">
        Year of Experience
      </Text>
      <Dropdown
        data={experienceOptions}
        open={experienceOpen}
        setOpen={setExperienceOpen}
        value={localFormData.experience}
        zIndex={5000}
        placeholder="Select Year of Experience"
        setValue={(callback) => {
          const newValue =
            typeof callback === "function"
              ? callback(localFormData.experience)
              : callback;
          handleLocalChange("experience", newValue);
        }}
        onOpen={() => {
          setSpecialtyOpen(false);
        }}
      />

      {/* Specialty Dropdown (Single Select) */}
      <Text className="w-full my-2 text-lg font-medium ml-2">
        Medical Specialty
      </Text>
      <Dropdown
        data={specialtyOptions}
        open={specialtyOpen}
        setOpen={setSpecialtyOpen}
        value={localFormData.specialty}
        zIndex={3000}
        placeholder="Select Medical Specialty"
        setValue={(callback) => {
          const newValue =
            typeof callback === "function"
              ? callback(localFormData.specialty)
              : callback;
          handleLocalChange("specialty", newValue);
        }}
        onOpen={() => {
          setExperienceOpen(false);
        }}
      />
      <FormField
        label="Current Work Place"
        value={localFormData.workPlace}
        onChangeText={(text) => handleLocalChange("workPlace", text)}
        placeholder="Enter Current Work Place"
      />
      <FormField
        label="Graduated From"
        value={localFormData.graduated}
        onChangeText={(text) => handleLocalChange("graduated", text)}
        placeholder="Enter Graduated University"
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

export default ProfessionalModal;
