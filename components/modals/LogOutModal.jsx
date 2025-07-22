import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LogoutModal = ({ visible, onClose, onConfirmLogout }) => {
  const handleLogout = () => {
    onClose();
    
    if (onConfirmLogout) {
      onConfirmLogout();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-6 mx-8 w-full max-w-sm">
          {/* Header */}
          <View className="items-center mb-4">
            <View className="bg-red-100 p-3 rounded-full mb-3">
              <MaterialIcons name="logout" size={32} color="#ef4444" />
            </View>
            <Text className="text-xl font-semibold text-gray-800">
              Log Out
            </Text>
          </View>

          {/* Message */}
          <Text className="text-gray-600 text-center mb-6 text-base leading-6">
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-100 py-3 px-4 rounded-lg"
            >
              <Text className="text-gray-700 font-semibold text-center text-base">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              className="flex-1 bg-red-500 py-3 px-4 rounded-lg"
            >
              <Text className="text-white font-semibold text-center text-base">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;