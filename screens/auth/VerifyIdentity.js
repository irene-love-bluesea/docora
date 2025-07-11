import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { countries } from "../../constant/data/countries";
import Dropdown from "../../components/Dropdown";
import CustomButton from "../../components/Buttons/CustomButton";
import {
  experienceYears,
  specialityRole,
} from "../../constant/data/doctorDetails";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";

const VerifyIdentity = () => {
  const [licenceNo, setLicenceNo] = useState("");
  const [countryValue, setCountryValue] = useState(null);
  const [specialtyValue, setSpecialtyValue] = useState(null);
  const [yearOfExperience, setYearOfExperience] = useState(null);
  const [medicalCertificate, setMedicalCertificate] = useState(null);
  const [governmentId, setGovernmentId] = useState(null);

  const [countryOpen, setCountryOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);

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

        if (fileType === "medical_certificate") {
          setMedicalCertificate(asset);
        } else if (fileType === "government_id") {
          setGovernmentId(asset);
        }
      }
    } catch (err) {
      console.log(err);
      alert("Error while uploading file", err);
    }
  };

  const handleSubmit = () => {
    console.log(countryValue, specialtyValue, licenceNo, yearOfExperience , medicalCertificate, governmentId);
  };
  
  return (
    <ScrollView>
      <View className=" flex-1 justify-start items-center px-5 bg-background">
        <View className="mb-3 w-full">
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
          <Text className="text-lg font-medium mb-2">Issuing Country *</Text>
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
          <Text className="text-lg font-medium mb-2">Medical Specialty *</Text>
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
          <Text className="text-lg font-medium mb-2">Year of Experience *</Text>
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
          <TouchableOpacity onPress={() => pickFile("medical_certificate")}>
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
          {medicalCertificate && (
            <View className="flex-row items-center gap-2 mt-3 ">
              <Text className="text-md text-gray-500">
                Selected file: {medicalCertificate.name}
              </Text>
              <TouchableOpacity onPress={() => setMedicalCertificate(null)}>
                <Ionicons name="close-circle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View className="mb-3 w-full">
          <Text className="text-lg font-medium mb-2">Goverment ID *</Text>
          <TouchableOpacity onPress={() => pickFile("government_id")}>
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
          {governmentId && (
            <View className="flex-row items-center gap-2 mt-3 ">
              <Text className="text-md text-gray-500">
                Selected file: {governmentId.name}
              </Text>
              <TouchableOpacity onPress={() => setGovernmentId(null)}>
                <Ionicons name="close-circle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <CustomButton title="Submit" variant="primary" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default VerifyIdentity;
