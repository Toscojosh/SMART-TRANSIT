// ProfileScreen.jsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/dashboard";
import { router } from "expo-router";

// Simple mock bookings data
const BOOKINGS = [
  {
    id: "b1",
    route: "Lagos → Abuja",
    date: "20 Oct 2025",
    time: "09:00 AM",
    company: "ABC Transport",
    fare: "₦12,000",
    status: "Completed",
  },
  {
    id: "b2",
    route: "Lagos → Enugu",
    date: "24 Oct 2025",
    time: "06:00 AM",
    company: "Peace Mass Transit",
    fare: "₦13,967",
    status: "Upcoming",
  },
];

export default function ProfileScreen({ navigation }) {
  // click handlers (replace with real logic later)
  const onLogout = () => {
    // TODO: sign out user (for now just console)
    console.log("logout");
    // navigation.replace('Login') // if using navigation
  };

  const renderBooking = ({ item }) => (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        // light shadow (android elev) — works on Android/iOS
        elevation: 1,
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 6, fontFamily: "regular" }}>
        {item.route}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: "#6b7280", fontSize: 13, fontFamily: "regular" }}>{item.date}</Text>
          <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4, fontFamily: "regular" }}>
            {item.time}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "#6b7280", fontSize: 13, fontFamily: "regular" }}>{item.company}</Text>
          <Text style={{ fontWeight: "700", marginTop: 8, fontFamily: "regular" }}>{item.fare}</Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 12,
              fontFamily: "regular",
              color: item.status === "Upcoming" ? "#059669" : "#6b7280",
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {/* Use ScrollView so screen scrolls if content is long */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <AppHeader/>

        {/* Profile card */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 18,
            alignItems: "center",
            marginBottom: 20,
            elevation: 2,
            marginTop: 50
          }}
        >
          <Image
            // replace with a real user avatar in your project
            source={require("../../assets/images/ww.jpg")}
            style={{ width: 84, height: 84, borderRadius: 42, marginBottom: 10 }}
          />

          <Text style={{ fontSize: 18, fontWeight: "700" }}>John Doe</Text>
          <Text style={{ color: "#6b7280", marginTop: 4 }}>john.doe@example.com</Text>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/login-in")}
            style={{
              marginTop: 12,
              paddingVertical: 8,
              paddingHorizontal: 28,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ef4444",
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>⤫ Logout</Text>
          </TouchableOpacity>

          {/* small stats row */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 14,
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "700", fontSize: 16, fontFamily: "regular" }}>2</Text>
              <Text style={{ color: "#6b7280", fontSize: 12, fontFamily: "regular" }}>Completed</Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "700", fontSize: 16, fontFamily: "regular" }}>1</Text>
              <Text style={{ color: "#6b7280", fontSize: 12, fontFamily: "regular" }}>Upcoming</Text>
            </View>
          </View>
        </View>

        {/* Bookings heading */}
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10, fontFamily: "regular" }}>
          My Bookings
        </Text>

        {/* Bookings list (FlatList inside ScrollView is OK when FlatList has fixed height,
            but here booking list is simple and short - we can render it with FlatList (it will size itself).
            If you plan a very long list, use FlatList as the main container instead of ScrollView.) */}
        <FlatList
          data={BOOKINGS}
          keyExtractor={(b) => b.id}
          renderItem={renderBooking}
          scrollEnabled={false} // let outer ScrollView handle scrolling
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        {/* Footer actions */}
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => router.push("searchPage")}
            style={{
              backgroundColor: "#1447E6",
              padding: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontFamily: "regular" }}>Back to Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("")}
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              padding: 14,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#374151", fontWeight: "600", fontFamily: "regular" }}>
              View All Bookings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}