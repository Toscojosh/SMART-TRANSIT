// lib/api.js
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = Constants.expoConfig?.extra?.API_URL || "";

export async function api(path, { method = "GET", headers = {}, body } = {}) {
  const token = await AsyncStorage.getItem("authToken");

  const h = { "Content-Type": "application/json", ...headers };
  if (token) h.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Try to parse JSON safely
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = data?.message || data?.error || HTTP `${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}