import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthentificate } from "../hooks/user-authentificate";

const queryClient = new QueryClient();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "onboarding",
  homeRouteName: "home",
  favoritesRouteName: "favoris",
  notificationsRouteName: "notifications",
  profileRouteName: "profile",
  searchRouteName: "search",
};

export default function Layout() {
  useAuthentificate();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
