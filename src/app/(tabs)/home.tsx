import { Link, useFocusEffect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useAsyncStorage } from "../../hooks/use-async-storage";
import { useCallback } from "react";

export default function Home() {
  const router = useRouter();
  const [
    onboardingCompleted,
    setOnboardingCompleted,
    onboardingCompletedLoading,
  ] = useAsyncStorage("onboardingCompleted", false);

  const clearOnboardingCompleted = () => {
    setOnboardingCompleted(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (!onboardingCompleted && !onboardingCompletedLoading) {
        router.replace("/onboarding");
      }
    }, [onboardingCompleted, onboardingCompletedLoading]),
  );

  return (
    <View className="flex-1 py-8 justify-center items-center gap-4">
      <Text className="text-black text-2xl font-bold">Home</Text>
      <Link href="/details/12345" asChild>
        <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-md">
          <Text className="text-white text-md font-bold">{"Details"}</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={clearOnboardingCompleted}>
        <Text className="text-black text-md font-bold">
          {"Clear Onboarding Completed"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}