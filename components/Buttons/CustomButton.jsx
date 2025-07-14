import { View, Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ icon, title, onPress, disabled, width= 'w-full', variant = 'primary', className = '', textClassName = '' }) => {
  const baseButtonClasses = "my-2 py-3 px-6 rounded-xl items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform active:scale-95";
  const baseTextClasses = "text-lg font-bold  border-gray-500";

  // --- Variant-specific classes ---
  const buttonVariantClasses = {
    primary: 'bg-primary focus:ring-blue-400',
    secondary: 'bg-white  border-gray-100 border-2 ',
    green: 'bg-green-700 border-green-800',
  };

  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-primary',
    green: 'text-white'
  };

  return (
  <TouchableOpacity
    onPress={onPress} disabled={disabled}
    className={`${baseButtonClasses} ${className} ${width} ${disabled ? 'bg-gray-400' : buttonVariantClasses[variant]}`}
    activeOpacity={0.8}
  >
    <View className="flex-row items-center gap-3">
      {icon}
    <Text className={`${baseTextClasses} ${textVariantClasses[variant]} ${textClassName}`}>
       {title}
    </Text>
    </View>
    
  </TouchableOpacity>
  )
}

export default CustomButton
