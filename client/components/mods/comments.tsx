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
  const title = {
    uz: "Mijozlarimizning fikrlari",
    en: "What our clients say",
    ru: "Отзывы наших клиентов",
    kr: "고객의 소리",
  }
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
    <div className="w-full px-[5%] md:px-[10%] pt-40 pb-20 bg-[#f7f7f7]">
      <h2 className="text-4xl md:text-5xl font-semibold">
        {title[i18n.language as keyof typeof title]}
      </h2>
      {loading && (
        <Carousel className="w-full">

          <div className="flex justify-end gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          </div>

          <CarouselContent>
            {[...Array(4)].map((_, idx) => (
              <CarouselItem
                key={idx}
                className="md:basis-1/2 lg:basis-1/2"
              >
                <div className="p-2">
                  <div className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm h-full">

                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 animate-pulse" />

                    <div className="flex-1 space-y-3">

                      <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />

                      <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse" />

                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-4" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                    </div>

                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}

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