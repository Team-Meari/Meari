import defaultAxios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetAxios = (config, axiosInstance = defaultAxios) => {
  const queryClient = useQueryClient();

  const userFetch = async () => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["userdata"],
    queryFn: userFetch,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  return { data, error, isLoading, refetch };
};

export const useSignUpAxios = (config, axiosInstance = defaultAxios) => {
  const queryClient = useQueryClient();

  const sendPost = async () => {
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
  };

  const mutation = useMutation({
    mutationKey: ["postdata"],
    mutationFn: sendPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
    },
  });

  return { mutation };
};
