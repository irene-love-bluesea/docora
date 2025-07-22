import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileEditModal from "../../components/modals/ProfileEditModal";
import ContactEditModal from "../../components/modals/ContactEditModal";
import ProfessionalModal from "../../components/modals/ProfessionalModal";
import {
  ProfileEditCard,
  SettingCard,
} from "../../components/Card/ProfileEditCard";
import { gender } from "./../../constant/data/patientDetails";
import {
  experienceYears,
  specialityRole,
} from "../../constant/data/doctorDetails";

export default function DoctorOwnProfile() {
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  // Modal states
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);
  const [professionalModalVisible, setProfessionalModalVisible] =
    React.useState(false);

  // Form states
  const [profileData, setProfileData] = React.useState({
    name: "Ethan Carter",
  });

  const [contactData, setContactData] = React.useState({
    email: "sarahjames@gmail.com",
    phone: "+1 555 123-4567",
    address: "123 Maple Street, Anytown, USA",
  });

  const [professionalData, setProfessionalData] = React.useState({
    experience: "1-3 years",
    specialty: "Cardiology",
    workPlace: "New York Medical Center",
    graduated: "Harvard Medical School",
  });

  const [genderOpen, setGenderOpen] = React.useState(false);
  const [birthOpen, setBirthOpen] = React.useState(false);
  const [experienceOpen, setExperienceOpen] = React.useState(false);
  const [specialtyOpen, setSpecialtyOpen] = React.useState(false);

  // Form handlers
  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfessionalChange = (field, value) => {
    setProfessionalData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit handlers
  const handleProfileSubmit = () => {
    setProfileModalVisible(false);
  };

  const handleContactSubmit = () => {
    setContactModalVisible(false);
  };

  const handleProfessionalSubmit = () => {
    setProfessionalModalVisible(false);
  };

  // Image picker functions
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to select a profile photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
        Alert.alert(
          "File Too Large",
          "Please select an image smaller than 5MB."
        );
        return;
      }
      setProfilePhoto({
        uri: asset.uri,
        name: asset.fileName || "profile_photo.jpg",
        type: asset.mimeType || "image/jpeg",
        size: asset.fileSize,
      });
    }
  };

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera permissions to take a photo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
        Alert.alert(
          "File Too Large",
          "Please take a photo with smaller file size."
        );
        return;
      }
      setProfilePhoto({
        uri: asset.uri,
        name: asset.fileName || "profile_photo.jpg",
        type: asset.mimeType || "image/jpeg",
        size: asset.fileSize,
      });
    }
  };

  const showImageOptions = () => {
    Alert.alert("Select Profile Photo", "Choose an option", [
      { text: "📷 Camera", onPress: pickImageFromCamera },
      { text: "🖼️ Gallery", onPress: pickImage },
      { text: "❌ Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView className="bg-background">
      <Text className="text-2xl font-semibold font-alata mt-6 mb-2 mx-5">
        Profile
      </Text>

      <ScrollView
        className="bg-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4 pb-5">
          {/* Profile Header */}
          <View
            className="w-full p-3 rounded-lg bg-white flex-row justify-between items-center mb-1"
            style={{ elevation: 1 }}
          >
            <View className="flex-row items-center gap-3">
              <View>
                <TouchableOpacity onPress={showImageOptions}>
                  <Image
                    className="w-[70px] h-[70px] border border-gray-600 rounded-full"
                    source={
                      profilePhoto
                        ? { uri: profilePhoto.uri }
                        : require("../../assets/profile/profile_m.png")
                    }
                  />
                  <Ionicons
                    className="border rounded-full"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "white",
                    }}
                    name="camera-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View className="flex items-start justify-start">
                <Text className="text-2xl text-center font-medium">
                  Dr. {profileData.name}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
              <MaterialIcons name="edit" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* Contact Information */}
          <ProfileEditCard
            title="Contact Information"
            onEdit={() => setContactModalVisible(true)}
          >
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Email</Text>
              <Text className="text-lg font-normal">{contactData.email}</Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Phone</Text>
              <Text className="text-lg font-normal">{contactData.phone}</Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Address</Text>
              <Text className="text-lg font-normal">{contactData.address}</Text>
            </View>
          </ProfileEditCard>

          {/* Professional Information */}
          <ProfileEditCard
            title="Professional Information"
            onEdit={() => setProfessionalModalVisible(true)}
          >
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Year of Experience</Text>
              <Text className="text-lg font-normal">
                {professionalData.experience} Years
              </Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Medical Specialty</Text>
              <Text className="text-lg font-normal">
                {professionalData.specialty}
              </Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Current Work Place</Text>
              <Text className="text-lg font-normal">
                {professionalData.workPlace}
              </Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Graduated From</Text>
              <Text className="text-lg font-normal">
                {professionalData.graduated}
              </Text>
            </View>
          </ProfileEditCard>

          <SettingCard></SettingCard>
        </View>
      </ScrollView>
      {/* Modals */}
      <ProfileEditModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        formData={profileData}
        onFormChange={handleProfileChange}
        onSubmit={handleProfileSubmit}
        genderOptions={gender}
        genderOpen={genderOpen}
        setGenderOpen={setGenderOpen}
        birthOpen={birthOpen}
        setBirthOpen={setBirthOpen}
      />

      <ProfessionalModal
        visible={professionalModalVisible}
        onClose={() => setProfessionalModalVisible(false)}
        formData={professionalData}
        onFormChange={handleProfessionalChange}
        onSubmit={handleProfessionalSubmit}
        experienceOptions={experienceYears}
        experienceOpen={experienceOpen}
        setExperienceOpen={setExperienceOpen}
        specialtyOptions={specialityRole}
        specialtyOpen={specialtyOpen}
        setSpecialtyOpen={setSpecialtyOpen}
      />

      <ContactEditModal
        visible={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
        formData={contactData}
        onFormChange={handleContactChange}
        onSubmit={handleContactSubmit}
      />
    </SafeAreaView>
  );
}
