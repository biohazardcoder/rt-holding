
export const WhyChooseUs = () => {
    const items = [
        {
            title: "Expertise",
            count: "10+",
        },
        {
            title: "Clients",
            count: "500+",
        },
        {
            title: "Projects",
            count: "1000+",
        },
        {
            title: "Support",
            count: "24/7",
        },
    ]


  return (
    <div className=" bg-[#f7f7f7] flex flex-col items-center px-[10%] py-10">
        <span className="bg-[#434343] text-white m-auto py-2 px-3 font-semibold">Why Choose Us</span>
      <h1 className="text-center text-5xl mt-4 font-semibold  text-[#0f3d3a]" >
        Expertice, secure, success
      </h1>
      <p className="text-center mt-4 text-gray-500">
        we understand that choosing the right financial partner is crucial for your success and <br /> here are some reasons why RT Holding stands out from the rest.
      </p>
      <div className="grid grid-cols-4  gap-12 mt-8">
        {items.map(({title,count}, index) => (
        <div key={index} className="w-full flex flex-col bg-white border  justify-center items-center p-8 rounded-md">
          <h1 className="text-5xl font-bold text-black">
            {count}
          </h1>
          <p className="mt-2 text-xl text-gray-500 font-semibold">
            {title}
            </p>
        </div>
        ))}
      </div>
    </div>
  );
};
