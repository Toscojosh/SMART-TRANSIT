import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, onBook } from "react-native";
import AppHeader from "../components/dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import BookNowButton from "../components/bookNow";
import { router } from "expo-router";
import SearchSummaryBar from "../components/searchbar";
import { useLocalSearchParams } from "expo-router";


// Step 1: Sample data (a few trips)
const trips = [
  { id: "1", company: "ABC Transport", from: "Lagos", to: "Abuja", price: "₦12,893", image: require("../../assets/images/bus1.png"), departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "23 seats available" },
  { id: "2", company: "Peace Mass Transit", from: "Lagos", to: "Enugu", price: "₦9,733", image: require("../../assets/images/bus2.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "18 seats available"  },
  { id: "3", company: "GUO Transport", from: "Lagos", to: "Kano", price: "₦10,200", image: require("../../assets/images/bus3.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "20 seats available" },
  { id: "4", company: "ABC Transport", from: "Lagos", to: "Abuja", price: "₦12,893", image: require("../../assets/images/bus4.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "9 seats available"  },
  { id: "5", company: "Peace Mass Transit", from: "Lagos", to: "Enugu", price: "₦9,733", image: require("../../assets/images/bus1.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "5 seats available"  },
  { id: "6", company: "GUO Transport", from: "Lagos", to: "Kano", price: "₦10,200", image: require("../../assets/images/bus1.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "16 seats available" },
  { id: "7", company: "Peace Mass Transit", from: "Lagos", to: "Enugu", price: "₦9,733", image: require("../../assets/images/bus1.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "16 seats available"  },
  { id: "8", company: "GUO Transport", from: "Lagos", to: "Kano", price: "₦10,200", image: require("../../assets/images/bus1.png"),  departTime: "06:00 AM", arriveTime: "02:00 PM", duration: "8h", seats: "16 seats available" },
];


// Step 2: The main screen
export default function TripListScreen() {
  // Step 3: This function decides how each trip looks

  // ADDED: read params coming from the search form
const { from, to, dateISO } = useLocalSearchParams();
// ADDED: convert ISO string back to Date for display
const pickedDate = dateISO ? new Date(dateISO) : new Date();

  const renderTrip = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        justifyContent: "space-between"
      }}
    >
      <View style={{ backgroundColor:'#fff', padding:16, borderRadius:16, marginBottom:12, elevation:3 }}>
      {/* Top: icon + company + seats */}
      <View style={{ flexDirection:'row', alignItems:'center', marginBottom:8 }}>
        <Image source={item.image} style={{ width:40, height:40, marginRight:12 }} />
        <View style={{ flex:1, marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight:400, color:'#101828', fontFamily: "regular" }}>{item.company}</Text>
          <Text style={{ color:'#00C950', fontSize:14, marginTop:2, fontFamily: "regular" }}>{item.seats} </Text>
        </View>
      </View>

      {/* Middle: 3 columns */}
      <View style={{ flexDirection:'row', alignItems:'center', marginTop:8 }}>
        {/* left */}
        <View style={{ flex:1 }}>
          <Text style={{ fontSize:16, fontWeight:'600', color:'#101828', fontFamily: "regular" }}>{item.departTime}</Text>
          <Text style={{ fontSize:14, color:'#6B7280', marginTop:2, fontFamily: "regular" }}>{item.from}</Text>
        </View>

        {/* divider */}
        <View style={{  height:10, marginHorizontal: 12, backgroundColor:'#D1D5DC' }} />

        {/* middle */}
        <View style={{ width:70, alignItems:'center' }}>
          <Ionicons name="time-outline" size={16} color="#101828" />
          <Text style={{ fontSize:14, color:'#101828', marginTop:2, fontFamily: "regular" }}>{item.duration}</Text>
        </View>

        {/* divider */}
        <View style={{  height:1, marginHorizontal: 12, backgroundColor:'#D1D5DC' }} />

        {/* right */}
        <View style={{ flex:1, alignItems:'flex-end' }}>
          <Text style={{ fontSize:16, fontWeight:'600', color:'#101828', fontFamily: "regular" }}>{item.arriveTime}</Text>
          <Text style={{ fontSize:14, color:'#6B7280', marginTop:2, fontFamily: "regular" }}>{item.to}</Text>
        </View>
  </View>

  {/* Bottom: price + button */}
  <View style={{ flexDirection:'row', alignItems:'center', marginTop: 25 }}>
    <Text style={{ color:'#1447E6', fontSize:16, fontWeight:'700', fontFamily: "regular" }}>{item.price}</Text>

    <BookNowButton onPress={() => router.push("tripDetails")}/>

  </View>
</View>

    </View>
  );

  // Step 4: What shows up on screen
  return (
    
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <AppHeader/>
      
      <SearchSummaryBar
        from={from || "Lagos"}
        to={to || "Abuja"}
        date={pickedDate}
        onModifyPress={() => router.back()}   // or route to your search form
      />

      <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 20, marginBottom: 20, fontFamily: "regular" }}>
        Available Trips (8)
      </Text>

      {/* Step 5: The FlatList shows all trips */}
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item.id}
      />

    </SafeAreaView>
  );
}