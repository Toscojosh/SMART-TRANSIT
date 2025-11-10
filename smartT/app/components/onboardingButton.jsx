import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function OnboardingButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FF6900", // bright orange color
        paddingVertical: 10,
        width: 156,
        height: 44,
        paddingHorizontal: 20,
        borderRadius: 42997076,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 50,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        Get Started
      </Text>
    </TouchableOpacity>
  );
}