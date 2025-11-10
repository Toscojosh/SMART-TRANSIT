import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function BookNowButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FF6900", // bright orange color
        paddingVertical: 10,
        width: 106.69,
        height: 38.37,
        paddingHorizontal: 20,
        borderRadius: 8.53,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: "auto"
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 14.94,
          fontFamily: "medium",
          fontWeight: 500,
        }}
      >
        Book Now
      </Text>
    </TouchableOpacity>
  );
}