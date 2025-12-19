"use client"
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Footer from "./footer";

export default function BlogsComponent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = (await Fetch.get("blog")).data;
        setBlogs(response);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-[#0f3d3a] h-[10vh]" />

      <div className="bg-[#f7f7f7] px-[5%] md:px-[10%] py-8 flex flex-col items-center">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
          Latest Blogs
        </span>

        <h1 className="text-center text-3xl md:text-4xl mt-4 font-semibold">
          Don't miss our latest updates and insights
        </h1>

        <p className="text-center mt-4 text-gray-500 max-w-2xl">
          Stay informed with RT Holding's latest news, articles, and expert insights
          on financial trends and strategies.
        </p>

        {error && (
          <div className="mt-10 bg-[#cafaaa] text-red-600 font-semibold px-6 py-4 rounded-md">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-md shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300" />
                <div className="p-4">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full">
            {blogs.map(({ title, text, image }, index) => (
              <div
                key={index}
                className="bg-white rounded-md overflow-hidden shadow-md relative"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover"
                />

                <span className="bg-[#0f3d3a] text-white py-1 px-2 font-semibold text-sm absolute top-2 left-2">
                  Blog
                </span>

                <div className="p-4">
                  <h2 className="text-xl font-semibold mt-2 line-clamp-2">
                    {title}
                  </h2>

                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {text}
                  </p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
