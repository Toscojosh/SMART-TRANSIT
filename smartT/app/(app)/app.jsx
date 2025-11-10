// App.jsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripListScreen from "./search";
import BookingScreen from "./tripDetails";
import PaymentScreen from "./paymentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FindTrip"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="FindTrip" component={FindTripScreen} />
        <Stack.Screen name="SelectTrip" component={TripListScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}