import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const privacyPolicyText = `
Welcome to our application. We take your privacy seriously and are committed to protecting your personal information. This privacy policy describes how we collect, use, and share information about you when you use our app.
`;

const sections = [
    {
        title: "Information Collection and Use",
        content: "We collect information that you provide directly to us, such as when you create an account, update your profile, or communicate with us. We may also collect information about your use of the app, including your interactions with the app and your preferences."
    },
    {
        title: "Types of Data Collected",
        content: "We may collect personal data, such as your name, email address, and phone number, as well as non-personal data, such as log data and device information."
    },
    {
        title: "Data Sharing and Disclosure",
        content: "We do not share your personal information with third parties except as necessary to provide the app services, comply with the law, or protect the rights and safety of our users."
    },
    {
        title: "Security",
        content: "We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure."
    },
    {
        title: "Changes to This Policy",
        content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page."
    },
    {
        title: "Contact us",
        content: "If you have any questions or concerns about this privacy policy, please contact us at docora@gmail.com"
    }
]
const Section = ({ title, children }) => (
  <View className="mb-5">
    <Text className="text-xl font-semibold text-gray-700 mb-2">{title}</Text>
    <Text className="text-base leading-6 text-gray-600 text-justify">
      {children}
    </Text>
  </View>
);

export default function PrivacyPolicy() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 20 }}>
      <Text className="text-lg leading-6 text-gray-600 text-justify">
        {privacyPolicyText}
      </Text>

      {sections?.map((section, index) => (
        <Section key={index} title={section.title}>
          {section.content}
        </Section>
      ))}
    </ScrollView>
  );
}
