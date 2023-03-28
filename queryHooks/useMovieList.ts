import { useQuery } from "react-query";

function useMovieList() {
  return useQuery(
    "movieListData",
    async () => {
      const response = await fetch(`/api/movies`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      staleTime: 3000,
      cacheTime: 5000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
    }
  );
}

export default useMovieList;
