import { Link, useFocusEffect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Button, TextInput } from "react-native";
import { useAsyncStorage } from "../../hooks/use-async-storage";
import { useCallback, useState } from "react";

export default function App() {
  const router = useRouter();
  const [
    onboardingCompleted,
    setOnboardingCompleted,
    onboardingCompletedLoading,
  ] = useAsyncStorage("onboardingCompleted", false);

  const clearOnboardingCompleted = () => {
    setOnboardingCompleted(false);
  };

  const [query, setQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (!onboardingCompleted && !onboardingCompletedLoading) {
        router.replace("/onboarding");
      }
    }, [onboardingCompleted, onboardingCompletedLoading]),
  );

  return (
    <View className="flex-1 py-8 justify-top items-center gap-4"
      style={{ paddingTop: 50 }}
    >
      <TextInput
        className="w-11/12 bg-[#F7F6F4] rounded-full px-5 py-3 text-black "
        placeholder="Search"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        style={{ fontSize: 16 }}
      />
      <View className="flex-row justify-between w-11/12 mt-4">
        <Button
          title="All"
          color="#6E473B"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => { }}
        />
        <Button
          onPress={() => { }}
          title="Food"
          color="#F7F6F4"
          textColor="#BEB5A9"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => { }}
          title="Drinks"
          color="#F7F6F4"
          textColor="#BEB5A9"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>


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
