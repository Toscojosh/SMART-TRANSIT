// app/verify-otp.jsx  (register in your navigator as "VerifyOTP")
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import HeaderLogo from "../components/authLogo";
import PrimaryButton from "../components/longButton";

export default function VerifyOTP({ route, navigation }) {
  const phone = route?.params?.phone || "+234 *** *** **67";
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const inputs = Array.from({ length: 6 }).map(() => useRef(null));

  const onChangeCode = (value, index) => {
    const v = value.replace(/[^0-9]/g, "").slice(-1); // single digit
    const next = [...codes];
    next[index] = v;
    setCodes(next);
    if (v && index < 5) inputs[index + 1].current?.focus();
  };

  const onVerify = () => {
    const otp = codes.join("");
    if (otp.length !== 6) return alert("Enter 6-digit code");
    // fake verify for MVP
    alert("Verified ✅");
    navigation?.navigate?.("sign-up3");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA",  }}>

      <HeaderLogo />

      <View style={{padding: 20}}>

      <Text style={{ fontSize: 20, fontWeight: "700", color: "#111826" }}>
        Verify your phone number
      </Text>
      <Text style={{ color: "#6B7280", marginTop: 6, marginBottom: 18 }}>
        We sent an SMS with an activation code to your phone {phone}
      </Text>

      {/* 6 code boxes */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 18 }}>
        {codes.map((c, i) => (
          <TextInput
            key={i}
            ref={inputs[i]}
            value={c}
            onChangeText={(t) => onChangeCode(t, i)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 48, height: 54, backgroundColor: "#FFFFFF",
              borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10,
              textAlign: "center", fontSize: 20, fontWeight: "700"
            }}
          />
        ))}
      </View>

      <View style={{ flexDirection: "row", marginBottom: 14 }}>
        <Text style={{ color: "#6B7280" }}>I didn’t receive a code </Text>
        <TouchableOpacity onPress={() => alert("Resent (MVP)")}>
          <Text style={{ color: "#1447E6", fontWeight: "600" }}>Resend</Text>
        </TouchableOpacity>
      </View>

     <PrimaryButton  title={"Verify"} onPress={() => router.push("sign-up3")}/>

      </View>
    </SafeAreaView>
  );
}