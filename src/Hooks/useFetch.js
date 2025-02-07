import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useFetch(url, queryKey) {
  const { data, isError, isLoading, error } = useQuery({
    queryKey:[queryKey],
    queryFn: getBrandsAndCategories,
    select: (data) => data.data.data,
  });

  async function getBrandsAndCategories() {
    return axios.get(url);
  }
  return { data, isLoading, isError, error };
}

export default useFetch;
