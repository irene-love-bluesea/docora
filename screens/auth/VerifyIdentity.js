import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { countries } from "../../constant/data/countries";
import Dropdown from "../../components/Dropdown";
import CustomButton from "../../components/Buttons/CustomButton";
import {
  experienceYears,
  specialityRole,
} from "../../constant/data/doctorDetails";

const VerifyIdentity = () => {
  const [licenceNo, setLicenceNo] = useState("");
  const [countryValue, setCountryValue] = useState(null);
  const [specialtyValue, setSpecialtyValue] = useState(null);
  const [yearOfExperience, setYearOfExperience] = useState(null);

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

  const handleSubmit = () => {
    console.log(countryValue, specialtyValue, licenceNo);
  };
  return (
    <View className=" flex-1 justify-start items-center px-5 bg-background">
      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">
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
        <Text className="text-xl font-normal mb-2">Issuing Country *</Text>
        <Dropdown
          data={countries}
          open={countryOpen}
          setOpen={setCountryOpen}
          value={countryValue}
          zIndex={3000}
          setValue={setCountryValue}
          placeholder="Select a country"
          onOpen={() => handleDropdownOpen('country')}
        />
      </View>
      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">Medical Specialty *</Text>
        <Dropdown
          data={specialityRole}
          open={specialtyOpen}
          setOpen={setSpecialtyOpen}
          zIndex={1000}
          value={specialtyValue}
          setValue={setSpecialtyValue}
          placeholder="Select a specialty"
        onOpen={() => handleDropdownOpen('specialty')}
        />
      </View>
      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">Year of Experience *</Text>
        <Dropdown
          data={experienceYears}
          open={experienceOpen}
          setOpen={setExperienceOpen}
          zIndex={500}
          value={yearOfExperience}
          setValue={setYearOfExperience}
          placeholder="Select your experience range"
          onOpen={() => handleDropdownOpen('experience')}
        />
      </View>
      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">Medical Certificate *</Text>
        
      </View>
      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">Goverment ID *</Text>
        
      </View>
      <CustomButton title="Submit" variant="primary" onPress={handleSubmit} />
    </View>
  );
};

export default VerifyIdentity;
