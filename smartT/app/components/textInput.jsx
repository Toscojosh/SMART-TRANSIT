// components/textInput.jsx
import { TextInput } from "react-native";

export default function AppInput({ value, secureTextEntry, autoCapitalize, keyboardType, onChangeText, style, ...props }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType ?? "default"}
      autoCapitalize={autoCapitalize ??"none"}
      style={[{ backgroundColor:"#fff", borderWidth:2, borderColor:"#E5E7EB", borderRadius:10, padding:12, marginBottom:12, fontFamily: "regular" }, style]}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}