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
      staleTime: 30000,
      cacheTime: 50000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
    }
  );
}
export default useBillboard;
