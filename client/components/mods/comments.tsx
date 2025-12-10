export const Comments = () => {
  return (
    <div className="w-full px-[10%] py-20 grid grid-cols-1 lg:grid-cols-2 bg-[#f7f7f7] gap-10 items-center">
      
      <div>
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">Testimonials</span>
        <h1 className="text-5xl font-semibold leading-tight mt-6 text-[#1e3d38]">
          Client <span className="text-[#8bc34a]">Experiences</span> <br /> 
          That Speak for Themselves
        </h1>

        <div className="flex items-center gap-5 mt-10">
          <button className="bg-[#0f3d3a] text-white px-6 py-3 rounded-full font-semibold">
            Contact Us
          </button>

        </div>
      </div>


      <div className="bg-white p-10 rounded-3xl shadow-sm relative">

        <div className="text-[#0f3d3a] text-5xl">“</div>

        <p className="mt-4 text-gray-700 leading-relaxed text-lg">
          “I hired Finovate for a small project & was very happy.  
          He not only answered all my questions, but he didn’t treat me like a “small project”.  
          I was very satisfied & would recommend.”
        </p>

        <div className="flex items-center gap-4 mt-10">
          <img 
            src="/profile.jpg" 
            className="w-12 h-12 rounded-full object-cover"
            alt="User"
          />
          <div>
            <h3 className="font-semibold text-[#1e3d38]">Rebecca Roy</h3>
            <p className="text-sm text-gray-500">H&N – CEO & PRESIDENT</p>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
            ↙
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
            ↗
          </button>
        </div>
      </div>
    </div>
  );
};
