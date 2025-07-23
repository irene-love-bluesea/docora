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
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
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
import LogoutModal from "../../components/modals/LogOutModal";

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

//Professional Info configuration
const getProfessionalInfoConfig = (professionalData) => [
  {
    id: "exp",
    title: "Year of Experience",
    icon: { name: "user-doctor", library: "FontAwesome6", color: "orange" },
    bgColor: "bg-orange-100",
    value: professionalData.experience + " Years",
  },
  {
    id: "special",
    title: "Medical Specialty",
    icon: { name: "book-medical", library: "FontAwesome5", color: "red" },
    bgColor: "bg-red-100",
    value: professionalData.specialty,
  },
  {
    id: "work",
    title: "Current Work Place",
    icon: { name: "work", library: "MaterialIcons", color: "blue" },
    bgColor: "bg-blue-100",
    value: professionalData.workPlace,
  },
  {
    id: "graduate",
    title: "Graduated From",
    icon: { name: "school", library: "Ionicons", color: "green" },
    bgColor: "bg-green-100",
    value: professionalData.graduated,
  },
];

// Reusable Info Row Component
const InfoRow = ({ item }) => {
  const IconComponent =
    item.icon.library === "MaterialCommunityIcons"
      ? MaterialCommunityIcons
      : item.icon.library === "FontAwesome5"
      ? FontAwesome5
      : item.icon.library === "FontAwesome6"
      ? FontAwesome6
      : item.icon.library === "MaterialIcons"
      ? MaterialIcons
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

export default function DoctorOwnProfile({ navigation }) {
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  // Modal states
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);
  const [professionalModalVisible, setProfessionalModalVisible] =
    React.useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);

  // Form states
  const [profileData, setProfileData] = React.useState({
    name: "Ethan Carter",
  });

  const [contactData, setContactData] = React.useState({
    email: "ethancarter@gmail.com",
    phone: "+1 222 123-4567",
    address: "123 Maple Street, Anytown, USA",
  });

  const [professionalData, setProfessionalData] = React.useState({
    experience: "1-3",
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

  const insets = useSafeAreaInsets();

  return (
    <View className="bg-background">
      <Text className="text-2xl font-semibold font-alata mt-6 mb-2 mx-5">
        Profile
      </Text>

      <ScrollView
        className="bg-background mb-14"
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
          <InfoSection
            title="Contact Information"
            config={getContactInfoConfig(contactData)}
            onEdit={() => setContactModalVisible(true)}
          />

          {/* Professional Information */}
          <InfoSection
            title="Professional Information"
            config={getProfessionalInfoConfig(professionalData)}
            onEdit={() => setProfessionalModalVisible(true)}
          />

          <SettingCard
            navigation={navigation}
            onLogoutPress={() => setLogoutModalVisible(true)}
          />
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
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirmLogout={handleLogout}
      />
    </View>
  );
}
