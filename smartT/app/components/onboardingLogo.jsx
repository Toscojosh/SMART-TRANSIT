import React from "react";
import { View, Text, Image } from "react-native";

export default function WelcomeCard({
  subtitle = "WELCOME TO",
  title = "SMART TRANSIT!",
  iconSource = require("../../assets/images/icon.png"), // change if your path differs
  iconSource1 = require("../../assets/images/Icon (5).png"),
  leftDotActive = true,   // simple “pager” dots
  rightDotActive = false,
}) {
  return (
    <View
      style={{
        width: "92%",
        alignSelf: "center",
        marginTop: 16,
      }}
    >
      {/* App icon in a blue rounded square */}
      <View

      >
        <Image
          source={iconSource}
          style={{ width: 63.99, height: 63.99, resizeMode: "contain", alignSelf: "center" }}
        />
      </View>

      {/* Texts */}
      <Text
        style={{
          color: "#6B7280",
          fontSize: 13,
          textAlign: "center",
          marginBottom: 4,
          fontFamily: "medium"
        }}
      >
        {subtitle}
      </Text>

      <Text
        style={{
          color: "#111827",
          fontSize: 22,
          fontWeight: "800",
          textAlign: "center",
          marginBottom: 14,
          fontFamily: "extra-bold"
        }}
      >
        {title}
      </Text>

      {/* Progress row: dot — bus — dot */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {/* left dot */}
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: leftDotActive ? "#1447E6" : "#D0D5DD",
          }}
        />

        {/* small bus icon (can be the same app icon or emoji) */}
        <Image
          source={iconSource1}
          style={{ width: 19.2, height: 19.2, resizeMode: "contain" }}
        />

        {/* right dot */}
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: rightDotActive ? "#FF6900" : "#D0D5DD",
          }}
        />
      </View>
    </View>
  );
}