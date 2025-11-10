import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import PrimaryButton from "../components/longButton";
import HeaderLogo from "../components/authLogo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#FFFFFF"}}>

      <HeaderLogo/>
      
      <View style={{padding: 20}}>
      
        <View>
          <Text style={{ fontFamily: "semi-bold", fontSize: 20, textAlign: "center"}}>Vetfication Successful!</Text>
        </View>

        <Image style={{width: 385.17, height: 287}} source={require("../../assets/images/Verification.png")} />

        <PrimaryButton style={{padding: 20}} title={"Done"} onPress={() => router.push("searchPage")} />

      </View>

    </SafeAreaView>
  );
}