"use client";

import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Lang {
  en: string;
  kr: string;
  ru: string;
  uz: string;
}

interface CommentTypes {
  _id?: string;
  createdAt?: string;
  name: Lang;
  text: Lang;
  image?: string;
  job: Lang;
}

export const Comments = () => {
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { i18n } = useTranslation();

  useEffect(() => {
    const getAllComments = async () => {
      try {
        setLoading(true);
        setError("");
        const res = (await Fetch.get("comment")).data;
        setComments(res || []);
      } catch (err) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    getAllComments();
  }, []);

  return (
    <div className="w-full px-[5%] md:px-[10%] pb-20 bg-[#f7f7f7]">

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20">Loading...</div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}

      {/* CAROUSEL */}
      {!loading && !error && (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <div className="flex justify-end gap-3 mb-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
          <CarouselContent>

            {comments.map((item, idx) => (
              <CarouselItem
                key={item._id || idx}
                className="md:basis-1/2 lg:basis-1/2"
              >
                <div className="p-2">
                  <div className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 h-full">

                    <img
                      src={item.image || "/avatar.png"}
                      alt="user"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border"
                    />

                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-[#1e3d38] text-lg">
                          {item.name[i18n.language as keyof Lang]}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.job[i18n.language as keyof Lang]}
                        </p>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-xs md:text-base">
                        {item.text[i18n.language as keyof Lang]}
                      </p>
                    </div>

                  </div>
                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

        </Carousel>
      )}
    </div>
  );
};