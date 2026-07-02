import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const getRecipes = async (): Promise<Post[]> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetRecipes() {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () => getRecipes(),
  });
}
