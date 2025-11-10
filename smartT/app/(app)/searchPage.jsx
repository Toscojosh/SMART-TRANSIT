// FindTripScreen.jsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Switch, Keyboard, Platform, KeyboardAvoidingView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppHeader from "../components/dashboard"; // keep your header import

const CITIES = [
  "Lagos",
  "Abuja",
  "Ibadan",
  "Enugu",
  "Port Harcourt",
  "Kano",
  "Benin City",
  "Kaduna",
  "Onitsha",
  "Abeokuta",
  "Ilorin",
  "Oyo",
  "Owerri",
  "Uyo",
  "Awka",
  "Jos",
  "Sokoto",
  "Makurdi",
];

function useDebounced(value, delay = 160) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setVal(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return val;
}

export default function FindTripScreen() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [nightTravel, setNightTravel] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // "from" | "to" | null
  const [results, setResults] = useState([]);
  const debFrom = useDebounced(from);
  const debTo = useDebounced(to);
  const router = useRouter();

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    const q = activeInput === "from" ? debFrom : debTo;
    if (!activeInput) {
      setResults([]);
      return;
    }
    if (!q || q.trim().length === 0) {
      // show top suggestions when empty
      setResults(CITIES.slice(0, 6));
      return;
    }
    const lower = q.toLowerCase();
    const filtered = CITIES.filter((c) => c.toLowerCase().includes(lower));
    setResults(filtered);
  }, [debFrom, debTo, activeInput]);

  const selectCity = (city) => {
    if (activeInput === "from") setFrom(city);
    if (activeInput === "to") setTo(city);
    setActiveInput(null);
    setResults([]);
    Keyboard.dismiss();
  };

  // dropdown item (used in mapped ScrollView below)
  const DropdownItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => selectCity(item)}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF2F6",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 15, color: "#111" }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }} >
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView style={{ padding: 20 }} >
            <AppHeader  />

            <Image
              source={require("../../assets/images/Frame 1 (3).png")}
              style={{
                width: 248,
                marginTop: 50,
                height: 223.89,
                resizeMode: "contain",
                marginBottom: 20,
                alignSelf: "center",
              }}
            />

            <Text style={{ fontSize: 24, fontWeight: "700", textAlign: "center", fontFamily: "bold", color:"#111827" }}>
              Find Your Bus Trip
            </Text>
            <Text
              style={{
                color: "#6B7280",
                marginTop: 10,
                marginBottom: 50,
                textAlign: "center",
                fontSize: 16,
                lineHeight: 20,
                fontFamily: "regular"
              }}
            >
              Search and book your intercity {"\n"} bus trips across Nigeria
            </Text>

            {/* Card */}
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 15,
                borderRadius: 10,
                borderRightColor: "#E5E7EB",
                elevation: 3,
                marginBottom: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Ionicons name="location-outline" size={14} color="black" />
                <Text style={{ marginLeft: 8, fontSize: 13, fontWeight: "600", fontFamily: "medium",  }}>From</Text>
              </View>

              {/* FROM input wrapper */}
              <View style={{ position: "relative", marginBottom: 10 }}>
                <TextInput
                  ref={fromRef}
                  placeholder="Select departure city"
                  placeholderTextColor={"#6B7280"}
                  value={from}
                  onChangeText={(t) => {
                    setFrom(t);
                    setActiveInput("from");
                  }}
                  onFocus={() => setActiveInput("from")}
                  style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#f1f5f9",
                    fontFamily: "regular"
                  }}
                />

                {activeInput === "from" && results.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: Platform.OS === "android" ? 54 : 56,
                      left: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      maxHeight: 200,
                      elevation: 6,
                      shadowColor: "#000",
                      shadowOpacity: 0.08,
                      zIndex: 999,
                    }}
                  >
                    <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 200 }}>
                      {results.map((r) => (
                        <DropdownItem key={r} item={r} />
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Ionicons name="location-outline" size={16} color="black" />
                <Text style={{ marginLeft: 8, fontSize: 13, fontWeight: "600", fontFamily: "medium"}}>To</Text>
              </View>

              <View style={{ position: "relative", marginBottom: 10 }}>
                <TextInput
                  ref={toRef}
                  placeholder="Select destination city"
                  placeholderTextColor={"#6B7280"}
                  value={to}
                  onChangeText={(t) => {
                    setTo(t);
                    setActiveInput("to");
                  }}
                  onFocus={() => setActiveInput("to")}
                  style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#f1f5f9",
                    fontFamily: "regular"
                  }}
                />

                {activeInput === "to" && results.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: Platform.OS === "android" ? 54 : 56,
                      left: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      maxHeight: 200,
                      elevation: 6,
                      shadowColor: "#000",
                      shadowOpacity: 0.08,
                      zIndex: 999,
                    }}
                  >
                    <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 200 }}>
                      {results.map((r) => (
                        <DropdownItem key={r} item={r} />
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text style={{ padding: 12, backgroundColor: "#fff", borderRadius: 8, marginBottom: 10 }}>
                  {date.toDateString()}
                </Text>
              </TouchableOpacity>

              {showDate && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(e, selectedDate) => {
                    setShowDate(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Switch value={nightTravel} onValueChange={setNightTravel} />
                <Text style={{ marginLeft: 10, fontSize: 13, fontFamily: "regular" }}>Night Travel Only</Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#1447E6",
                  padding: 15,
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={() => router.push("search")}
              >
                <Text style={{ color: "#fff", fontWeight: 500, fontFamily: "medium" }}>Search Trips</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 10}}>
              <Text style={{fontFamily: "regular", fontWeight: 400}}>Popular Routes </Text>
            </View>

            {/* Popular routes list — fixed layout for wrap */}
            {[
              { from: "Lagos", to: "Abuja" },
              { from: "Ibadan", to: "Enugu" },
              { from: "Port Harcourt", to: "Kano" },
            ].map((route, index) => (
              
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View style={{ flexBasis: "42%", minWidth: 0, paddingRight: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#101828", fontFamily: "regular" }}>{route.from}</Text>
                  <Text style={{ marginTop: 4, color: "#6b7280", fontSize: 12 }}>Departure</Text>
                </View>

                <View style={{ width: 40, alignItems: "center", justifyContent: "center" }}>
                  <Image source={require("../../assets/images/Icon (2).png")} style={{ width: 18, height: 18 }} resizeMode="contain" />
                </View>

                <View style={{ flexBasis: "42%", minWidth: 0, paddingLeft: 8, alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#101828", textAlign: "right", fontFamily: "regular" }}>{route.to}</Text>
                  <Text style={{ marginTop: 4, color: "#6A7282", fontSize: 11, textAlign: "right" }}>Destination</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}