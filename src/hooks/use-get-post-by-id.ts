import { useQuery } from "@tanstack/react-query";
import { useAsyncStorage } from "./use-async-storage";

export interface FatSecretIngredient {
  food_id: string;
  food_name: string;
  serving_id: string;
  number_of_units: string;
  measurement_description: string;
  ingredient_url: string;
  ingredient_description: string;
}

export interface FatSecretDirection {
  direction_number: string;
  direction_description: string;
}

export interface FatSecretRecipe {
  recipe_id: string;
  recipe_name: string;
  recipe_description: string;
  recipe_url: string;
  number_of_servings: string;
  preparation_time_min: string;
  cooking_time_min: string;
  rating: string;
  recipe_types?: { recipe_type: string | string[] };
  recipe_images?: { recipe_image: string | string[] };
  ingredients?: { ingredient: FatSecretIngredient | FatSecretIngredient[] };
  directions?: { direction: FatSecretDirection | FatSecretDirection[] };
}

const getRecipeById = async (accessToken: string, id: string): Promise<FatSecretRecipe> => {
  const url = new URL("https://platform.fatsecret.com/rest/recipe/v2");
  url.searchParams.set("recipe_id", id);
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.status}`);
  }

  const data = await response.json();
  return data.recipe;
};

export function useGetPostById(id: string) {
  const [accessToken] = useAsyncStorage("accessToken", "");
  return useQuery<FatSecretRecipe, Error>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(accessToken || "", id),
    enabled: Boolean(accessToken) && Boolean(id),
  });
}
