import defaultAxios from "axios";
import { useState } from "react";

export const useGetAxios = (config, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const userFetch = () => {
    axiosInstance({
      method: config.method,
      url: config.url,
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    })
      .then((response) => {
        setState({
          data: response.data,
          error: null,
          loading: false,
        });
        console.log(response.data);
      })
      .catch((error) => {
        setState({
          data: null,
          error: error,
          loading: false,
        });
      });
  };

  return { ...state, userFetch };
};

export const usePostAxios = (config, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
  });

  const sendPost = () => {
    axiosInstance({
      method: config.method,
      url: config.url,
      data: {
        email: config.data.email,
        password: config.data.password,
        nickname: config.data.nickname,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setState({
          error: error,
          loading: false,
        });
        console.log(error);
      });
  };

  return { ...state, sendPost };
};
