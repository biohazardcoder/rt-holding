
export const OurTeam = () => {

    const members = [
  {
    name: "Akhliddin Teshaboev",
    role: "CEO",
    avatar: "/team/c1.jpg",
    // contact: "+8210-2989-8641",
    // email: "rtmotors.ceo@gmail.com",
  },
  {
    name: "Rakhmatilla Akhmedov",
    role: "Operation Manager",
    avatar: "/team/o1.jpg",
    // contact: "+8210-9687-9796",
    // email: "rtmotors.operation@gmail.com",
  },
  {
    name: "Bekmurod Abdullaev",
    role: "Marketing Manager",
    avatar: "/team/sa1.jpg",
    // contact: "+8210-8465-8085",
    // email: "rtmotors.marketing@gmail.com",
  },
//   {
//     name: "Jeong Seung Cheol",
//     role: "Car Inspector",
//     avatar: "/team/s1.jpg",
//     // contact: "+8210-3853-0865",
//     // email: "rtmotors.inspection@gmail.com",
//   },
  {
    name: "Fakhriddin Teshaboev",
    role: "Sales Manager",
    avatar: "/team/s2.jpg",
    // contact: "+99895-563-9595",
    // email: "rtmotors.sales1@gmail.com",
  },
];

  return (
    <div className="px-[10%] bg-[#f9f9f9] py-10">
        <div>
            <span className="bg-[#434343] text-white py-2 px-3 font-semibold">Our Team</span>
            <p className="mt-4 text-4xl font-semibold">The Team Behind Your  <br /> Financial Succes</p>
        </div>
        <div className="grid grid-cols-4 gap-8">
            {
                members.map((member, index) => (
                    <div key={index} className="mt-8 flex flex-col  bg-white ">
                        <img src={member.avatar} alt={member.name} className="w-full h-96  object-cover"/>
                        <div className="p-2">
                            <h2 className="text-xl font-bold">{member.name}</h2>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    </div>
                ))
                
            }
        </div>
    </div>
  )
}
