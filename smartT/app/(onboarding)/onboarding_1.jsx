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

        <Image source={require("../../assets/images/amico.png")} style={{width: 211.31, height: 199.93, alignSelf: "center", marginTop: 40}} />

        <View style={{alignItems: "center"}}>
            <Text style={{fontFamily: "bold", fontSize: 20,  marginTop: 10, textAlign: "center", lineHeight: 19.21}}>Find & Book Intercity {"\n"} Buses in Minutes</Text>
            <Text style={{fontFamily: "regualar", fontSize: 12, marginTop: 5, textAlign: "center"}}>Skip the queues — search routes, {"\n"} compare trips, and book your next {"\n"}  bus ride in just a few taps.</Text>
        </View>

        <Image source={require("../../assets/images/Frame 7.png")} style={{width: 40, height: 11, marginTop: 20, alignSelf: "center"}} />

        <OnboardingButton onPress={() => router.replace("onboarding_2")} />

        <FeatureStats />

        


      
    </SafeAreaView>
  );
}