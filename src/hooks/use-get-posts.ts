import { useQuery } from "@tanstack/react-query";
import { buildOAuth1Request } from "./user-authentificate";

export interface RecipeSearchResult {
  recipe_id: string;
  recipe_name: string;
  recipe_image?: string;
  recipe_description?: string;
}

const getRecipes = async (): Promise<RecipeSearchResult[]> => {
  const { url, headers } = buildOAuth1Request({
    method: 'recipes.search',
    format: 'json',
    max_results: '10',
  });

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`Failed to fetch recipes: ${response.status}`);

  const data = await response.json();
  console.log("recipes response:", JSON.stringify(data).slice(0, 300));
  const recipes = data?.recipes?.recipe;
  if (!recipes) return [];
  return Array.isArray(recipes) ? recipes : [recipes];
};

export function useGetRecipes() {
  return useQuery<RecipeSearchResult[], Error>({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
}
