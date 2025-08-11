import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileEditModal from "../../components/modals/ProfileEditModal";
import ContactEditModal from "../../components/modals/ContactEditModal";
import MedicalEditModal from "../../components/modals/MedicalEditModal";
import EmergencyContactModal from "../../components/modals/EmergencyContactModal";
import {
  ProfileEditCard,
  SettingCard,
} from "../../components/Card/ProfileEditCard";
import {
  gender,
  bloodType,
  allergy,
  chronical,
} from "./../../constant/data/patientDetails";
import LogoutModal from "../../components/modals/LogOutModal";
import { useFetchUser } from "../../api/hooks/usePatientData";
import { useAuth } from "../../components/Providers/AuthProvider";

// Medical info configuration for reusable rendering
const getMedicalInfoConfig = (medicalData) => [
  {
    id: "bloodType",
    title: "Blood Type",
    icon: { name: "water", library: "MaterialCommunityIcons", color: "red" },
    bgColor: "bg-red-100",
    value: medicalData.bloodType || "Not specified",
  },
  {
    id: "allergies",
    title: "Allergies",
    icon: {
      name: "exclamation-triangle",
      library: "FontAwesome5",
      color: "orange",
    },
    bgColor: "bg-orange-100",
    value:
      medicalData.allergies && medicalData.allergies.length > 0
        ? medicalData.allergies.join(", ")
        : "None",
  },
  {
    id: "chronic",
    title: "Chronic Conditions",
    icon: { name: "heartbeat", library: "FontAwesome5", color: "green" },
    bgColor: "bg-green-100",
    value:
      medicalData.chronic && medicalData.chronic.length > 0
        ? medicalData.chronic.join(", ")
        : "None",
  },
  {
    id: "medications",
    title: "Current Medications",
    icon: { name: "pills", library: "FontAwesome5", color: "blue" },
    bgColor: "bg-blue-100",
    value: medicalData.medications || "None",
  },
];

// Contact info configuration
const getContactInfoConfig = (contactData) => [
  {
    id: "email",
    title: "Email",
    icon: { name: "mail", library: "Ionicons", color: "#023E8A" },
    bgColor: "bg-secondary",
    value: contactData.email,
  },
  {
    id: "phone",
    title: "Phone",
    icon: {
      name: "phone",
      library: "MaterialCommunityIcons",
      color: "#023E8A",
    },
    bgColor: "bg-secondary",
    value: contactData.phone,
  },
  {
    id: "address",
    title: "Address",
    icon: { name: "home", library: "MaterialCommunityIcons", color: "#023E8A" },
    bgColor: "bg-secondary",
    value: contactData.address,
  },
];

// Emergency contact configuration
const getEmergencyContactConfig = (emergencyData) => [
  {
    id: "name",
    title: "Name",
    icon: { name: "person", library: "Ionicons", color: "black" },
    bgColor: "bg-secondary",
    value: emergencyData.name,
  },
  {
    id: "phone",
    title: "Phone",
    icon: { name: "phone", library: "MaterialCommunityIcons", color: "black" },
    bgColor: "bg-secondary",
    value: emergencyData.phone,
  },
];

// Reusable Info Row Component
const InfoRow = ({ item }) => {
  const IconComponent =
    item.icon.library === "MaterialCommunityIcons"
      ? MaterialCommunityIcons
      : item.icon.library === "FontAwesome5"
      ? FontAwesome5
      : Ionicons;

  return (
    <View className="flex-row gap-4 px-3 my-2 items-center">
      <View className={`${item.bgColor || "bg-gray-100"} p-2 rounded-full`}>
        <IconComponent
          name={item.icon.name}
          size={24}
          color={item.icon.color}
        />
      </View>
      <View>
        <Text className="text-lg font-semibold">{item.title}</Text>
        <Text className="text-lg font-normal">{item.value}</Text>
      </View>
    </View>
  );
};

// Reusable Info Section Component
const InfoSection = ({ title, config, onEdit }) => (
  <ProfileEditCard title={title} onEdit={onEdit}>
    {config.map((item) => (
      <InfoRow key={item.id} item={item} />
    ))}
  </ProfileEditCard>
);

