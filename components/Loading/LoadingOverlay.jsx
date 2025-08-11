import { ActivityIndicator, Text, View } from "react-native";

const LoadingOverlay = ({ message, progress }) => (
    <View className="absolute inset-0 bg-black/20 rounded-xl flex-row items-center justify-center">
      <View className="bg-white rounded-xl p-4 flex-row items-center gap-3 shadow-lg">
        <ActivityIndicator size="small" color="#007AFF" />
        <View>
          <Text className="text-gray-700 font-medium">{message}</Text>
          {progress > 0 && (
            <View className="mt-1">
              <View className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </View>
              <Text className="text-xs text-gray-500 mt-1">{progress}%</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  export default LoadingOverlay;