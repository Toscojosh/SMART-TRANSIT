// components/SearchSummaryBar.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function SearchSummaryBar({
  from = "",
  to = "",
  date,                 // JS Date object from your picker
  onModifyPress = () => {},
}) {
  // format like 2025-10-24 to match the Figma
  const fmt = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return "—";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // simple “past date” check
  const isPast = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    const picked = new Date(d);
    picked.setHours(0,0,0,0);
    return picked < today;
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 8,
        marginTop: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* top row: Lagos → Abuja   |   2025-10-24 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontSize: 14, color: "#101828", fontWeight: "600" }}
          >{from || "From"}</Text>

          <Ionicons name="arrow-forward-outline" size={16} color="#667085" style={{ marginHorizontal: 8 }} />

          <Text
            style={{ fontSize: 14, color: "#101828", fontWeight: "600" }}
          >{to || "To"}</Text>
        </View>

        <Text
          style={{ fontSize: 13, color: "#667085", fontWeight: "500" }}
        >
          {fmt(date)}
        </Text>
      </View>

      {/* bottom row: Modify Search */}
      <TouchableOpacity
        onPress={() => router.push("searchPage")}
        style={{
          alignSelf: "flex-start",
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F2F4F7",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
      >
        <Ionicons name="options-outline" size={16} color="#344054" />
        <Text style={{ marginLeft: 6, color: "#344054", fontWeight: "600" }}>
          Modify Search
        </Text>
      </TouchableOpacity>

      {/* tiny warning if the picked date is in the past */}
      {isPast(date) && (
        <Text style={{ color: "#B42318", marginTop: 8, fontSize: 12 }}>
          Selected date is in the past. Please pick a future date.
        </Text>
      )}
    </View>
  );
}