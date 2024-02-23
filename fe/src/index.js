import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MyPage from "./routes/MyPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./routes/SignUp";
import { GlobalStyle } from "./css/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthProvider";

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyle />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);
