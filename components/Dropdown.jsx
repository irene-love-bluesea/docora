import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function Dropdown({data , value , setValue ,mode,multiple=false, placeholder , zIndex , open, setOpen, onOpen}) {
  const [items, setItems] = useState(data);

  const handleSetOpen = (openState) => {
    if (openState && onOpen) {
      onOpen(); 
    }
    setOpen(openState);
  }

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={value}
      items={items}
      setOpen={handleSetOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      mode={mode}
      multiple={multiple}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
      textStyle={styles.dropdownText}
      placeholderStyle={styles.placeholder}
      listItemContainerStyle={styles.listItemContainer}
      listItemLabelStyle={styles.listItemLabel}
      selectedItemContainerStyle={styles.selectedItemContainer}
      selectedItemLabelStyle={styles.selectedItemLabel}
      arrowIconStyle={styles.arrowIcon}
      tickIconStyle={styles.tickIcon}
      zIndex={zIndex}
      zIndexInverse={3000}
      badgeColors="#E6F2FF"
      badgeDotColors={["#1bdb0d", "#00b4d8", "#ed4a18", "#4a4a48", "#8ac926", "#1648de", "#e9c46a"]}
    />
  );
}

const styles = StyleSheet.create({
  // Main dropdown button styling
  dropdown: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 55,
  },

  // Dropdown container (the list that appears)
  dropdownContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "white",
    maxHeight: 300,
    marginTop: 2,
  },

  // Selected text styling
  dropdownText: {
    fontSize: 16,
    color: "black",
    fontWeight: "400",
  },

  // Placeholder text styling
  placeholder: {
    fontSize: 16,
    color: "#999",
    fontWeight: "400",
  },

  // Individual list item container
  listItemContainer: {
    paddingHorizontal: 10,
    // borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },

  // Individual list item text
  listItemLabel: {
    fontSize: 16,
    color: "black",
    fontWeight: "400",
  },

  // Selected item container (highlighted)
  selectedItemContainer: {
    backgroundColor: "#f0f0f0",
  },

  // Selected item text
  selectedItemLabel: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },

  // Arrow icon styling
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#666",
  },

  // Tick icon styling (for selected items)
  tickIcon: {
    width: 20,
    height: 20,
    tintColor: "#007AFF",
  },
});
