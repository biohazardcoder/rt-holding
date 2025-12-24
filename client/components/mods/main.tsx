"use client";

export const Main = () => {
  return (
    <div
      className="relative h-screen px-[6%] flex flex-col justify-center gap-14 items-center overflow-hidden"
      style={{backgroundImage: `url("/main-bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className="bg-black/50 w-full h-full absolute top-0 left-0"/>
        <div className="text-white z-10 space-y-2">
          <h1 className="text-xs md:text-xl  text-center text-[#e9e9e9]">
            We're here to help you build your dreams
          </h1>
          <h1 className="text-lg md:text-3xl max-w-2xl text-center font-bold">
            Your One-Stop Solution for Real Estate Development, Construction, and Property Management
          </h1>
          <div className="absolute bottom-0 left-0 right-0 h-80 bg-linear-to-t from-black/90 to-transparent z-5" />
        </div>
    </div>
  );
};
