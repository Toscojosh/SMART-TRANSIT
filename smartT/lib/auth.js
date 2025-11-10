// lib/authh.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

export async function login(email, password) {
  // call backend
  const res = await api("/auth/login", {
    method: "POST",
    body: { email: email?.trim(), password: password?.trim() },
  });

  // try common token field names
  const token =
    res?.token ??
    res?.accessToken ??
    res?.jwt ??
    res?.data?.token ??
    res?.data?.accessToken ??
    null;

  if (!token) {
    // surface backend message if present
    const msg = res?.message || res?.error || "No token returned from server";
    throw new Error(msg);
  }

  await AsyncStorage.setItem("authToken", String(token));
  return res;
}