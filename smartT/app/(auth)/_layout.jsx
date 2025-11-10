import { Stack } from "expo-router";
import { useFonts } from "expo-font"

export default function RootLayout() {


  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="login-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-up2" />
      <Stack.Screen name="sign-up3" />
    </Stack>
  )
}
