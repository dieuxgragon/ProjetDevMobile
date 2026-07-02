import { useMutation } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const updatePostById = async (id: string, post: Post): Promise<Post> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
      },
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useUpdatePostById(id: string) {
  return useMutation<Post, Error, Post>({
    mutationFn: (post) => updatePostById(id, post),
  });
}
