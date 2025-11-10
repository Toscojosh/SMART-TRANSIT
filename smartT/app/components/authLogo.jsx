import { View, Text, Image } from "react-native";

export default function HeaderLogo() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        left: 20,
        marginTop: 40,
        marginBottom: 20,
      }}
    >
      <Image
        source={require("../../assets/images/Logo 2 (1).png")}
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "600", color: "#000000", fontFamily: "medium" }}>
        SmartTransit
      </Text>
    </View>
  );
}