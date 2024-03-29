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
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      console.log("data: ", response);
      return response.data;
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
    enabled: type === "mearidata" ? true : false,
    refetchInterval: type === "mearidata" ? 60 * 5000 : null,
    retry: false,
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
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        });
        console.log("response: ", response);
        console.log("포스트 실행됨");
        return response;
      } catch (error) {
        console.log(error);
        console.log("포스트 실행됨");
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
      } else if (type === "reauth") {
        window.localStorage.setItem(
          "accessToken",
          response.data.tokenDto.accessToken
        );
        window.localStorage.setItem(
          "refreshToken",
          response.data.tokenDto.refreshToken
        );
      } else {
        console.log(response);
      }
    },
    onError: (response) => {
      console.log(response);
    },
  });

  return { mutation };
};
