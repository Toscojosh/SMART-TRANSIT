// app/signup.jsx
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import WelcomeCard from "../components/onboardingLogo";
import AppInput from "../components/textInput";
import OnboardingButton from "../components/onboardingButton";
import FeatureStats from "../components/featureStats";

export default function Onboarding ({ navigation }) {


 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA", padding: 30 }}>
      
        
        <WelcomeCard />

        <Image source={require("../../assets/images/bro.png")} style={{width: 211.31, height: 199.93, alignSelf: "center", marginTop: 20}} />

        <View style={{alignItems: "center"}}>
            <Text style={{fontFamily: "bold", fontSize: 20,  marginTop: 10, textAlign: "center", lineHeight: 19.21}}>Fast, Secure & Transparent</Text>
            <Text style={{fontFamily: "regualar", fontSize: 12, marginTop: 5, textAlign: "center"}}>View available seats, see upfront prices, {"\n"} and confirm your booking — all in one {"\n"} seamless experience.</Text>
        </View>

        <Image source={require("../../assets/images/Frame 7 (3).png")} style={{width: 40, height: 11, marginTop: 20, alignSelf: "center"}} />

        <OnboardingButton onPress={() => router.replace("login-in")}/>

        <FeatureStats />

        

      
    </SafeAreaView>
  );
}