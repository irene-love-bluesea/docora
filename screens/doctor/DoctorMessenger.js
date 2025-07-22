import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  Alert,
  Keyboard,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height: screenHeight } = Dimensions.get('window');

// Sample data for demonstration
const initialMessages = [
  {
    id: "1",
    text: "Hey there! How are you doing?",
    sender: "other",
    timestamp: new Date(Date.now() - 3600000),
    avatar: require("../../assets/profile/patient_f.png"),
  },
  {
    id: "2",
    text: "I'm doing great! Just working on a new React Native app.",
    sender: "me",
    timestamp: new Date(Date.now() - 3500000),
    avatar: require("../../assets/profile/profile_m.png"),
  },
  {
    id: "3",
    text: "That sounds awesome! What kind of app are you building?",
    sender: "other",
    timestamp: new Date(Date.now() - 3400000),
    avatar: require("../../assets/profile/patient_f.png"),
  },
  {
    id: "4",
    text: "It's a chat application with a clean UI using NativeWind for styling.",
    sender: "me",
    timestamp: new Date(Date.now() - 3300000),
    avatar: require("../../assets/profile/profile_m.png"),
  },
];

const DoctorMessenger = ({ navigation, route }) => {
  const {name,image} = route.params;

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef(null);
  const textInputRef = useRef(null);
  const insets = useSafeAreaInsets();

  // Handle keyboard events
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Scroll to bottom when keyboard shows
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "me",
      timestamp: new Date(),
      avatar: require("../../assets/profile/profile_m.png"),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! This is a simulated response.",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  const MessageBubble = ({ item }) => {
    const isMe = item.sender === "me";
    
    return (
      <View
        className={`flex-row mb-4 ${isMe ? "justify-end" : "justify-start"}`}
      >
        {!isMe && (
          <View className=" mr-3 items-center justify-center">
            <Image
              source={image}
              className="w-[40px] h-[40px] rounded-full border border-gray-400"
            />
          </View>
        )}

        <View className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
          <View
            className={`px-4 py-3 rounded-2xl ${
              isMe ? "bg-primary rounded-br-md" : "bg-white rounded-bl-md"
            }`}
          >
            <Text
              className={`text-base ${isMe ? "text-white" : "text-gray-800"}`}
            >
              {item.text}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 mt-1 px-2">
            {formatTime(item.timestamp)}
          </Text>
        </View>

        {isMe && (
          <View className="ml-3 items-center justify-center">
            <Image
              source={item.avatar}
              className="w-[40px] h-[40px] rounded-full border border-gray-400"
            />
          </View>
        )}
      </View>
    );
  };

  const TypingIndicator = () => (
    <View className="flex-row justify-start mb-16">
      <View className=" mr-3 items-center justify-center">
         <Image
            className="w-[40px] h-[40px] border border-gray-600 rounded-full"
            source={image}
          />
      </View>
      <View className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-md">
        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-gray-400 rounded-full mx-1 animate-pulse" />
          <View className="w-2 h-2 bg-gray-400 rounded-full mx-1 animate-pulse" />
          <View className="w-2 h-2 bg-gray-400 rounded-full mx-1 animate-pulse" />
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="bg-blue-200 px-4 py-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity
          className="mr-4"
          onPress={() =>
            navigation.navigate("BottomTabs", { userType: "doctor" })
          }
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className=" mr-3 items-center justify-center">
          <Image
            className="w-[40px] h-[40px] border border-gray-600 rounded-full"
            source={image}
          />
        </View>

        <View className="flex-1">
          <Text className="text-black text-lg font-semibold">
            {name}
          </Text>
          <Text className="text-black/80 text-sm">Online</Text>
        </View>

        <TouchableOpacity className="mr-5">
          <Ionicons name="videocam" size={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="call" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View 
        className="flex-1"
        style={{ 
          marginBottom: keyboardHeight > 0 ? keyboardHeight + 85 : 85 
        }}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={MessageBubble}
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
          contentContainerStyle={{
            paddingBottom: 20,
            flexGrow: 1,
          }}
          onContentSizeChange={() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
          keyboardShouldPersistTaps="handled"
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10
          }}
        />
      </View>
      {/* Input Area */}
      <View
        className="flex-row items-center px-4 py-3 bg-gray-50 border-t border-gray-200"
        style={{ 
          paddingBottom: Math.max(insets.bottom, 12),
          position: 'absolute',
          bottom: keyboardHeight > 0 ? keyboardHeight : 0,
          left: 0,
          right: 0,
        }}
      >
        <TouchableOpacity
          className="mr-3 p-2"
          onPress={() => Alert.alert("Feature", "Attach file functionality")}
        >
          <Ionicons name="add" size={24} color="#6B7280" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-200">
          <TextInput
            ref={textInputRef}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            className="flex-1 text-base max-h-24"
            multiline
            maxLength={1000}
            onSubmitEditing={Platform.OS === 'ios' ? sendMessage : undefined}
            returnKeyType={Platform.OS === 'ios' ? "send" : "default"}
            blurOnSubmit={false}
            textAlignVertical="center"
            style={{
              minHeight: 40,
              maxHeight: 100,
            }}
          />

          <TouchableOpacity
            className="ml-2 p-1"
            onPress={() =>
              Alert.alert("Feature", "Emoji picker functionality")
            }
          >
            <Ionicons name="happy-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={sendMessage}
          className={`ml-3 w-12 h-12 rounded-full items-center justify-center ${
            inputText.trim() ? "bg-primary" : "bg-gray-300"
          }`}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? "white" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorMessenger;