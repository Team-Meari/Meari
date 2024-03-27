import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MyPage from "./routes/MyPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./css/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthProvider";
import { UserProvider } from "./contexts/UserProvider";
import { WidthProvider } from "./contexts/WidthProvider";
import { ModalProvider } from "./contexts/ModalProvider";

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/mypage/:nickname/:memberId",
    element: <MyPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyle />
    <WidthProvider>
      <AuthProvider>
        <UserProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </UserProvider>
      </AuthProvider>
    </WidthProvider>
  </QueryClientProvider>
);
