import { Text, TouchableOpacity } from "react-native";

export default function SpecialitiesShowCard({ id, name, icon, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FilterBySpecialty", {
          specialty: name,
        });
      }}
      key={id}
      className="flex-col justify-center items-center gap-5 py-3 rounded-lg border border-secondary bg-white mt-1 flex-1 min-w-[140px] max-w-[48%]"
    >
      {icon}
      <Text className="text-lg font-semibold text-center">{name}</Text>
    </TouchableOpacity>
  );
}
