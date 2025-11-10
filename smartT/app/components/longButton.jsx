// components/PrimaryButton.jsx
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FF6B35",
        paddingVertical: 14,
        borderRadius: 10,
        width: 347,
        height: 48,
        alignItems: "center",
        width: "100%",
        marginVertical: 10,
        ...style, // allow custom styling when needed
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}