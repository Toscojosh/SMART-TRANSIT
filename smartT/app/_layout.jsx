import { Stack } from "expo-router";
import { useFonts } from "expo-font"

export default function RootLayout() {

  const {} = useFonts({
    "bold" : require("../assets/fonts/Inter (1)/static/Inter_18pt-Bold.ttf"),
    "regular" : require("../assets/fonts/Inter (1)/static/Inter_18pt-Regular.ttf"),
    "medium" : require("../assets/fonts/Inter (1)/static/Inter_18pt-Medium.ttf"),
    "semi-bold" : require("../assets/fonts/Inter (1)/static/Inter_18pt-SemiBold.ttf"),
    "extra-bold" : require("../assets/fonts/Inter (1)/static/Inter_18pt-ExtraBold.ttf"),
    "poppins-medium" : require("../assets/fonts/Poppins (1)/Poppins-Medium.ttf"),
    "poppins-regular" :  require("../assets/fonts/Poppins (1)/Poppins-Regular.ttf"),
  })

  return (
    <Stack screenOptions={{ headerShown: false}} />
 
  )
}
