import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPending, setUser } from "./toolkit/UserSlicer";
import { useEffect, useMemo } from "react";
import { Fetch } from "./middlewares/Fetch";
import Layout from "./components/layouts/main-layout";
import Loading from "./pages/loading";
import Login from "./pages/login";
import { Error } from "./pages/error";
import type { RootState } from "./store/RootStore";
import type { ErrorTypes } from "./types/RootTypes";
import { Admins } from "./pages/admins";
import { Blog } from "./pages/blog";
import { setAdmins, setAdminsError, setAdminsLoading } from "./toolkit/adminsSlicer";
import { setBlog, setBlogLoading, setBlogError } from "./toolkit/blogSlicer";
import { setService, setServiceError, setServiceLoading } from "./toolkit/serviceSlicer";
import { Service } from "./pages/service";
import { Story } from "./pages/story";
import { setStory, setStoryError, setStoryLoading } from "./toolkit/storySlicer";
import { Comment } from "./pages/comment";
import { setComment, setCommentError, setCommentLoading } from "./toolkit/commentSlicer";
import { setContact, setContactError, setContactLoading } from "./toolkit/contactsSlicer";
import { Contacts } from "./pages/contact";

function App() {
  const dispatch = useDispatch();
  const { isAuth, isPending, data } = useSelector((state: RootState) => state.user);
  console.log(isAuth, data);

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(setPending());
        const response = (await Fetch.get(`admin/get/me`)).data;

        (response);
        if (response) {
          dispatch(setUser(response));
        } else {
          dispatch(setError("Foydalanuvchi ma'lumotlari topilmadi"));
        }
      } catch (error) {
        const err = error as ErrorTypes;
        dispatch(setError(err.response?.data?.message || "Unknown error"));
      }
    }
    async function getAdmins() {
      try {
        dispatch(setAdminsLoading())
        const response = (await Fetch.get("admin")).data
        dispatch(setAdmins(response))
      } catch (error) {
        const err = error as ErrorTypes;
        dispatch(setAdminsError(err.response?.data?.message || "Unknown error"));
      }
    }
    async function getBlogs() {
      try {
        dispatch(setBlogLoading())
        const response = (await Fetch.get("blog")).data
        dispatch(setBlog(response))
      } catch (error) {
        const err = error as ErrorTypes
        dispatch(setBlogError(err.response.data.message || "Error in get all blogs"))
        console.log(error);
      }
    }
    async function getServices() {
      try {
        dispatch(setServiceLoading())
        const response = (await Fetch.get("service")).data
        dispatch(setService(response))
      } catch (error) {
        const err = error as ErrorTypes
        dispatch(setServiceError(err.response.data.message || "Error in get all services"))
        console.log(error);
      }
    }
    async function getStory() {
      try {
        dispatch(setStoryLoading())
        const response = (await Fetch.get("story")).data
        dispatch(setStory(response))
      } catch (error) {
        const err = error as ErrorTypes
        dispatch(setStoryError(err.response.data.message || "Error in get all stories"))
        console.log(error);
      }
    }
    async function getComments() {
      try {
        dispatch(setCommentLoading())
        const response = (await Fetch.get("comment")).data
        dispatch(setComment(response))
      } catch (error) {
        const err = error as ErrorTypes
        dispatch(setCommentError(err.response.data.message || "Error in get all stories"))
        console.log(error);
      }
    }
    async function getContacts() {
      try {
        dispatch(setContactLoading())
        const response = (await Fetch.get("contact")).data
        dispatch(setContact(response))
      } catch (error) {
        const err = error as ErrorTypes
        dispatch(setContactError(err.response.data.message || "Error in get all stories"))
        console.log(error);
      }
    }
    getMyData();
    getAdmins();
    getBlogs()
    getServices()
    getStory()
    getComments()
    getContacts()
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
              path: "/",
              element: <Contacts />,
            },
            {
              path: "services",
              element: <Service />,
            },
            {
              path: "blogs",
              element: <Blog />,
            },
            {
              path: "stories",
              element: <Story />,
            },
            {
              path: "comments",
              element: <Comment />,
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
