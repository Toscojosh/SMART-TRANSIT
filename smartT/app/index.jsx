// app/index.jsx
import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // npm i @react-native-async-storage/async-storage

export default function Splash() {
  useEffect(() => {
    const go = async () => {
      // small pause so users see the splash
      await new Promise(r => setTimeout(r, 1500));

      // OPTIONAL: read flags you set elsewhere
      const seen = await AsyncStorage.getItem("seenOnboarding"); // "true" after last onboarding step
      const authed = await AsyncStorage.getItem("authToken");    // set after login/signup

      if (!seen) return router.replace("/(onboarding)/onboarding_1");
      if (!authed) return router.replace("/(auth)/login-in");
      return router.replace("/(onboarding)/onboarding_1"); // your main screen folder: app/home/index.jsx
    };
    go();
  }, []);

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1447E6"
    }}>
      <Image
        source={require("../assets/images/Logo.png")} // put your logo here
        style={{ width: 84, height: 84, marginBottom: 14, borderRadius: 18 }}
        resizeMode="contain"
      />
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
        SmartTransit
      </Text>
      <ActivityIndicator color="#fff" style={{ marginTop: 12 }} />
    </View>
  );
}