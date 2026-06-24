import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "onboarding",
  homeRouteName: "onboarding",
};

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
