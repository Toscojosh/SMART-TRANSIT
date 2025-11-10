// app/components/Breadcrumbs.jsx
import React from "react";
import { View, Text } from "react-native";

/*
  Usage:
  <Breadcrumbs step={1} />
  step = 0..3 => 0: Search, 1: Select Trip, 2: Booking, 3: Payment
*/

const LABELS = ["Search", "Select Trip", "Booking", "Payment"];

export default function Breadcrumbs({ step = 0 }) {
  return (
    <View style={{ paddingHorizontal: 14, paddingVertical: 12, right: 22, borderColor: "#E5E7EB", backgroundColor: "#fff", width: 415, height: 40  }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {LABELS.map((label, i) => {
          const active = i === step;
          return (
            <View
              key={label}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: active ? "#1447E6" : "#9AA0A6",
                  fontWeight: active ? "700" : "500",
                  fontSize: 14,
                  fontFamily: "regular"
                }}
              >
                {label}
              </Text>

              {/* arrow except last */}
              {i < LABELS.length - 1 && (
                <Text style={{ marginHorizontal: 8, color: "#cbd5db" }}>→</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}