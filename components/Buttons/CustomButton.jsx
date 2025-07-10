import {  Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ icon, title, onPress, variant = 'primary', className = '', textClassName = '' }) => {
  const baseButtonClasses = "m-2 w-full py-3 px-6 rounded-xl items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform active:scale-95";
  const baseTextClasses = "text-lg font-bold  border-gray-500";

  // --- Variant-specific classes ---
  const buttonVariantClasses = {
    primary: 'bg-primary focus:ring-blue-400',
    secondary: 'bg-white  border-gray-100 border-2 ',
  };

  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-primary',
  };

  return (
  <TouchableOpacity
    onPress={onPress}
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