export default function PatientOwnProfile({ navigation, session }) {
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  // Modal states
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);
  const [medicalModalVisible, setMedicalModalVisible] = React.useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);
  const [emergencyModalVisible, setEmergencyModalVisible] =
    React.useState(false);

  const { session: auth } = useAuth();
  const { data: user, isLoading, isError, error } = useFetchUser(auth);

  // Form states
  const [profileData, setProfileData] = React.useState({
    name: user?.data?.name,
    age: user?.data?.age,
    gender: user?.data?.gender,
  });

  const [contactData, setContactData] = React.useState({
    email: "sarahjames@gmail.com",
    phone: "+1 555 123-4567",
    address: "123 Maple Street, Anytown, USA",
  });

  const [medicalData, setMedicalData] = React.useState({
    bloodType: "O",
    allergies: ["Aspirin", "Penicillin"],
    chronic: "",
    medications: "",
  });

  const [emergencyData, setEmergencyData] = React.useState({
    name: "Harrington James",
    phone: "+1 888 103-8035",
  });

  const [genderOpen, setGenderOpen] = React.useState(false);
  const [bloodTypeOpen, setBloodTypeOpen] = React.useState(false);
  const [allergyOpen, setAllergyOpen] = React.useState(false);
  const [chronicOpen, setChronicOpen] = React.useState(false);
  const [birthOpen, setBirthOpen] = React.useState(false);

  const handleLogout = () => {
    console.log("User logged out");
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

  // Form handlers
  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicalChange = (field, value) => {
    setMedicalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmergencyChange = (field, value) => {
    setEmergencyData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit handlers
  const handleProfileSubmit = () => {
    setProfileModalVisible(false);
  };

  const handleContactSubmit = () => {
    setContactModalVisible(false);
  };

  const handleMedicalSubmit = () => {
    setMedicalModalVisible(false);
  };

  const handleEmergencySubmit = () => {
    setEmergencyModalVisible(false);
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }} className="bg-background">
      <Text className="text-2xl font-semibold font-alata mt-6 mb-2 mx-5">
        Profile
      </Text>
      <ScrollView
        className="bg-background mb-14"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start items-center px-5 pt-4 bg-background pb-5">
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
                        : require("../../assets/profile/patient_f.png")
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
              <View className="flex items-start">
                <Text className="text-2xl text-center font-medium">
                  {profileData.name}
                </Text>
                <Text className="text-lg text-gray-500 font-medium">
                  {profileData.age} years old, {profileData.gender}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
              <MaterialIcons name="edit" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* Contact Information */}
          <InfoSection
            title="Contact Information"
            config={getContactInfoConfig(contactData)}
            onEdit={() => setContactModalVisible(true)}
          />

          {/* Medical Information */}
          <InfoSection
            title="Medical Information"
            config={getMedicalInfoConfig(medicalData)}
            onEdit={() => setMedicalModalVisible(true)}
          />

          {/* Emergency Contact */}
          <InfoSection
            title="Emergency Contact"
            config={getEmergencyContactConfig(emergencyData)}
            onEdit={() => setEmergencyModalVisible(true)}
          />

          <SettingCard onLogoutPress={() => setLogoutModalVisible(true)} />
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
        userType="patient"
      />

      <ContactEditModal
        visible={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
        formData={contactData}
        onFormChange={handleContactChange}
        onSubmit={handleContactSubmit}
      />

      <MedicalEditModal
        visible={medicalModalVisible}
        onClose={() => setMedicalModalVisible(false)}
        formData={medicalData}
        onFormChange={handleMedicalChange}
        onSubmit={handleMedicalSubmit}
        bloodTypeOptions={bloodType}
        bloodTypeOpen={bloodTypeOpen}
        setBloodTypeOpen={setBloodTypeOpen}
        allergyOptions={allergy}
        allergyOpen={allergyOpen}
        setAllergyOpen={setAllergyOpen}
        chronicOptions={chronical}
        chronicOpen={chronicOpen}
        setChronicOpen={setChronicOpen}
      />

      <EmergencyContactModal
        visible={emergencyModalVisible}
        onClose={() => setEmergencyModalVisible(false)}
        formData={emergencyData}
        onFormChange={handleEmergencyChange}
        onSubmit={handleEmergencySubmit}
      />
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirmLogout={handleLogout}
      />
    </View>
  );
}
