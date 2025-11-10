// app/(auth)/sign-up.jsx
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, KeyboardAvoidingView, Image, Platform, TouchableOpacity, Alert } from "react-native";
import HeaderLogo from "../components/authLogo";
import AppInput from "../components/textInput";
import PrimaryButton from "../components/longButton";
import { signup } from "../../lib/authh";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [agree, setAgree]       = useState(false);
  const router = useRouter();

  async function handleSignup() {
    // Basic validations
    if (!fullName || !email || !phone || !password || !confirm) {
      Alert.alert("Missing info", "Please fill all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters");
      return;
    }
    const p = password.trim();
    const c = confirm.trim();

    // Debug: sanity check
    console.log("COMPARE", { p, c, equal: p === c });

    if (p !== c) {
      Alert.alert("Passwords do not match");
      return;
    }
    if (!agree) {
      Alert.alert("Accept terms", "Please accept the Terms & Privacy policy");
      return;
    }

    try {
      await signup(fullName.trim(), email.trim(), p, c, phone.trim());
      router.replace("/(app)/searchPage");
    } catch (err) {
      Alert.alert("Signup failed", err?.message || "Please try again.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 24 }}>
          <HeaderLogo />

          <View style={{ padding: 20 }}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "700", fontFamily: "poppins-medium" }}>Create an account</Text>
              <Text style={{ marginTop: 5, marginBottom: 16, textAlign: "center", fontFamily: "poppins-regular" }}>Start with us today</Text>
            </View>

            <Text style={{fontFamily: "medium",  marginBottom: 5, marginTop: 10}}>Full Name</Text>
            <AppInput value={fullName} onChangeText={setFullName} placeholder="Enter your name" />

            <Text style={{fontFamily: "medium",  marginBottom: 5, marginTop: 10}}>Email Address</Text>
            <AppInput style={{}} value={email} onChangeText={setEmail} placeholder="smarttransit@gmail.com" keyboardType="email-address" autoCapitalize="none" />

            <Text style={{fontFamily: "medium",  marginBottom: 5, marginTop: 10}}>Phone Number</Text>
            <AppInput value={phone} onChangeText={setPhone} placeholder="08123456789" keyboardType="phone-pad" />

            <Text style={{fontFamily: "medium",  marginBottom: 5, marginTop: 10}}>Password</Text>
            <AppInput value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry />

            <Text style={{fontFamily: "medium",  marginBottom: 5, marginTop: 10}}>Confirm Password</Text>
            <AppInput value={confirm} onChangeText={setConfirm} placeholder="Confirm your password" secureTextEntry />

            <TouchableOpacity onPress={() => setAgree(!agree)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16, marginTop: 8 }}>
              <View style={{ width: 18, height: 18, borderRadius: 4, borderWidth: 1.2, borderColor: "#9CA3AF", backgroundColor: agree ? "#1447E6" : "transparent", marginRight: 8 }} />
              <Text>I accept the <Text style={{ color: "#1447E6" }}>Terms of use</Text> and <Text style={{ color: "#1447E6" }}>Privacy policy</Text></Text>
            </TouchableOpacity>

            <PrimaryButton title="Sign up" onPress={handleSignup } />

                    {/* or divider */}
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#6B7280" }} />
          <Text style={{ marginHorizontal: 10, color: "#6B7280" }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#6B7280" }} />
        </View>

        {/* Google button outline (placeholder) */}
        <TouchableOpacity
          onPress={() => alert("Google Sign-In (MVP placeholder)")}
          style={{
            borderWidth: 1, borderColor: "#FF6B35", borderRadius: 10,
            paddingVertical: 12, alignItems: "center", flexDirection: "row",
            justifyContent: "center", marginTop: 10
          }}
        >
          <Image source={require("../../assets/images/google (1).png")}
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          <Text style={{ fontWeight: "600", color: "#111826" }}>Sign up with Google</Text>
        </TouchableOpacity>


            <View style={{flexDirection: "row", alignSelf: "center", marginTop: 30}}>
              <Text style={{fontFamily: "regular"}}>Already have an account? </Text>
              <Text style={{color: "#1447E6", fontFamily: "regular"}} onPress={() => router.push("login-in")}>Log in</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}