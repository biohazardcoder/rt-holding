"use client";

import { Trans, useTranslation } from "react-i18next";
import { FaInstagram, FaLinkedin, FaTelegram, FaXTwitter } from "react-icons/fa6";

export const OurTeam = () => {
  const { t } = useTranslation("common");

  const members = [
    {
      name: "Akhliddin Teshaboev",
      role: "CEO",
      avatar: "/team/c1.jpg",
    },
    {
      name: "Rakhmatilla Akhmedov",
      role: "Operation Manager",
      avatar: "/team/o1.jpg",
    },
    {
      name: "Bekmurod Abdullaev",
      role: "Marketing Manager",
      avatar: "/team/sa1.jpg",
    },
    {
      name: "Fakhriddin Teshaboev",
      role: "Sales Manager",
      avatar: "/team/s2.jpg",
    },
  ];

  return (
    <div className="px-[5%] md:px-[10%] bg-[#f7f7f7] py-16">

      <div className="text-center mb-10">
        <span className="bg-[#434343] text-white py-2 px-4 font-semibold rounded">
          {t("our-team.badge")}
        </span>

        <p className="mt-5 text-2xl md:text-4xl font-semibold text-[#234F72]">
          <Trans i18nKey="our-team.title" components={{ br: <br /> }} />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            <img
              src={member.avatar}
              alt={member.name}
              className="w-40 h-50 object-cover rounded-sm mr-6"
            />

            <div className="flex-1">
              <h3 className="text-lg font-bold">{member.name}</h3>

              <p className="text-sm text-[#F69419] font-medium mb-2">
                {member.role}
              </p>

              <p className="text-gray-500 text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sed reprehenderit iure deleniti velit temporibus? Voluptas autem explicabo voluptatum ullam?
              </p>

              <div className="flex gap-3 text-gray-400">
                <FaTelegram className="cursor-pointer hover:text-blue-500" />
                <FaInstagram className="cursor-pointer hover:text-pink-500" />
                <FaLinkedin className="cursor-pointer hover:text-blue-600" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};