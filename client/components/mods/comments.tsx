"use client";

import { Fetch } from "@/middlewares/Fetch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  job: Lang
}

export const Comments = () => {
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation("common", { keyPrefix: "testimonials" });
  useEffect(() => {
    const getAllComments = async () => {
      try {
        setLoading(true);
        setError("");
        const res = (await Fetch.get("comment")).data;
        setComments(res || []);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getAllComments();
  }, []);

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < comments.length - 1) {
      setIndex(index + 1);
    }
  };

  const hasPrev = index > 0;
  const hasNext = index < comments.length - 1;

  return (
    <div className="w-full px-[10%] py-20 grid grid-cols-1 lg:grid-cols-2 bg-[#f7f7f7] gap-10 items-center">

      <div>
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
          {t('badge')}
        </span>

        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mt-6">
          {t('title')}
        </h1>

        <Link href={"/services/#contact"} >
          <button className="mt-10 bg-[#234F72] text-white px-6 py-3 rounded-full font-semibold">
            {t('contact')}
          </button>
        </Link>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-sm relative min-h-[300px]">

        {loading && (
          <div className="animate-pulse space-y-6">
            <div className="w-10 h-10 bg-gray-300 rounded"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-5/6"></div>
            <div className="flex items-center gap-4 mt-10">
              <div className="w-14 h-14 rounded-full bg-gray-300"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 w-32 rounded"></div>
                <div className="h-3 bg-gray-200 w-40 rounded"></div>
              </div>
            </div>
          </div>
        )}

        {!loading && error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}

        {!loading && !error && comments.length > 0 && (
          <>
            <div className="text-[#0f3d3a] text-4xl md:text-5xl h-full">“</div>

            <p className="md:mt-4 text-gray-700 leading-relaxed  md:text-lg">
              {comments[index]?.text[i18n.language as keyof Lang]}
            </p>

            <div className="flex items-center gap-4 mt-10">
              <img
                src={comments[index]?.image || "/avatar.png"}
                alt="User"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-[#1e3d38]">
                  {comments[index]?.name[i18n.language as keyof Lang]}
                </h3>
                <p className="text-sm text-gray-500">
                  {comments[index]?.job[i18n.language as keyof Lang]}
                </p>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 md:bottom-8 md:right-8 flex items-center gap-4">
              <button
                onClick={prev}
                disabled={!hasPrev}
                className={`w-10 h-10 rounded-full shadow flex items-center justify-center transition
                  ${hasPrev
                    ? "bg-[#0f3d3a] text-white hover:bg-[#0f3d3a]/80"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                `}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={next}
                disabled={!hasNext}
                className={`w-10 h-10 rounded-full shadow flex items-center justify-center transition
                  ${hasNext
                    ? "bg-[#0f3d3a] text-white hover:bg-[#0f3d3a]/80"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                `}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
