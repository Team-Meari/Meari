import defaultAxios from "axios";
import { useEffect, useState } from "react";

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
    })
      .then((response) => {
        // setState({
        //   data: response,
        //   error: null,
        //   loading: false,
        // });
        console.log(response);
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
