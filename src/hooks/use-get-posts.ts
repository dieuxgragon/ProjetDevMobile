import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "./user-authentificate";

export interface RecipeSearchResult {
  recipe_id: string;
  recipe_name: string;
  recipe_image?: string;
  recipe_description?: string;
}

const getRecipes = async (accessToken: string): Promise<RecipeSearchResult[]> => {
  const url = new URL("https://platform.fatsecret.com/rest/recipes/search/v3");
  url.searchParams.set("format", "json");
  url.searchParams.set("max_results", "10");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) throw new Error(`Failed to fetch recipes: ${response.status}`);

  const data = await response.json();
  console.log("recipes response:", JSON.stringify(data).slice(0, 300));
  const recipes = data?.recipes?.recipe;
  if (!recipes) return [];
  return Array.isArray(recipes) ? recipes : [recipes];
};

export function useGetRecipes() {
  const { data: accessToken } = useAccessToken();
  return useQuery<RecipeSearchResult[], Error>({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(accessToken!),
    enabled: Boolean(accessToken),
  });
}
