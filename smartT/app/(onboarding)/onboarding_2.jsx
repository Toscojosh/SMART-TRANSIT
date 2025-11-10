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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA", padding: 20 }}>
      
        
        <WelcomeCard />

        <Image source={require("../../assets/images/Onboarding 3.png")} style={{width: 211.31, height: 199.93, alignSelf: "center", marginTop: 40}} />

        <View style={{alignItems: "center"}}>
            <Text style={{fontFamily: "bold", fontSize: 25,  marginTop: 10, textAlign: "center"}}>Your Trip, Your Time</Text>
            <Text style={{fontFamily: "regualar", fontSize: 14, marginTop: 5, textAlign: "center"}}>Choose day or night travel that fits {"\n"} your schedule. SmartTransit helps {"\n"}  you plan your journey your way</Text>
        </View>

        <Image source={require("../../assets/images/Frame 7 (1).png")} style={{width: 40, height: 11, marginTop: 20, alignSelf: "center"}} />

        <OnboardingButton onPress={() => router.replace("onboarding_3")}/>

        <FeatureStats />

        

      
    </SafeAreaView>
  );
}