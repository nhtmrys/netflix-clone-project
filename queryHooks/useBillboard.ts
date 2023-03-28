import { useQuery } from "react-query";

function useBillboard() {
  return useQuery(
    "billboardData",
    async () => {
      const response = await fetch(`/api/random`);
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
export default useBillboard;
