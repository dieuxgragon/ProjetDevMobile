import { useFocusEffect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, Image, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { useAsyncStorage } from "../../hooks/use-async-storage";
import { useCallback, useState } from "react";
import { useGetRecipes, RecipeSearchResult } from "../../hooks/use-get-posts";

const WINDOW_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (WINDOW_WIDTH * (11 / 12) - 8) / 2;

export default function App() {
  const router = useRouter();
  const { data: recipes, isLoading, isError, error } = useGetRecipes();
  const [
    onboardingCompleted,
    ,
    onboardingCompletedLoading,
  ] = useAsyncStorage("onboardingCompleted", false);

  const [query, setQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (!onboardingCompleted && !onboardingCompletedLoading) {
        router.replace("/onboarding");
      }
    }, [onboardingCompleted, onboardingCompletedLoading]),
  );

  const renderRecipe = ({ item }: { item: RecipeSearchResult }) => (
    <TouchableOpacity
      style={{ backgroundColor: "#fffbf6", padding: 10, borderRadius: 5, width: CARD_WIDTH, marginBottom: 8 }}
      onPress={() => router.push(`/details/${item.recipe_id}`)}
    >
      <Image
        style={{ width: "100%", height: 80, borderRadius: 8, marginBottom: 6 }}
        source={item.recipe_image ? { uri: item.recipe_image } : require('../../../assets/picture_01.png')}
        resizeMode="cover"
      />
      <Text style={{ color: "#291C0E", fontSize: 13, fontWeight: "bold" }} numberOfLines={2}>
        {item.recipe_name}
      </Text>
    </TouchableOpacity>
  );

  const header = (
    <View style={{ paddingTop: 50, alignItems: "center", gap: 12 }}>
      <TextInput
        className="w-11/12 bg-[#F7F6F4] rounded-full px-5 py-3 text-black"
        placeholder="Search"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        style={{ fontSize: 16 }}
      />

      <Text className="text-2xl font-bold text-[#291C0E] mt-4">Categories</Text>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity style={{ backgroundColor: "#6E473B", padding: 10, borderRadius: 32 }} onPress={() => {}}>
          <Text style={{ color: "#F7F6F4", fontSize: 16, fontWeight: "bold" }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#BEB5A9", padding: 10, borderRadius: 32 }} onPress={() => {}}>
          <Text style={{ color: "#F7F6F4", fontSize: 16, fontWeight: "bold" }}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#BEB5A9", padding: 10, borderRadius: 32 }} onPress={() => {}}>
          <Text style={{ color: "#F7F6F4", fontSize: 16, fontWeight: "bold" }}>Drink</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "91.666%", marginTop: 16, paddingHorizontal: 8, gap: 8 }}>
        <Text className="text-2xl font-bold text-[#291C0E]">Recommendations</Text>
        <Text className="text-2xl font-bold text-[#BEB5A9]">Personalized</Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#7B3F2E" style={{ marginTop: 16 }} />}
      {isError && (
        <Text style={{ color: "red", marginTop: 16, paddingHorizontal: 16 }}>
          Erreur : {error?.message ?? "inconnue"}
        </Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={isLoading ? [] : (recipes ?? [])}
      keyExtractor={(item) => item.recipe_id}
      renderItem={renderRecipe}
      numColumns={2}
      ListHeaderComponent={header}
      columnWrapperStyle={{ gap: 8, paddingHorizontal: WINDOW_WIDTH / 24 }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
