import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const getAccessToken = async () => {
  const clientId = 'd697dde6b9cc4bf895a0de0f43212b36';
  const clientSecret = '6cf9ff14dde24b82b9e98e054855ae73';
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch('https://oauth.fatsecret.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials&scope=basic',
  });
  const data = await response.json();
  return data.access_token as string;
};

// Not async — React hooks cannot be called inside async functions
export const useAuthentificate = () => {
  useEffect(() => {
    getAccessToken()
      .then((token) => {
        // JSON.stringify so useAsyncStorage can read it back with JSON.parse
        AsyncStorage.setItem("accessToken", JSON.stringify(token));
      })
      .catch(console.error);
  }, []);
};
