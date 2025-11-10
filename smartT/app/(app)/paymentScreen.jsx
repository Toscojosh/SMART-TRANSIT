// PaymentScreen.jsx
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Breadcrumbs from "../components/breadCrumbs";
import AppHeader from "../components/dashboard";

export default function PaymentScreen({ route, navigation }) {
  // read booking passed from previous screen (optional)
  const booking = route?.params?.booking ?? {
    trip: { from: "Lagos", to: "Abuja", departTime: "06:00 AM" },
    company: "Peace Mass Transit",
    passenger: { fullName: "John Doe" },
    seat: "E2",
    amount: 13967,
  };

  // form fields for card/payment
  const [nameOnCard, setNameOnCard] = useState(booking.passenger?.fullName ?? "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmPayment = () => {
    // very simple validations
    if (!nameOnCard.trim()) return Alert.alert("Missing name", "Enter name on card.");
    if (cardNumber.replace(/\s/g, "").length < 12) return Alert.alert("Card number", "Enter valid card number.");
    if (expiry.trim().length < 4) return Alert.alert("Expiry", "Enter expiry MM/YY.");
    if (cvv.trim().length < 3) return Alert.alert("CVV", "Enter CVV.");

    // MOCK: show processing and success - replace with real gateway call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Payment success", `Your payment of ₦${booking.amount.toLocaleString()} was successful.`);
      // navigate to a confirmation screen or back to home
      // navigation.replace("BookingConfirmation", { booking })
    }, 1100);
  };

  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor: "#F6F7F9" }}>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <AppHeader />
        <Breadcrumbs />
        <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 20 , marginBottom: 12, fontFamily: "regular" }}>Review & Pay</Text>

        {/* Order summary */}
        <View style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 14,
          marginBottom: 18,
        }}>
          <Text style={{ fontWeight: "700", marginBottom: 10, fontFamily: "regular"  }}>Order Summary</Text>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#6b7280", fontFamily: "regular", marginBottom:5 }}>Route</Text>
            <Text style={{fontFamily: "regular" }}>{booking.trip.from} → {booking.trip.to}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 }} />

          <View style={{ marginBottom: 8,  }}>
            <Text style={{ color: "#6b7280", fontFamily: "regular", marginBottom:5 }}>Company</Text>
            <Text style={{fontFamily: "regular" }}>{booking.company}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 }} />

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#6b7280", fontFamily: "regular", marginBottom:5  }}>Departure</Text>
            <Text style={{fontFamily: "regular" }}>{booking.trip.departTime}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 }} />

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#6b7280", fontFamily: "regular", marginBottom:5  }}>Passenger</Text>
            <Text style={{fontFamily: "regular" }}>{booking.passenger?.fullName ?? "Not provided"}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 }} />

          

          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#6b7280", fontFamily: "regular", marginBottom:5  }}>Seat</Text>
            <Text style={{fontFamily: "regular" }}>{booking.seat ?? "Not selected"}</Text>
          </View>

          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 }} />

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontWeight: "700" }}>Total Amount</Text>
            <Text style={{ color: "#0ea5a4", fontWeight: "700" }}>₦{booking.amount.toLocaleString()}</Text>
          </View>
        </View>

        {/* Payment details */}
        <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 14, marginBottom: 18 }}>
          <Text style={{ fontWeight: "700", marginBottom: 10 }}>Payment Details</Text>

          <Text style={{ color: "#6b7280", marginBottom: 6 }}>Name on Card</Text>
          <TextInput
            value={nameOnCard}
            onChangeText={setNameOnCard}
            placeholder="John Doe"
            style={{
              backgroundColor: "#f8fafc",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />

          <Text style={{ color: "#6b7280", marginBottom: 6 }}>Card Number</Text>
          <TextInput
            value={cardNumber}
            onChangeText={(t) => setCardNumber(t.replace(/[^0-9\s]/g, ""))}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            style={{
              backgroundColor: "#f8fafc",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{ color: "#6b7280", marginBottom: 6 }}>Expiry (MM/YY)</Text>
              <TextInput
                value={expiry}
                onChangeText={(t) => setExpiry(t)}
                placeholder="MM/YY"
                style={{
                  backgroundColor: "#f8fafc",
                  padding: 12,
                  borderRadius: 8,
                }}
              />
            </View>

            <View style={{ width: 110 }}>
              <Text style={{ color: "#6b7280", marginBottom: 6 }}>CVV</Text>
              <TextInput
                value={cvv}
                onChangeText={(t) => setCvv(t.replace(/[^0-9]/g, ""))}
                placeholder="123"
                keyboardType="numeric"
                secureTextEntry={true}
                style={{
                  backgroundColor: "#f8fafc",
                  padding: 12,
                  borderRadius: 8,
                }}
              />
            </View>
          </View>

          {/* small secure note */}
          <View style={{ marginTop: 12, backgroundColor: "#eef2ff", padding: 10, borderRadius: 8 }}>
            <Text style={{ color: "#334155" }}>🔒 Secure Payment — your card details are not saved in this demo.</Text>
          </View>
        </View>

        {/* Confirm button inside page (also will keep bottom fixed if you want) */}
        <View style={{ marginTop: 6 }}>
          <TouchableOpacity
            onPress={(confirmPayment) => router.push("bookingConfirmation")}
            style={{
              backgroundColor: "#10b981",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
            }}
            disabled={loading}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>{loading ? "Processing..." : "Confirm Payment"}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}