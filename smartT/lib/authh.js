// lib/authh.js
import { api } from "./api";

export async function signup(name, email, password, confirmPassword, phone) {
  // Keys must match the backend exactly
  return api("/auth/register", {
    method: "POST",
    body: { name, email, phone, password, confirmPassword }
  });
}