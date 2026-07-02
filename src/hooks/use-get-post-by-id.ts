import { useQuery } from "@tanstack/react-query";
import { buildOAuth1Request } from "./user-authentificate";

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

const getRecipeById = async (id: string): Promise<FatSecretRecipe> => {
  const { url, headers } = buildOAuth1Request({
    method: 'recipe.get',
    recipe_id: id,
    format: 'json',
  });

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`Failed to fetch recipe: ${response.status}`);

  const data = await response.json();
  console.log("recipe response:", JSON.stringify(data).slice(0, 300));
  return data.recipe;
};

export function useGetPostById(id: string) {
  return useQuery<FatSecretRecipe, Error>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    enabled: Boolean(id),
  });
}
