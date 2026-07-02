import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Image, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useState } from "react";
import { useGetPostById, FatSecretIngredient, FatSecretDirection } from "../../hooks/use-get-post-by-id";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

function normalizeArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = useGetPostById(id ?? "");

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleBack = () => router.back();

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const category = data?.recipe_types
    ? normalizeArray(data.recipe_types.recipe_type)[0] ?? ""
    : "";

  const totalTime =
    Number(data?.preparation_time_min ?? 0) + Number(data?.cooking_time_min ?? 0);
  const duration = totalTime ? `${totalTime} mins` : "";

  const ingredients = normalizeArray<FatSecretIngredient>(
    data?.ingredients?.ingredient
  );

  const directions = normalizeArray<FatSecretDirection>(
    data?.directions?.direction
  );

  const imageUrl = normalizeArray<string>(data?.recipe_images?.recipe_image)[0];

  return (
    <View className="flex-1 bg-white">
      <View className="absolute top-0 left-0 right-0">
        <Image
          source={imageUrl ? { uri: imageUrl } : require("../../../assets/Food_Goodcorner.png")}
          style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.5 }}
          resizeMode="cover"
        />
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#7B3F2E" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-[#7B3F2E] text-base text-center">
            Impossible de charger la recette.
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View
            className="flex-1 bg-white rounded-t-3xl px-6 pt-3"
            style={{ marginTop: WINDOW_HEIGHT * 0.42, paddingBottom: 500 }}
          >
            <View className="w-10 h-1.5 rounded-full bg-gray-200 self-center mb-4" />

            <Text className="text-[#7B3F2E] text-2xl font-bold">
              {data?.recipe_name}
            </Text>

            <View className="flex-row items-center mt-1">
              <Text className="text-gray-400 text-sm">{category}</Text>
              {category && duration ? (
                <Text className="text-gray-400 text-sm mx-1">•</Text>
              ) : null}
              <Text className="text-gray-400 text-sm">{duration}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-4 pb-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-gray-300 mr-2 overflow-hidden" />
                <Text className="text-[#3A2B25] font-bold">FatSecret</Text>
              </View>

              <TouchableOpacity onPress={handleLike} className="flex-row items-center">
                <View
                  className="w-7 h-7 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: liked ? "#B5493C" : "#F3E5DE" }}
                >
                  <Text style={{ color: liked ? "#FFFFFF" : "#B5493C" }}>{"♥"}</Text>
                </View>
                <Text className="text-[#7B3F2E] font-bold">{likesCount} Likes</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-[#7B3F2E] text-lg font-bold mt-4">Description</Text>
            <Text className="text-gray-400 text-sm mt-2 leading-5 pb-4 border-b border-gray-100">
              {data?.recipe_description || "Aucune description disponible."}
            </Text>

            <View className="flex-row items-center justify-between mt-4 mb-2">
              <Text className="text-[#7B3F2E] text-lg font-bold">Ingredients</Text>
              <Text className="text-gray-400 text-sm">
                {ingredients.length} item{ingredients.length > 1 ? "s" : ""}
              </Text>
            </View>

            <FlatList
              data={ingredients}
              keyExtractor={(item) => item.food_id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="py-1">
                  <Text className="text-[#3A2B25] text-base">
                    {item.ingredient_description || item.food_name}
                  </Text>
                </View>
              )}
            />

            {directions.length > 0 && (
              <>
                <Text className="text-[#7B3F2E] text-lg font-bold mt-6 mb-2">
                  Préparation
                </Text>
                {directions.map((step) => (
                  <View key={step.direction_number} className="flex-row mb-4">
                    <View className="w-6 h-6 rounded-full bg-[#7B3F2E] items-center justify-center mr-3 mt-0.5 shrink-0">
                      <Text className="text-white text-xs font-bold">
                        {step.direction_number}
                      </Text>
                    </View>
                    <Text className="text-[#3A2B25] text-sm leading-5 flex-1">
                      {step.direction_description}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={handleBack}
        className="absolute top-12 left-4 w-9 h-9 rounded-full bg-white/80 items-center justify-center"
      >
        <Text className="text-[#3A2B25] text-lg font-bold">{"‹"}</Text>
      </TouchableOpacity>
    </View>
  );
}
