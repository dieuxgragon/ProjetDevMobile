import { useQuery } from "@tanstack/react-query";
import { useAsyncStorage } from "./use-async-storage";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const getRecipes = async (accessToken: string): Promise<Post[]> => {
  try {
    const response = await fetch(
      `https://platform.fatsecret.com/rest/recipes/search/v3`,
      {

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetRecipes() {
  const [accessToken] = useAsyncStorage("accessToken", "");
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () => getRecipes(accessToken || ""),
    enabled: Boolean(accessToken),
  });
}
