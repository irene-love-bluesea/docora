import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    useSafeAreaInsets
} from "react-native-safe-area-context";
import {
    useFetchDoctor,
    useUpdateDoctorProfile,
} from "../../api/hooks/useDoctorData";
import {
    ProfileEditCard,
    SettingCard,
} from "../../components/Card/ProfileEditCard";
import ContactEditModal from "../../components/modals/ContactEditModal";
import LogoutModal from "../../components/modals/LogOutModal";
import ProfessionalModal from "../../components/modals/ProfessionalModal";
import ProfileEditModal from "../../components/modals/ProfileEditModal";
import { useAuth } from "../../components/Providers/AuthProvider";
import {
    experienceYears,
    specialtyRole,
} from "../../constant/data/doctorDetails";
import { gender } from "./../../constant/data/patientDetails";

// Contact info configuration
const getContactInfoConfig = (contactData) => [
  {
    id: "email",
    title: "Email",
    icon: { name: "mail", library: "Ionicons", color: "#023E8A" },
    bgColor: "bg-secondary",
    value: contactData.email || "Not specified",
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
    value: contactData.phone || "Not specified",
  },
  {
    id: "address",
    title: "Address",
    icon: { name: "home", library: "MaterialCommunityIcons", color: "#023E8A" },
    bgColor: "bg-secondary",
    value: contactData.address || "Not specified",
  },
];

