// components/FeatureStats.jsx
import React from "react";
import { View, Text } from "react-native";

export default function FeatureStats({
  items = [
    { value: "50+", label: "Cities" },
    { value: "100+", label: "Routes" },
    { value: "24/7", label: "Support" },
  ],
  primary = "#1447E6",     // blue number color
  muted = "#6B7280",       // grey label color
  showDividers = true,
}) {
  return (
    <View
      style={{
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
        justifyContent: "space-between",
      }}
    >
      {items.map((it, idx) => (
        <View
          key={idx}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Stat */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: primary, fontSize: 18, fontWeight: "700", fontFamily: "regular" }}>
              {it.value}
            </Text>
            <Text style={{ color: muted, fontSize: 14, marginTop: 2, fontFamily: "regular" }}>
              {it.label}
            </Text>
          </View>

          {/* Divider (not after last) */}
          {showDividers && idx < items.length - 1 && (
            <View
              style={{
                width: 1,
                height: 28,
                backgroundColor: "#E5E7EB",
                marginLeft: 16,
                position: "absolute",
                right: 0,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}