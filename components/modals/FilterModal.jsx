import { Pressable, Text, View } from "react-native";
import BaseModal from "./BaseModal";
import CustomButton from "../Buttons/CustomButton";
import { useState } from "react";

export default function FilterModal({ visible, onClose, onSubmit }) {
  const [filterState, setfilterState] = useState({
    date: [],
    channelType: [],
  });

  const filterData = {
    date: [
      "Today",
      "Tomorrow",
      "This Week",
      "This Morning",
      "This Afternoon",
      "This Evening",
    ],
    channelType: ["All", "Chat", "Video Call", "Audio Call"],
  };

  const handleFilter = (value, type) => {
    const isSelected = filterState?.[type].some((item) => item === value);
    if (isSelected) {
      setfilterState((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== value),
      }));
    } else {
      setfilterState((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
    }
  };

  const handleClear = () => {
    setfilterState({ date: [], channelType: [] });
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };

  const handleFilterSubmit = () => {
    console.log("Filter applied:", filterState);
    
    onSubmit(filterState);
    handleClose();
  };

  return (
    <BaseModal
      className=""
      visible={visible}
      onClose={handleClose}
      title="Filter"
    >
      <View className="w-full px-3 py-3 flex-col gap-5">
        <View className="flex-col">
          <Text className="text-xl font-bold mb-2">Date</Text>
          <View className="flex-row gap-3 flex-wrap">
            {filterData?.date.map((item) => {
              const isSelected = filterState.date.includes(item);
              return (
                <Pressable
                  onPress={() => handleFilter(item, "date")}
                  key={item}
                  className={`py-2 px-3 rounded-2xl ${
                    isSelected ? "bg-primary" : "bg-white"
                  }`}
                >
                  <Text
                    className={`text-md font-medium ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="flex-col">
          <Text className="text-xl font-bold mb-2">Channel Type</Text>
          <View className="flex-row gap-3">
            {filterData?.channelType.map((item) => {
              const isSelected = filterState.channelType.includes(item);
              return (
                <Pressable
                  onPress={() => handleFilter(item, "channelType")}
                  key={item}
                  className={`py-2 px-3 rounded-2xl ${
                    isSelected ? "bg-primary" : "bg-white"
                  }`}
                >
                  <Text
                    className={`text-md font-medium ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="flex-row w-full justify-between items-center">
          <CustomButton
            title="Clear Filters"
            onPress={handleClear}
            variant="secondary"
            className="bg-secondary text-primary px-4 py-2 rounded-lg border border-secondary !w-[48%]"
            textClassName="text-primary"
          />
          <CustomButton
            title="Apply Filters"
            onPress={handleFilterSubmit}
            className="!w-[48%]"
          />
        </View>
      </View>
    </BaseModal>
  );
}
