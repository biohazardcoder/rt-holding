import Image from "next/image";

export const OurServices = () => {
  const timeline = [
    {
      year: "1990",
      title: "Savee was founded",
      text: "The company was founded with a focus on personalized financial advice.",
      image: "/service/office.avif", 
    },
    {
      year: "2005 - 2015",
      title: "Grow and expand",
      text: "Expanded services to include investment management and retirement planning.",
      image: "/service/bussiness.png",
    },
    {
      year: "2023",
      title: "Lead the industry",
      text: "Continues to be a leading financial consulting company, offering innovative solutions.",
      image: "/service/bman.jpg",
    },
  ];

  return (
    <div className="bg-[#f9f9f9] px-[10%] py-16">
      <div className="flex items-center flex-col">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold rounded">
          Our Story
        </span>

        <h1 className="text-center text-5xl mt-4 font-semibold">
          A story of our dedication, <br /> expertise, and lasting results
        </h1>

        <p className="text-center mt-4 text-gray-500">
          Our team has a proven track record of success and is dedicated to <br />
          helping you achieve financial stability and security.
        </p>
      </div>

      <div className="relative mt-20">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-300 -translate-x-1/2"></div>

        <div className="flex flex-col gap-24">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`${
                  index % 2 === 0 ? "order-1" : "order-2"
                } flex justify-center`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={420}
                  height={250}
                  className="rounded-xl object-cover"
                />
              </div>

              <div className="absolute left-1/2 w-4 h-4 bg-white border-4 border-gray-400 rounded-full -translate-x-1/2"></div>

              <div
                className={`${
                  index % 2 === 0 ? "order-2" : "order-1"
                } relative pl-12`}
              >
                <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-500 font-semibold">
                  {item.year}
                </span>

                <h2 className="text-3xl mt-3 font-semibold">{item.title}</h2>

                <p className="text-gray-500 mt-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
