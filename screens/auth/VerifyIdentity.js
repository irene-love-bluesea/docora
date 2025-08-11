import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../../components/Buttons/CustomButton";
import Dropdown from "../../components/Form/Dropdown";
import { countries } from "../../constant/data/countries";
import {
  experienceYears,
  specialityRole,
} from "../../constant/data/doctorDetails";
import { deleteFile, getFileURL, uploadFile } from "../../utils/fileUpload";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";

const VerifyIdentity = ({ navigation }) => {
  const [licenceNo, setLicenceNo] = useState("");
  const [countryValue, setCountryValue] = useState(null);
  const [specialtyValue, setSpecialtyValue] = useState(null);
  const [yearOfExperience, setYearOfExperience] = useState(null);
  const [medicalCertificate, setMedicalCertificate] = useState(null);
  const [governmentId, setGovernmentId] = useState(null);

  const [countryOpen, setCountryOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false); // file upload loading
  const [uploadingFile, setUploadingFile] = useState(null); // Track which file is uploading
  const [uploadProgress, setUploadProgress] = useState(0);

  // Deleting states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingFile, setDeletingFile] = useState(null);

  const [medicalCertificateUrl, setMedicalCertificateUrl] = useState(null);
  const [governmentIdUrl, setGovernmentIdUrl] = useState(null);
  const [medicalCertificatePath, setMedicalCertificatePath] = useState(null);
  const [governmentIdPath, setGovernmentIdPath] = useState(null);

  const isFormValid =
    licenceNo !== "" &&
    countryValue !== null &&
    specialtyValue !== null &&
    yearOfExperience !== null &&
    medicalCertificate !== null &&
    governmentId !== null;


  const handleDropdownOpen = (dropdownName) => {
    switch (dropdownName) {
      case "country":
        setCountryOpen(true);
        setSpecialtyOpen(false);
        setExperienceOpen(false);
        break;
      case "specialty":
        setSpecialtyOpen(true);
        setCountryOpen(false);
        setExperienceOpen(false);
        break;
      case "experience":
        setExperienceOpen(true);
        setCountryOpen(false);
        setSpecialtyOpen(false);
        break;
      default:
        setCountryOpen(false);
        setSpecialtyOpen(false);
        setExperienceOpen(false);
    }
  };

  // file upload
  const pickFile = async (fileType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: false,
      });

      if (!result.canceled) {
        const asset = result.assets[0];

        if (asset.size > 5 * 1024 * 1024) {
          alert("File is too large! Maximum size is 5MB.");
          return;
        }

        // Set loading states
        setIsUploading(true);
        setUploadingFile(fileType);
        setUploadProgress(0);
        try {
          const userId = "092834343434"; // Replace with actual user ID

          const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
              }
              return prev + 10;
            });
          }, 200);

          const uploadedData = await uploadFile(userId, asset);
          clearInterval(progressInterval);
          setUploadProgress(100);
          if (uploadedData) {
            const publicUrl = getFileURL(uploadedData.path);
            console.log("File available at:", publicUrl);

            // Update state based on file type
            if (fileType === "medical_certificate") {
              setMedicalCertificate(asset);
              setMedicalCertificateUrl(publicUrl);
              setMedicalCertificatePath(uploadedData.path);
            } else if (fileType === "government_id") {
              setGovernmentId(asset);
              setGovernmentIdUrl(publicUrl);
              setGovernmentIdPath(uploadedData.path);
            }

             setTimeout(() => {
              setIsUploading(false);
              setUploadingFile(null);
              setUploadProgress(0);
            }, 500);

          } else {
            throw new Error("Upload failed, returned data was null.");
          }
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          alert("Error uploading file: " + uploadError.message);
        } finally {
          setIsUploading(false);
        }
      }
    } catch (err) {
      console.log(err);
      alert("Error while uploading file", err);
    }
  };

  const removeFileHandler = async (fileType) => {
    setIsDeleting(true);
    setDeletingFile(fileType);
    if (fileType === "medical_certificate") {
      if (medicalCertificatePath) {
        const result = await deleteFile(medicalCertificatePath);
        if (result.success) {
          console.log("Medical certificate deleted successfully");
        } else {
          console.error("Failed to delete medical certificate:", result.error);
        }
      }

      setMedicalCertificate(null);
      setMedicalCertificateUrl(null);
      setMedicalCertificatePath(null);
    } else if (fileType === "government_id") {
      if (governmentIdPath) {
        const result = await deleteFile(governmentIdPath);
        if (result.success) {
          console.log("Government ID deleted successfully");
        } else {
          console.error("Failed to delete government ID:", result.error);
        }
      }

      setGovernmentId(null);
      setGovernmentIdUrl(null);
      setGovernmentIdPath(null);
    }

    setIsDeleting(false);
    setDeletingFile(null);
  };

  const handleSubmit = () => {
    console.log(
      countryValue,
      specialtyValue,
      licenceNo,
      yearOfExperience,
      medicalCertificate,
      governmentId
    );

    navigation.navigate("BottomTabs", { userType: "doctor" });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
      className=" bg-background"
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setCountryOpen(false);
          setSpecialtyOpen(false);
          setExperienceOpen(false);
        }}
      >
        <ScrollView className="flex-1 bg-background">
          <View className=" justify-start items-center px-5 ">
            <View className="mb-3 w-full mt-5">
              <Text className="text-lg font-medium mb-2">
                Medical Licence Number *
              </Text>
              <TextInput
                className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
                placeholder="Enter your licence number"
                placeholderTextColor="#999"
                value={licenceNo}
                onChangeText={setLicenceNo}
              />
            </View>
            <View className="mb-3 w-full">
              <Text className="text-lg font-medium mb-2">
                Issuing Country *
              </Text>
              <Dropdown
                data={countries}
                open={countryOpen}
                setOpen={setCountryOpen}
                value={countryValue}
                zIndex={3000}
                setValue={setCountryValue}
                placeholder="Select a country"
                onOpen={() => handleDropdownOpen("country")}
              />
            </View>
            <View className="mb-3 w-full">
              <Text className="text-lg font-medium mb-2">
                Medical Specialty *
              </Text>
              <Dropdown
                data={specialityRole}
                open={specialtyOpen}
                setOpen={setSpecialtyOpen}
                zIndex={1000}
                value={specialtyValue}
                setValue={setSpecialtyValue}
                placeholder="Select a specialty"
                onOpen={() => handleDropdownOpen("specialty")}
              />
            </View>
            <View className="mb-3 w-full">
              <Text className="text-lg font-medium mb-2">
                Year of Experience *
              </Text>
              <Dropdown
                data={experienceYears}
                open={experienceOpen}
                setOpen={setExperienceOpen}
                zIndex={500}
                value={yearOfExperience}
                setValue={setYearOfExperience}
                placeholder="Select your experience range"
                onOpen={() => handleDropdownOpen("experience")}
              />
            </View>
            <View className="mb-3 w-full">
              <Text className="text-lg font-medium mb-2">
                Medical Certificate *
              </Text>
              {medicalCertificate ? (
                <View>
                  <View className="flex-row items-center gap-2 mt-3 justify-between  border-2 border-gray-300 rounded-xl p-4">
                    <View className="flex-row items-center gap-2 w-3/4">
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="green"
                      />
                      <Text className="text-md text-gray-500 ">
                        Selected file: {medicalCertificate.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFileHandler("medical_certificate")}
                      disabled={isUploading || isDeleting}
                    >
                      {isDeleting && deletingFile === "medical_certificate" ? (
                        <ActivityIndicator size="small" color="#EF4444" />
                      ) : (
                        <Text className="text-md text-red-500">Remove</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => pickFile("medical_certificate")}
                    disabled={isUploading || isDeleting}
                    className="flex-row items-center justify-center mt-3 px-5 py-2 gap-5 border-dashed rounded-xl border-gray-300 border-2"
                  >
                    <Text className="text-lg text-gray-500">Tap to Upload</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => pickFile("medical_certificate")}
                  disabled={isUploading || isDeleting}
                >
                  <View className=" flex-row items-center justify-center  px-5 py-8 gap-5 border-dashed rounded-xl border-gray-300 border-2">
                    <Ionicons
                      name="cloud-upload-outline"
                      className=""
                      size={60}
                      color="#5C738A"
                    />
                    <View className="flex-col w-2/3 gap-2 ">
                      <Text className="text-xl text-center text-gray-500">
                        Tap to upload your medical certificate
                      </Text>
                      <Text className="text-md text-center text-gray-500">
                        PDF , JPG , PNG (Max 5MB)
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {isUploading && uploadingFile === "medical_certificate" && (
                <LoadingOverlay 
                  message="Uploading medical certificate..." 
                  progress={uploadProgress}
                />
              )}
            </View>
            <View className="mb-3 w-full">
              <Text className="text-lg font-medium mb-2">Goverment ID *</Text>
              {governmentId ? (
                <View>
                  <View className="flex-row items-center gap-2 mt-3 justify-between  border-2 border-gray-300 rounded-xl p-4">
                    <View className="flex-row items-center gap-2 w-3/4">
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="green"
                      />
                      <Text className="text-md text-gray-500 ">
                        Selected file: {governmentId.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFileHandler("government_id")}
                      disabled={isUploading || isDeleting}
                    >
                      {isDeleting && deletingFile === "government_id" ? (
                        <ActivityIndicator size="small" color="#EF4444" />
                      ) : (
                        <Text className="text-md text-red-500">Remove</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => pickFile("government_id")}
                    disabled={isUploading || isDeleting}
                    className="flex-row items-center justify-center mt-3 px-5 py-2 gap-5 border-dashed rounded-xl border-gray-300 border-2"
                  >
                    <Text className="text-lg text-gray-500">Tap to Upload</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => pickFile("government_id")}
                   disabled={isUploading || isDeleting}
                   >
                  <View className=" flex-row items-center justify-center  px-5 py-8 gap-5 border-dashed rounded-xl border-gray-300 border-2">
                    <FontAwesome
                      name="drivers-license-o"
                      className=""
                      size={50}
                      color="#5C738A"
                    />
                    <View className="flex-col w-2/3 gap-2 ">
                      <Text className="text-xl text-center text-gray-500">
                        Tap to upload your Government ID
                      </Text>
                      <Text className="text-md text-center text-gray-500">
                        PDF , JPG , PNG (Max 5MB)
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {/* Loading overlay for government ID */}
              {isUploading && uploadingFile === "government_id" && (
                <LoadingOverlay 
                  message="Uploading government ID..." 
                  progress={uploadProgress}
                />
              )}
            </View>
            <CustomButton
              title="Submit"
              variant="primary"
              onPress={handleSubmit}
              disabled={!isFormValid || isUploading || isDeleting}
              className=" mt-5"
            />
            
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default VerifyIdentity;
