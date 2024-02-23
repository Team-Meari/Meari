import defaultAxios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

export const useGetAxios = (config, type, axiosInstance = defaultAxios) => {
  const dataFetch = async () => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      //console.log(response);
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
  const { setAuth } = useContext(AuthContext);

  const mutation = useMutation({
    mutationKey: ["postdata"],
    mutationFn: async (config) => {
      try {
        const response = await axiosInstance({
          method: config.method,
          url: config.url,
          data: config.data, // 2024-02-16 일반 데이터 형식으로 표현
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (response) => {
      if (type === "userdata")
        queryClient.invalidateQueries({ queryKey: ["userdata"] });
      else if (type === "mearidata")
        queryClient.invalidateQueries({ queryKey: ["mearidata"] });
      else if (type === "auth") {
        window.localStorage.setItem(
          "accessToken",
          response.headers.getAuthorization()
        );
        setAuth(true);
        console.log(response);
      }
    },
  });

  return { mutation };
};
