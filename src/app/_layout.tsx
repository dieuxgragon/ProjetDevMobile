import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "onboarding",
  homeRouteName: "home",
  favoritesRouteName: "favoris",
  notificationsRouteName: "notifications",
  profileRouteName: "profile",
  searchRouteName: "search",
};

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
