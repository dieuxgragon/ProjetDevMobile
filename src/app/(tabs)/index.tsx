import { Link, useFocusEffect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, Image, Dimensions } from "react-native";
import { useAsyncStorage } from "../../hooks/use-async-storage";
import { useCallback, useState } from "react";
import { useGetRecipes } from "../../hooks/use-get-posts";

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function App() {
  const router = useRouter();
  const {data}= useGetRecipes();
  console.log(data)
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
      <Text className="text-2xl font-bold text-[#291C0E] mt-4 ">Categories</Text>

      <View className="flex-row justify-bet">
        <TouchableOpacity style={{ backgroundColor: "#6E473B", padding: 10, borderRadius: 32 }} onPress={() => router.push("/details/91")}>
          <Text style={{ color: "#F7F6F4", fontSize: 16, fontWeight: "bold" }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#BEB5A9", padding: 10, borderRadius: 32 }} onPress={() => { }}>
          <Text style={{ color: "#F7F6F4", fontSize: 16, fontWeight: "bold" }}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#BEB5A9", padding: 10, borderRadius: 32 }} onPress={() => { }}>
          <Text style={{ color: "#F7F6F4", fontSize: 16, fontWeight: "bold" }}>Drink</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between w-11/12 mt-4 p-2 gap-2">
        <Text className="text-2xl font-bold text-[#291C0E] mt-4 ">Recommendations</Text>
        <Text className="text-2xl font-bold text-[#BEB5A9] mt-4 ">Personalized</Text>
      </View>

      <View className="flex-row justify-between w-11/12 mt-4 p-2 gap-2" >
      
        <TouchableOpacity style={{ backgroundColor: "#fffbf6", padding: 10, borderRadius: 5 }} onPress={() => router.push("/details/91")}>
          <View className="flex-row gap-2 items-center">
            <Image
              style={{ width: 31, height: 31, borderRadius: 11 }}
              source={require('../../../assets/picture_01.png')}
            />
            <Text style={{ color: "#291C0E", fontSize: 16, fontWeight: "bold" }}>Name_01</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: "#fffbf6", padding: 10, borderRadius: 5, width: '48%', height: 100 }} onPress={() => router.push("/details/91")}>
          <View className="flex-row gap-2 items-center">
            <Image
              style={{ width: 31, height: 31, borderRadius: 11 }}
              source={require('../../../assets/picture_01.png')}
            />
            <Text style={{ color: "#291C0E", fontSize: 16, fontWeight: "bold" }}>Name_02</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}
