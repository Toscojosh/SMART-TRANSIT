// BookingScreen.jsx
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/dashboard";
import Breadcrumbs from "../components/breadCrumbs";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import PrimaryButton from "../components/longButton";

/*
  Beginner-friendly booking screen:
  - inline styles only
  - seat grid, passenger form, summary, proceed button
*/

const INITIAL_SEATS = [
  // simple seat map: rows A..D, cols 1..4 (you can expand)
  // status: "available" | "occupied"
  { id: "A1", status: "available" },
  { id: "A2", status: "available" },
  { id: "A3", status: "occupied" },
  { id: "A4", status: "available" },

  { id: "B1", status: "available" },
  { id: "B2", status: "available" },
  { id: "B3", status: "occupied" },
  { id: "B4", status: "available" },

  { id: "C1", status: "available" },
  { id: "C2", status: "available" },
  { id: "C3", status: "available" },
  { id: "C4", status: "occupied" },

  { id: "D1", status: "available" },
  { id: "D2", status: "available" },
  { id: "D3", status: "available" },
  { id: "D4", status: "available" },
];

export default function BookingScreen({ route, navigation }) {
  // route could pass route/from/to/price/time from the previous screen
  // For now use dummy values or read from route.params if available
  const trip = route?.params?.trip ?? {
    company: "ABC Transport",
    from: "Lagos",
    to: "Abuja",
    departTime: "06:00 AM",
    arriveTime: "02:00 PM",
    price: 12893,
  };

  const [seats, setSeats] = useState(INITIAL_SEATS);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // passenger form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // select seat handler
  const toggleSeat = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat) return;
    if (seat.status === "occupied") return; // can't select occupied

    // allow only one selected seat at a time
    setSelectedSeat((prev) => (prev === seatId ? null : seatId));
  };

  // Proceed button handler (validate)
  const proceed = () => {
    if (!selectedSeat) {
      Alert.alert("Select seat", "Please select a seat before proceeding.");
      return;
    }
    if (!fullName.trim()) {
      Alert.alert("Missing name", "Enter passenger full name.");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Missing phone", "Enter contact phone number.");
      return;
    }

    // Build booking object
    const booking = {
      trip,
      seat: selectedSeat,
      passenger: { fullName, email, phone },
      amount: trip.price,
      bookedAt: new Date().toISOString(),
    };

    // For MVP: show alert and log — replace with Firebase save later
    console.log("Booking:", booking);
    Alert.alert("Booked (demo)", Seat `${selectedSeat} reserved — proceed to payment.`);

    // Example: navigate to a payment screen if you have one
    // navigation.navigate("Payment", { booking });
  };

  // helper for rendering seat boxes in rows
  const renderSeatGrid = () => {
    // group seats in rows by first letter (A,B,C,..)
    const rows = {};
    seats.forEach((s) => {
      const rowKey = s.id.charAt(0);
      if (!rows[rowKey]) rows[rowKey] = [];
      rows[rowKey].push(s);
    });

    return Object.keys(rows).map((rowKey) => (
        
      <View key={rowKey} style={{ marginBottom: 12 }}>
        <Text style={{ marginLeft: 8, marginBottom: 6, fontWeight: "700" }}>{rowKey}</Text>
        <View style={{ flexDirection: "row", paddingLeft: 8 }}>
          {rows[rowKey].map((s) => {
            const isSelected = selectedSeat === s.id;
            const isOccupied = s.status === "occupied";
            // style variations
            const bg = isOccupied ? "#f1f1f1" : isSelected ? "#FF6900" : "#ffffff";
            const border = isOccupied ? "#cfcfcf" : "#10b981"; // green for available border
            const textColor = isOccupied ? "#999" : isSelected ? "#fff" : "#111";

            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => toggleSeat(s.id)}
                style={{
                  width: 54,
                  height: 44,
                  marginRight: 10,
                  borderRadius: 6,
                  borderWidth: 1.5,
                  borderColor: isOccupied ? "#e5e7eb" : isSelected ? "#e55a20" : "#10b981",
                  backgroundColor: bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: textColor, fontWeight: "700" }}>{s.id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    ));
  };

  return (

    <SafeAreaView style={{ flex: 1,  backgroundColor: "#F6F7F9" }}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}  >
     
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
      <AppHeader/>
      <Breadcrumbs style={{ }} />

      <Text style={{marginTop: 20, marginBottom: 20, fontFamily: "regular", fontSize:  15}}>Complete Your Booking</Text>
        {/* Header / trip details */}
        <View style={{ backgroundColor: "#fff", padding: 14, borderColor: "#E5E7EB",  borderRadius: 10, marginBottom: 16 }}>

          <Text style={{fontFamily: "medium", fontSize: 15, marginBottom: 15}}>Trip Details</Text>

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image source={require("../../assets/images/bus1.png")} style={{width: 25, height: 25}} />
            <Text style={{ fontWeight: 600, fontFamily: "semi-bold", left: 10, fontSize: 15,  }}>{trip.company}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#E5E7EB", marginVertical: 8 }} />

          <Text style={{ color: "#666", marginTop: 6, }}>
            {trip.departTime} • {trip.from} <MaterialIcons name="access-time" size={16} color="black" /> {trip.to} • {trip.arriveTime}
          </Text>
          
          <View style={{ height: 1, backgroundColor: "#E5E7EB", marginVertical: 8 }} />

          <Text style={{ color: "#0ea5a4", marginTop: 8, fontWeight: "700" }}>
            ₦{trip.price.toLocaleString()}
          </Text>
        </View>



        {/* Seat grid */}

        

        <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 18 }}>

          <Text style={{fontFamily: "regular"}}>Select Your Seat</Text>

          <View style={{backgroundColor: "#F3F4F6", padding: 12, borderRadius: 10, marginBottom: 50, marginTop: 30}}>
            
            <View style={{ flexDirection: "row", marginBottom: 12, alignItems: "center" }}>
            <View style={{ width: 12, height: 12, borderWidth: 1, borderColor: "#10b981", marginRight: 6 }} />
            <Text style={{ marginRight: 20, fontFamily: "regular"}}> Available </Text>
            <View style={{ width: 12, height: 12, backgroundColor: "#D1D5DC", marginRight: 6 }} />
            <Text style={{ marginRight: 20, fontFamily: "regular"}}> Occupied </Text>
            <View style={{ width: 12, height: 12, backgroundColor: "#FF6900", marginRight: 6 }} />
            <Text style={{fontFamily: "regular"}}> Selected </Text>
          </View>

        </View>
          {renderSeatGrid()}
        </View>

        

        {/* Passenger details */}
        <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 18 }}>
          <Text style={{ fontWeight: "700", marginBottom: 8, fontFamily: "regular", fontSize: 12, fontWeight: 400 }}>Passenger Details</Text>

          <Text style={{ marginBottom: 6, color: "#333", fontFamily: "medium", fontSize: 10.75, }}>Full name</Text>
          <TextInput
            placeholder="John Doe"
            placeholderTextColor={"#6B7280"}
            value={fullName}
            onChangeText={setFullName}
            style={{
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 8,
              marginBottom: 12,
              fontFamily: "regular",
              fontSize: 12.29,
              fontWeight: 400
            }}
          />
          <View style={{flexDirection: "row"}}>
            <MaterialIcons name="mail-outline" size={10} color="black" />
            <Text style={{ marginBottom: 6, color: "#333", fontFamily: "medium", fontSize: 10.75, fontWeight: 500 }}> Contact email </Text>
          </View>

          <TextInput
            placeholder="name@example.com"
            placeholderTextColor={"#6B7280"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 8,
              marginBottom: 12,
              fontFamily: "regular",
              fontSize: 12.29,
              fontWeight: 400
            }}
          />

          <View style={{flexDirection: "row"}}>
            <Feather name="phone" size={10} color="black" />
          <Text style={{ marginBottom: 6, color: "#333", fontFamily: "medium", fontSize: 10.75, fontWeight: 500 }}>  Phone number</Text>
          </View>
          <TextInput
            placeholder="+234 800 000 0000"
            placeholderTextColor={"#6B7280"}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={{
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 8,
              marginBottom: 6,
              color: "#6B7280",
              fontFamily: "regular",
              fontSize: 12.29,
              fontWeight: 400
            }}
          />
        </View>

        {/* Booking summary */}
        <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 18 }}>

          <Text style={{ fontWeight: "700", marginBottom: 8 }}>Booking Summary</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ color: "#4A5565", fontFamily: "regular" }}>Route</Text>
            <Text style={{fontFamily: "regular"}}>{trip.from} → {trip.to}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ color: "#4A5565", fontFamily: "regular" }}>Departure</Text>
            <Text style={{fontFamily: "regular"}}>{trip.departTime}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ color: "#4A5565", fontFamily: "regular" }}>Seat</Text>
            <Text style={{fontFamily: "regular"}}>{selectedSeat ?? "Not selected"}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 }} />

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontWeight: "700", fontFamily: "regular" }}>Total Fare</Text>
            <Text style={{ color: "#0ea5a4", fontWeight: "700", fontFamily: "regular" }}>₦{trip.price.toLocaleString()}</Text>
          </View>

        </View>

        <PrimaryButton title= "Procced to Payment" onPress={() => router.push("paymentScreen")} />

      </ScrollView>

      

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}