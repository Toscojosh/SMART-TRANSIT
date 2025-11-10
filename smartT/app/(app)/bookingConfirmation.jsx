// BookingConfirmation.jsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AppHeader from "../components/dashboard";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from "expo-router";

/*
  This component expects a route and navigation prop (react-navigation style).
  If you use expo-router, adapt the navigation call or pass the booking differently.
*/

export default function BookingConfirmation({ route, navigation }) {
  // Use booking from route.params.booking if provided, otherwise fallback demo data
  const booking = route?.params?.booking ?? {
    id: "NB-41620",
    route: { from: "Lagos", to: "Abuja" },
    date: "Fri, 24 Oct 2025",
    departTime: "06:00 AM",
    passengerName: "John Doe",
    seat: "A2",
    company: "ABC Transport",
    total: 41620,
    email: "dd@dd.com",
  };

  const onViewMap = () => {
    // Navigate to your Map screen — replace 'MapScreen' with your route name
    if (navigation?.navigate) navigation.navigate("MapScreen", { booking });
    else alert("Open map screen (no navigation attached in this demo).");
  };

  const onBack = () => {
    if (navigation?.navigate) navigation.navigate("Home"); // replace with your dashboard route
    else alert("Back to dashboard (no navigation attached in this demo).");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F9", }}>
      
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>

        <AppHeader />
        
        <View>

          <Image style={{width: 272, alignSelf: "center", height: 202.67, marginBottom: 10}} source={require("../../assets/images/Confirmation Image.png")} />
      
          <View style={{ alignItems: "center", marginBottom: 18 }}> 
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6, fontFamily: "regular" }}>Booking Confirmed!</Text>
            <Text style={{ color: "#6b7280", textAlign: "center", fontFamily: "regular" }}>Your bus ticket has been successfully booked</Text>
          </View>


          {/* Details card */}
          <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 12, marginBottom: 18 }}>

          {/* ID */}
          <View style={{ marginBottom: 18, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#6b7280", fontSize: 13 }}>Booking ID:       </Text>
            <Text style={{ color: "#2563eb", fontWeight: "700", marginTop: 4 }}>{booking.id}</Text>
          </View>

            {/* Row helper */}
            {/** single detail row component inline **/}
            <DetailRow label="Route" value={`${booking.route.from} → ${booking.route.to}`} />
            <Divider />
            <DetailRow icon="" label="Departure Date" value={booking.date} />
            <Divider />
            <DetailRow icon="" label="Departure Time" value={booking.departTime} />
            <Divider />
            <DetailRow icon="" label="Passenger Name" value={booking.passengerName} />
            <Divider />
            <DetailRow icon="" label="Seat Number" value={booking.seat} />
            <Divider />

            {/* Company + total row */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* small bus icon - replace with Image if you have asset */}
                <Text style={{ fontSize: 20, marginRight: 8 }}>🚍</Text>
                <View>
                  <Text style={{ fontWeight: "700" }}>{booking.company}</Text>
                </View>
              </View>

              <Text style={{ color: "#0ea5a4", fontWeight: "700" }}>₦{Number(booking.total).toLocaleString()}</Text>
            </View>
          </View>

          {/* Orange button - View Route on Map */}
          <TouchableOpacity
            onPress={() => router.push("tss")}
            style={{
              backgroundColor: "#FF6A00",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 12
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>📍 View Route on Map</Text>
          </TouchableOpacity>

          {/* Back to Dashboard button (outline style) */}
          <TouchableOpacity
            onPress={onBack}
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#e6e9ee",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 14
            }}
          >
            <Text style={{ color: "#111", fontWeight: "600" }}>Back to Dashboard</Text>
          </TouchableOpacity>

          {/* Info box (email confirmation) */}
          <View style={{ backgroundColor: "#eef2ff", padding: 12, borderRadius: 8 }}>
            <Text style={{ color: "#334155" }}>
              A confirmation email has been sent to {booking.email}.
            </Text>
            <Text style={{ color: "#334155", marginTop: 6 }}>
              Please arrive at the terminal 30 minutes before departure time.
            </Text>
          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

/* small helper components used inline (keeps code readable) */
function DetailRow({ icon, label, value }) {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
        <Text style={{ fontSize: 16, marginRight: 8 }}>{icon}</Text>
        <Text style={{ fontSize: 15 }}>{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 6 }} />;
}