import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPending, setUser } from "./toolkit/UserSlicer";
import { useEffect, useMemo } from "react";
import { Fetch } from "./middlewares/Fetch";
import Layout from "./components/layouts/main-layout";
import Loading from "./pages/loading";
import Login from "./pages/login";
import { Error } from "./pages/error";
import { Categories } from "./pages/categories";
import type { RootState } from "./store/RootStore";
import { Products } from "./pages/products";
import type { ErrorTypes } from "./types/RootTypes";
import { Admins } from "./pages/admins";

function App() {
  const dispatch = useDispatch();
  const { isAuth, isPending } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(setPending());
        const response = (await Fetch.get(`admin/me`)).data;
        (response);
        if (response.data) {
          dispatch(setUser(response.data));
        } else {
          dispatch(setError("Foydalanuvchi ma'lumotlari topilmadi"));
        }
      } catch (error) {
        const err = error as ErrorTypes;
        dispatch(setError(err.response?.data?.message || "Unknown error"));
      }
    }
    getMyData();
  }, [dispatch]);

  const router = useMemo(() => {
    if (isPending) {
      return createBrowserRouter([
        {
          path: "/",
          element: <Loading />,
        },
      ]);
    }
    if (isAuth) {
      return createBrowserRouter([
        {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
      ]);
    } else {
      return createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ]);
    }
  }, [isAuth, isPending]);

  return <RouterProvider router={router} />;
}

export default App;