//Professional Info configuration
const getProfessionalInfoConfig = (professionalData) => [
  {
    id: "exp",
    title: "Year of Experience",
    icon: { name: "user-doctor", library: "FontAwesome6", color: "orange" },
    bgColor: "bg-orange-100",
    value: professionalData.experience
      ? `${professionalData.experience} Years`
      : "Not specified",
  },
  {
    id: "special",
    title: "Medical Specialty",
    icon: { name: "book-medical", library: "FontAwesome5", color: "red" },
    bgColor: "bg-red-100",
    value: professionalData.specialty || "Not specified",
  },
  {
    id: "work",
    title: "Current Work Place",
    icon: { name: "work", library: "MaterialIcons", color: "blue" },
    bgColor: "bg-blue-100",
    value: professionalData.workPlace || "Not specified",
  },
  {
    id: "graduate",
    title: "Graduated From",
    icon: { name: "school", library: "Ionicons", color: "green" },
    bgColor: "bg-green-100",
    value: professionalData.graduated || "Not specified",
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

export default function DoctorOwnProfile({ navigation, session }) {
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  // Modal states
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);
  const [professionalModalVisible, setProfessionalModalVisible] =
    React.useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);

  const { session: auth, logout } = useAuth();
  const { data: doctor, isLoading, isError, error } = useFetchDoctor(auth);
  const {
    mutate: updateProfile,
    mutateAsync: updateProfileAsync,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateDoctorProfile();

  // Form states - Initialize with empty values first
  const [profileData, setProfileData] = React.useState({
    name: "",
    age: "",
    gender: "",
  });

  const [contactData, setContactData] = React.useState({
    email: "",
    phone: "",
    address: "",
  });

  const [professionalData, setProfessionalData] = React.useState({
    experience: "",
    specialty: "",
    workPlace: "",
    graduated: "",
  });

  // Update states when doctor data is loaded
  React.useEffect(() => {
    if (doctor?.data) {
      const doctorData = doctor.data;

      setProfileData({
        name: doctorData.name || "",
        age: doctorData.age || "",
        gender: doctorData.gender || "",
      });

      setContactData({
        email: doctorData.email || "",
        phone: doctorData.phoneNumber || "",
        address: doctorData.address || "",
      });

      setProfessionalData({
        experience: doctorData.yearOfExp || "",
        specialty: doctorData.specialty || "",
        workPlace: doctorData.workPlace || doctorData.currentWorkPlace || "",
        graduated: doctorData.graduateSchool || doctorData.education || "",
      });

      // Set profile photo if available
      if (doctorData.profileUrl) {
        setProfilePhoto({ uri: doctorData.profileUrl });
      }
    }
  }, [doctor?.data]);

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

  // Submit handlers - Updated to actually call API
  const handleProfileSubmit = (modalData = null) => {
    // Use modalData if provided (from modal), otherwise use current profileData
    const currentData = modalData || profileData;

    // Prepare update payload - use exact field names that backend expects
    const updatePayload = {
      name: currentData.name,
      gender: currentData.gender,
      profile_url: profilePhoto?.uri || undefined,
    };

    // Only include dateOfBirth and age if birthday is actually provided
    if (currentData.birthday) {
      // Calculate age from birthday
      const today = new Date();
      const birthDate = new Date(currentData.birthday);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      updatePayload.dateOfBirth = new Date(currentData.birthday).toISOString();
      updatePayload.age = calculatedAge;
    }

    Object.keys(updatePayload).forEach(
      (key) => updatePayload[key] === undefined && delete updatePayload[key]
    );

    // console.log("Doctor Profile Update Payload:", updatePayload); 

    updateProfile(updatePayload, {
      onSuccess: (data) => {
        setProfileModalVisible(false);
        Alert.alert("Success", "Profile updated successfully!");

        if (data?.data) {
          const doctorData = data.data;
          setProfileData({
            name: doctorData.name || currentData.name,
            age: doctorData.age || currentData.age,
            gender: doctorData.gender || currentData.gender,
            birthday: doctorData.dateOfBirth || currentData.birthday,
          });
        }
      },
      onError: (error) => {
        console.error("Doctor profile update error:", error);
        Alert.alert("Error", "Failed to update profile. Please try again.");
      },
    });
  };

  const handleContactSubmit = (modalData = null) => {
    const currentData = modalData || contactData;

    const updatePayload = {
      email: currentData.email || undefined,
      phone: currentData.phone || undefined,
      address: currentData.address || undefined,
    };

    Object.keys(updatePayload).forEach(
      (key) =>
        (!updatePayload[key] || updatePayload[key].trim() === "") &&
        delete updatePayload[key]
    );

    // console.log("Doctor Contact Update Payload:", updatePayload);

    updateProfile(updatePayload, {
      onSuccess: (data) => {
        setContactModalVisible(false);
        Alert.alert("Success", "Contact information updated successfully!");

        if (data?.data) {
          const doctorData = data.data;
          setContactData({
            email: doctorData.email || currentData.email,
            phone:
              doctorData.phoneNumber || doctorData.phone || currentData.phone,
            address: doctorData.address || currentData.address,
          });
        }
      },
      onError: (error) => {
        console.error("Doctor contact update error:", error);
        Alert.alert(
          "Error",
          "Failed to update contact information. Please try again."
        );
      },
    });
  };

  const handleProfessionalSubmit = (modalData = null) => {
    const currentData = modalData || professionalData;

    const updatePayload = {
      yearOfExperience: currentData.experience || undefined,
      specialty: currentData.specialty || undefined,
      workPlace: currentData.workPlace || undefined,
      graduateSchool: currentData.graduated || undefined,
    };

    // Remove empty/undefined fields
    Object.keys(updatePayload).forEach(
      (key) =>
        (!updatePayload[key] || updatePayload[key].trim() === "") &&
        delete updatePayload[key]
    );

    // console.log("Doctor Professional Update Payload:", updatePayload);

    updateProfile(updatePayload, {
      onSuccess: (data) => {
        setProfessionalModalVisible(false);
        Alert.alert(
          "Success",
          "Professional information updated successfully!"
        );

        if (data?.data) {
          const doctorData = data.data;
          setProfessionalData({
            experience: doctorData.yearOfExp || currentData.experience,
            specialty: doctorData.specialty || currentData.specialty,
            workPlace:
              doctorData.workPlace ||
              doctorData.currentWorkPlace ||
              currentData.workPlace,
            graduated:
              doctorData.graduateSchool ||
              doctorData.education ||
              currentData.graduated,
          });
        }
      },
      onError: (error) => {
        console.error("Doctor professional update error:", error);
        Alert.alert(
          "Error",
          "Failed to update professional information. Please try again."
        );
      },
    });
  };

  const handleLogout = async () => {
    await logout();
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

  if (isLoading) {
    return (
      <View
        style={{ paddingTop: insets.top }}
        className="bg-background flex-1 justify-center items-center"
      >
        <Text className="text-lg">Loading profile...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{ paddingTop: insets.top }}
        className="bg-background flex-1 justify-center items-center"
      >
        <Text className="text-lg text-red-500">
          Error loading profile: {error?.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: insets.top }} className="bg-background">
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
                  Dr. {profileData.name || "Loading..."}
                </Text>
                {profileData.age && profileData.gender && (
                  <Text className="text-lg text-gray-500 font-medium">
                    {profileData.age} years old, {profileData.gender}
                  </Text>
                )}
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
        userType="doctor"
        isLoading={isUpdating}
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
        specialtyOptions={specialtyRole}
        specialtyOpen={specialtyOpen}
        setSpecialtyOpen={setSpecialtyOpen}
        isLoading={isUpdating}
      />

      <ContactEditModal
        visible={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
        formData={contactData}
        onFormChange={handleContactChange}
        onSubmit={handleContactSubmit}
        isLoading={isUpdating}
      />

      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirmLogout={handleLogout}
      />
    </View>
  );
}
