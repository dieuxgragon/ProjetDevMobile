import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const getPostById = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(
      'https://fatsecret4.p.rapidapi.com/rest/server.api?recipe_id=${id}&format=json&method=recipe.get.v2',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': '0d176db69dmsh8c69e4e9ac832c0p1ebcacjsnabdd7baa245d',
          'x-rapidapi-host': 'fatsecret4.p.rapidapi.com'
        }
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetPostById(id: string) {
  return useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: Boolean(id),
  });
}
