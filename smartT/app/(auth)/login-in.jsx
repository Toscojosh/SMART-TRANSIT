// app/(auth)/login-in.jsx
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import HeaderLogo from "../components/authLogo";
import AppInput from "../components/textInput";
import PrimaryButton from "../components/longButton";
import { login } from "../../lib/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert("Enter email and password");
    try {
      setLoading(true);
      const res = await login(email.trim(), password);
      // Optional: check email verification if backend requires it
      // if (!res?.user?.isVerified) { Alert.alert("Please verify your email"); return; }
      router.replace("/(app)/searchPage"); // go to home
    } catch (err) {
      Alert.alert("Login failed", err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <HeaderLogo />
      <View style={{ padding: 15 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontFamily: "poppins-medium" }}>Welcome Back</Text>
          <Text style={{ fontSize: 14, marginTop: 5, fontFamily: "poppins-regular" }}>
            Login into your account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 5 }}>Email Address</Text>
          <AppInput
            placeholder="smarttransit@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={{ marginBottom: 5, marginTop: 12 }}>Password</Text>
          <AppInput
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <PrimaryButton title={loading ? "Logging in..." : "Log in"} onPress={handleLogin} />

        <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}>
          <Text style={{ fontFamily: "regular" }}>Don't have an account? </Text>
          <Text
            style={{ color: "#1447E6", fontFamily: "regular" }}
            onPress={() => router.push("sign-up")}
          >
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}