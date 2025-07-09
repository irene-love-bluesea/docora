import {  Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ icon, title, onPress, variant = 'primary', className = '', textClassName = '' }) => {
  const baseButtonClasses = "py-3 px-6 rounded-md items-center justify-center shadow-md active:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform active:scale-95";
  const baseTextClasses = "text-lg font-bold  border-gray-500";

  // --- Variant-specific classes ---
  const buttonVariantClasses = {
    primary: 'bg-primary focus:ring-blue-400',
    secondary: 'bg-white  border-gray-100 border-2  shadow-md',
  };

  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-primary',
  };

  return (
  <TouchableOpacity
    onPress={onPress}
    // Combine base, variant-specific, and custom classes
    className={`${baseButtonClasses} ${buttonVariantClasses[variant]} ${className}`}
    activeOpacity={0.8}
  >
    <Text className={`${baseTextClasses} ${textVariantClasses[variant]} ${textClassName}`}>
      {icon} {title}
    </Text>
  </TouchableOpacity>
  )
}

export default CustomButton
