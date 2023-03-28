import { useQuery } from "react-query";

function useMovie(id?: string) {
  return useQuery(
    ["movie", id],
    async () => {
      if (id) {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      } else {
        return null;
      }
    },
    {
      enabled: Boolean(id),
      staleTime: 30000,
      cacheTime: 50000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
}

export default useMovie;
