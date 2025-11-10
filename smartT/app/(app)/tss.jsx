// TripSummaryScreen.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AppHeader from "../components/dashboard";

/*
  Usage:
  <TripSummaryScreen
    routeInfo={{
      from: "Lagos",
      to: "Abuja",
      departTime: "06:00 AM",
      arriveTime: "02:00 PM",
      duration: "8h",
      company: "ABC Transport",
      fare: "₦12,893"
    }}
    onBack={() => navigation.goBack()}
  />
*/

export default function TripSummaryScreen({ routeInfo = {}, onBack = () => {} }) {
  // default data if routeInfo not provided
  const info = {
    from: routeInfo.from || "Lagos",
    to: routeInfo.to || "Abuja",
    departTime: routeInfo.departTime || "06:00 AM",
    arriveTime: routeInfo.arriveTime || "02:00 PM",
    duration: routeInfo.duration || "8h",
    company: routeInfo.company || "ABC Transport",
    fare: routeInfo.fare || "₦12,893",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} >

      <AppHeader />

      <View style={{marginTop: 20}}>

        {/* Map card */}
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8, fontFamily: "regular"}}>Route Map</Text>

        <View style={{ marginBottom: 18,  }} >
          <Image
            // placeholder map — replace with your map image or MapView component later
            source={require("../../assets/images/Card.png")}
            style={{ width: 368.88, height: 287.43, borderRadius: 15, padding: 14,}}
          />
        </View>

        {/* Trip summary card */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 14,
            marginBottom: 18,
            elevation: 1,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>Trip Summary</Text>

          {/* Row: From */}
          <View style={{ marginBottom: 12 }}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <SimpleLineIcons name="location-pin" size={10} color="black" />
              <Text style={{ color: "#6b7280", marginBottom: 6, fontFamily: "regular", fontSize: 14 }}>From</Text>
            </View>
            <Text style={{ fontSize: 15, fontFamily: "regular", fontSize: 16, fontWeight: 400 }}>{info.from}</Text>
            <Text style={{ color: "#1447E6", marginTop: 6, fontFamily: "regular", fontSize: 14}}>{info.departTime}</Text>
          </View>

          {/* Row: Duration */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: "#6b7280", marginBottom: 6 }}>Duration</Text>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>{info.duration}</Text>
          </View>

          {/* Row: To */}
          <View style={{ marginBottom: 12 }}>
            <View style={{flexDirection: "row", }}>
              <SimpleLineIcons name="location-pin" size={10} color="black" />
              <Text style={{ color: "#6b7280", marginBottom: 6 }}>To</Text>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>{info.to}</Text>
            <Text style={{ color: "#f97316", marginTop: 6 }}>{info.arriveTime}</Text>
          </View>

          {/* Row: Company */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <Image
              // replace with bus icon
              source={require("../../assets/images/bus1.png")}
              style={{ width: 34, height: 34, marginRight: 10, resizeMode: "contain" }}
            />
            <View>
              <Text style={{ color: "#6b7280", fontSize: 12 }}>Bus Company</Text>
              <Text style={{ fontWeight: "700", fontSize: 14 }}>{info.company}</Text>
            </View>
          </View>

          {/* Fare */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#6b7280" }}>Fare</Text>
            <Text style={{ color: "#0ea5a4", fontWeight: "700" }}>{info.fare}</Text>
          </View>
        </View>

        {/* Note box */}
        <View
          style={{
            backgroundColor: "#eef2ff",
            borderRadius: 8,
            padding: 12,
            marginBottom: 28,
            borderWidth: 1,
            borderColor: "#e0e7ff",
          }}
        >
          <Text style={{ color: "#374151", fontSize: 13 }}>
            Note: The estimated travel time may vary based on traffic and weather conditions.
          </Text>
        </View>

        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}