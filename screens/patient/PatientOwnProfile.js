import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../components/Buttons/CustomButton";

export default function PatientOwnProfile() {
  const [profilePhoto, setProfilePhoto] = React.useState(null);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);
  const [email, setEmail] = React.useState("sarahjames@gmail.com");
  const [phone, setPhone] = React.useState("+1 555 123-4567");
  const [address, setAddress] = React.useState(
    "123 Maple Street, Anytown, USA"
  );
  const [medicalModalVisible, setMedicalModalVisible] = React.useState(false);
  const [bloodType, setBloodType] = React.useState("O");
  const [allergy, setAllergy] = React.useState(["Asprin", "Penecillin"]);
  const [chronic, setChronic] = React.useState([]);
  const [medication, setMedication] = React.useState([]);

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to select a profile photo."
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];

      // Check file size (5MB limit)
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
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera permissions to take a photo."
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];

      // Check file size (5MB limit)
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
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <Text className="text-2xl font-bold mt-6 mb-2 mx-5">Profile</Text>
      <ScrollView
        className="bg-background"
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start items-center px-5 pt-4 bg-background pb-5">
          <View
            className="w-full p-3 rounded-lg bg-background flex-row justify-between items-center mb-2"
            style={{ elevation: 2 }}
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
                  Sarah James
                </Text>

                <Text className="text-lg text-gray-500 font-medium">
                  28 years old, Female
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <MaterialIcons name="edit" size={28} color="black" />
            </TouchableOpacity>
          </View>
          {/* Profile Card End */}

          <View
            className="mt-3 bg-background rounded-lg"
            style={{ elevation: 2 }}
          >
            <View className="p-3 w-full flex-row justify-between rounded--t-lg bg-blue-200">
              <Text className="text-xl font-semibold">Contact Information</Text>
              <TouchableOpacity onPress={() => setContactModalVisible(true)}>
                <MaterialIcons name="edit" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Email</Text>
              <Text className="text-lg font-normal">{email}</Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Phone</Text>
              <Text className="text-lg font-normal">{phone}</Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Address</Text>
              <Text className="text-lg font-normal">{address}</Text>
            </View>
          </View>

          {/* Contact Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={contactModalVisible}
            onRequestClose={() => {
              setContactModalVisible(!contactModalVisible);
            }}
          >
            <TouchableOpacity
              className="flex-1 items-center justify-center "
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              activeOpacity={1}
              onPress={() => setContactModalVisible(!contactModalVisible)}
            >
              <TouchableOpacity
                className="bg-white p-3 w-[80%] border border-gray-300 rounded-xl"
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View className="flex items-center justify-center">
                  <View className="flex-row w-full justify-between items-center mb-2">
                    <Text className="text-xl font-semibold mb-2">
                      Edit Contact Information
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setContactModalVisible(!contactModalVisible)
                      }
                    >
                      <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                  </View>

                  <View className="mb-2 px-2 w-full">
                    <Text className="text-lg font-medium mb-2">Email</Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={email}
                      placeholderTextColor="#999"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setEmail}
                    />
                  </View>

                  <View className="mb-2 px-2 w-full">
                    <Text className="text-lg font-medium mb-2">Phone</Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={phone}
                      placeholderTextColor="#999"
                      keyboardType="number-pad"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setPhone}
                    />
                  </View>

                  <View className="px-2 w-full mb-2">
                    <Text className="text-lg font-medium mb-2">Address</Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={address}
                      placeholderTextColor="#999"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setAddress}
                    />
                  </View>
                  <CustomButton
                    title="Confirm"
                    width="w-[60%]"
                    variant="green"
                    onPress={() => setContactModalVisible(!contactModalVisible)}
                  />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
          {/* Contact Modal End*/}

          <View
            className="mt-3 bg-background rounded-lg"
            style={{ elevation: 2 }}
          >
            <View className="p-3 w-full flex-row justify-between rounded-ts-lg bg-blue-200">
              <Text className="text-xl font-semibold">Medical Information</Text>
              <TouchableOpacity onPress={() => setMedicalModalVisible(true)}>
                <MaterialIcons name="edit" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Blood Type</Text>
              <Text className="text-lg font-normal">{bloodType}</Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Allergies</Text>
              <Text className="text-lg font-normal">{allergy.join(", ")}</Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Chronic Conditions</Text>
              <Text className="text-lg font-normal">
                {chronic.length > 0 ? chronic.join(", ") : "None"}
              </Text>
            </View>
            <View className="px-3 my-2">
              <Text className="text-lg font-semibold">Current Medications</Text>
              <Text className="text-lg font-normal">
                {medication.length > 0 ? medication.join(", ") : "None"}
              </Text>
            </View>
          </View>

          {/* Meical Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={medicalModalVisible}
            onRequestClose={() => {
              setMedicalModalVisible(!medicalModalVisible);
            }}
          >
            <TouchableOpacity
              className="flex-1 items-center justify-center "
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              activeOpacity={1}
              onPress={() => setMedicalModalVisible(!medicalModalVisible)}
            >
              <TouchableOpacity
                className="bg-white p-3 w-[80%] border border-gray-300 rounded-xl"
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View className="flex items-center justify-center">
                  <View className="flex-row w-full justify-between items-center mb-2">
                    <Text className="text-xl font-semibold mb-2">
                      Edit Medical Information
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setMedicalModalVisible(!medicalModalVisible)
                      }
                    >
                      <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                  </View>

                  <View className="mb-2 px-2 w-full">
                    <Text className="text-lg font-medium mb-2">BloodType</Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={bloodType}
                      placeholderTextColor="#999"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setBloodType}
                    />
                  </View>

                  <View className="mb-2 px-2 w-full">
                    <Text className="text-lg font-medium mb-2">Allergies</Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={allergy.join(", ")}
                      placeholderTextColor="#999"
                      keyboardType="number-pad"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setAllergy}
                    />
                  </View>

                  <View className="px-2 w-full mb-2">
                    <Text className="text-lg font-medium mb-2">
                      Chronic Conditions
                    </Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={
                        chronic.length > 0 ? chronic.join(", ") : "None"
                      }
                      placeholderTextColor="#999"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setChronic}
                    />
                  </View>

                  <View className="px-2 w-full mb-2">
                    <Text className="text-lg font-medium mb-2">
                      Current Medication
                    </Text>
                    <TextInput
                      className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                      placeholder={
                        medication.length > 0 ? medication.join(", ") : "None"
                      }
                      placeholderTextColor="#999"
                      textAlignVertical="top"
                      value={null}
                      style={{
                        textAlign: "left",
                      }}
                      onChangeText={setMedication}
                    />
                  </View>

                  <CustomButton
                    title="Confirm"
                    width="w-[60%]"
                    variant="green"
                    onPress={() => setMedicalModalVisible(!medicalModalVisible)}
                  />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
          {/* Medical Modal End*/}



          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
