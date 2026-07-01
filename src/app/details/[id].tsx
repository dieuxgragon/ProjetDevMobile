import { Link, Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Image, Button, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";

type Ingredient = {
  id: string | number;
  name: string;
  quantity?: string;
};

type Recipe = {
  id: string | number;
  title: string;
  category: string;
  duration: string;
  author: string;
  likes: number;
  description: string;
  ingredients: Ingredient[];
};

const MOCK_RECIPE: Recipe = {
  id: "mock",
  title: "Strawberry French Toast",
  category: "Food",
  duration: "60 mins",
  author: "Elena Shelby",
  likes: 273,
  description:
    "Your recipe has been uploaded, you can see it on your profile.",
  ingredients: [
    { id: 1, name: "slices of bread", quantity: "2" },
    { id: 2, name: "egg", quantity: "1" },
    { id: 3, name: "cup milk", quantity: "1/4" },
    { id: 4, name: "tsp vanilla extract", quantity: "1/2" },
    { id: 5, name: "tsp ground cinnamon", quantity: "1/4" },
  ],
};

export default function Details() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const WINDOW_WIDTH = Dimensions.get("window").width;
  const WINDOW_HEIGHT = Dimensions.get("window").height;

  const handleBack = () => {
    router.back();
  };

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setUsingMockData(false);

        const response = await fetch(`https://TON_API_URL/recipes/${id}`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement de la recette");
        }

        const data: Recipe = await response.json();

        setRecipe(data);
        setIngredients(data.ingredients ?? []);
      } catch (err) {
        console.log("API injoignable, utilisation des données de secours:", err);
        setRecipe(MOCK_RECIPE);
        setIngredients(MOCK_RECIPE.ingredients);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    } else {
      setRecipe(MOCK_RECIPE);
      setIngredients(MOCK_RECIPE.ingredients);
      setUsingMockData(true);
      setLoading(false);
    }
  }, [id]);

  const ROW_HEIGHT = 48;
  const VISIBLE_ROWS = 4;
  const LIST_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;

  return (
    <View className="flex-1 bg-white">
      <View style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.42 }}>
        <Image
          source={require("../../../assets/Food_Goodcorner.png")}
          style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.42 }}
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={handleBack}
          className="absolute top-12 left-4 w-9 h-9 rounded-full bg-white/80 items-center justify-center"
        >
          <Text className="text-[#3A2B25] text-lg font-bold">{"‹"}</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 -mt-8 bg-white rounded-t-3xl px-6 pt-3">
        <View className="w-10 h-1.5 rounded-full bg-gray-200 self-center mb-4" />

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#7B3F2E" />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {usingMockData && (
              <View className="bg-yellow-50 rounded-lg px-3 py-2 mb-3">
                <Text className="text-yellow-700 text-xs">
                  Mode démo — données de test (API non connectée)
                </Text>
              </View>
            )}

            <Text className="text-[#7B3F2E] text-2xl font-bold">
              {recipe?.title}
            </Text>

            <View className="flex-row items-center mt-1">
              <Text className="text-gray-400 text-sm">{recipe?.category}</Text>
              <Text className="text-gray-400 text-sm mx-1">•</Text>
              <Text className="text-gray-400 text-sm">{recipe?.duration}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-4 pb-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-gray-300 mr-2 overflow-hidden" />
                <Text className="text-[#3A2B25] font-bold">{recipe?.author}</Text>
              </View>

              <TouchableOpacity
                onPress={handleLike}
                className="flex-row items-center"
              >
                <View
                  className="w-7 h-7 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: liked ? "#B5493C" : "#F3E5DE" }}
                >
                  <Text style={{ color: liked ? "#FFFFFF" : "#B5493C" }}>
                    {"♥"}
                  </Text>
                </View>
                <Text className="text-[#7B3F2E] font-bold">
                  {likesCount} Likes
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-[#7B3F2E] text-lg font-bold mt-4">
              Description
            </Text>
            <Text className="text-gray-400 text-sm mt-2 leading-5 pb-4 border-b border-gray-100">
              {recipe?.description}
            </Text>

            <View className="flex-row items-center justify-between mt-4 mb-2">
              <Text className="text-[#7B3F2E] text-lg font-bold">
                Ingredients
              </Text>
              <Text className="text-gray-400 text-sm">
                {ingredients.length} item{ingredients.length > 1 ? "s" : ""}
              </Text>
            </View>

            <View style={{ height: LIST_HEIGHT }}>
              <FlatList
                data={ingredients}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={ROW_HEIGHT}
                decelerationRate="fast"
                renderItem={({ item }) => (
                  <View style={{ height: ROW_HEIGHT }} className="justify-center">
                    <Text className="text-[#3A2B25] text-base">
                      {item.quantity ? `${item.quantity} ` : ""}
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}