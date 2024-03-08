import defaultAxios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import userContext from "../contexts/UserProvider";

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
    refetchInterval: type === "mearidata" ? 3000 : null,
  });

  return { data, error, isLoading, refetch };
};

export const usePostAxios = (type, axiosInstance = defaultAxios) => {
  const queryClient = useQueryClient();
  const { setAuth } = useContext(AuthContext);
  const { setNickname, setMemberId } = useContext(userContext);

  const mutation = useMutation({
    mutationKey: ["postdata"],
    mutationFn: async (config) => {
      try {
        const response = await axiosInstance({
          method: config.method,
          url: config.url,
          data: config.data, // 2024-02-16 일반 데이터 형식으로 표현
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
          response.data.tokenDto.accessToken
        );
        window.localStorage.setItem(
          "refreshToken",
          response.data.tokenDto.refreshToken
        );
        setAuth(true);
        setNickname(response.data.memberResDto.nickname);
        setMemberId(response.data.memberResDto.memberId);
        console.log(response.data.memberResDto);
      }
    },
  });

  return { mutation };
};
