"use client";

import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";

export const OurStory = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllStory = async () => {
      try {
        setLoading(true);
        setError("");
        const response = (await Fetch.get("story")).data;
        setStories(response);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getAllStory();
  }, []);

  return (
    <div className="bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
      <div className="flex items-center flex-col">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold rounded">
          Our Story
        </span>

        <h1 className="text-center text-[#234F72] text-3xl md:text-5xl mt-4 font-semibold">
          A story of our dedication, <br className="hidden md:block" />
          expertise, and lasting results
        </h1>

        <p className="text-center mt-4 text-gray-500 max-w-2xl">
          Our team has a proven track record of success and is dedicated to
          helping you achieve financial stability and security.
        </p>
      </div>

      {error && (
        <div className="mt-16 bg-red-100 text-red-600 px-6 py-4 rounded-md text-center">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-20 flex flex-col gap-20 animate-pulse">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <div className="flex justify-center">
              <div className="w-[420px] h-[250px] bg-gray-300 rounded-xl" />
            </div>

            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-3" />
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-4" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="relative mt-20">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gray-300 -translate-x-1/2" />

          <div className="flex flex-col gap-24">
            {stories.map(({ image, title, text, year }, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative"
              >
                <div
                  className={`flex justify-center ${index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                >
                  <img
                    src={image}
                    alt={title}
                    width={420}
                    height={250}
                    className="rounded-xl object-cover"
                  />
                </div>

                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-white border-4 border-gray-400 rounded-full -translate-x-1/2" />
                <div
                  className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"
                    } md:pl-12`}
                >
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-500 font-semibold">
                    {year}
                  </span>

                  <h2 className="text-2xl md:text-3xl mt-3 font-semibold">
                    {title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
