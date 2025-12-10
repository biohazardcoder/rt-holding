import { Mail, MapPin, PhoneCall } from 'lucide-react';
import Link from 'next/link';
// import { useTranslation } from 'react-i18next';
// import { HashLink } from 'react-router-hash-link';

function Footer() {
    // const { t} = useTranslation();
  return (
    <div className='bg-[#0f3d3a] pt-8 px-[5%]'>
        <section>
            <div className='grid grid-cols-1 md:grid-cols-6 pt-5 pb-10'>
                <div className=''>
                    <h1 className=' text-xl md:text-2xl text-white font-bold sm:text-left text-justify mb-1'>RT Holding</h1>
                    {/* <p className='text-white text-lg font-semibold'>From Korea to the World</p> */}
                </div>
                <div className="flex flex-col lg:flex-row justify-start gap-4  lg:gap-10  md:pl-40 col-span-5">
                    <div className='flex items-center gap-20'>
                        <div className="mt-4 md:mt-0">
                            <h1 className='text-xl font-bold mb-3 text-white text-center'>Quick Links</h1>
                            <ul className='flex  flex-col text-sm  text-white gap-4 '>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                 <li>
                                    <a href="#">Find</a>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                           
                            </ul>
                        </div>
                    <div className="mt-4 md:mt-0">
                            <h1 className='text-xl font-bold mb-3 text-white text-center'>Quick Links</h1>
                            <ul className='flex  flex-col text-sm  text-white gap-4 '>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                 <li>
                                    <a href="#">Find</a>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                           
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t-2 py-8'>
                <div className=' flex items-center flex-wrap gap-2 justify-end'>
                    <span className='text-white text-sm font-semibold'>All rights reserved © 2025.</span>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer