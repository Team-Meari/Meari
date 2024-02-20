import defaultAxios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetAxios = (config, type, axiosInstance = defaultAxios) => {
  const queryClient = useQueryClient();

  const dataFetch = async () => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [type],
    queryFn: dataFetch,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: true,
    refetchInterval: type === "userdata" ? null : 3000,
  });

  return { data, error, isLoading, refetch };
};

export const usePostAxios = (type, axiosInstance = defaultAxios) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["postdata"],
    mutationFn: async (config) => {
      try {
        const request = await axiosInstance({
          method: config.method,
          url: config.url,
          data: config.data, // 2024-02-16 일반 데이터 형식으로 표현
        });
        return request;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      if (type === "userdata")
        queryClient.invalidateQueries({ queryKey: ["userdata"] });
      else if (type === "mearidata")
        queryClient.invalidateQueries({ queryKey: ["mearidata"] });
    },
  });

  return { mutation };
};
