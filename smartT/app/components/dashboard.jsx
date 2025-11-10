// app/components/AppHeader.jsx
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function AppHeader({
  title = "SmartTransit",
  showProfile = true,
  onProfilePress = () => {},
  backgroundColor = "#1447E6",
}) {
  return (
    <View
      style={{
        height: 67.03,
        width:415,
        right: 22,                                                                                                            
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: backgroundColor,
      }}
    >
      {/* Left side */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* App icon */}
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{
            width: 28,
            height: 28,
            resizeMode: "contain",
            marginRight: 10,
          }}
        />
        <Text style={{ color: "#fff", fontWeight: "400", fontSize: 14, fontFamily: "regular" }}>
          {title}
        </Text>
      </View>

      {/* Right side (Profile) */}
      {showProfile ? (
        <TouchableOpacity
          onPress={() => router.push("profile")}
          style={{
            width: 28,
            height: 28,
            borderRadius: 18,
            overflow: "hidden",
            alignItems: "center",
            right: 25,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/ProfileIcon.png")}
            style={{ width: 34, height: 34, borderRadius: 17 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}