import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { FaAngleDoubleRight } from "react-icons/fa";
import logo from '../assets/click the point/Footer Logo-1053a216.png'


const Footers = () => {
 

  const fristLinkData = [
    {
      title: "Web development",
      url: "#",
    },
    {
      title: "App Development",
      url: "#",
    },
    {
      title: "QA & Test Automation",
      url: "#",
    },
    {
      title: "UI/UX Design",
      url: "#",
    },
    {
      title: "SEO Optimization",
      url: "#",
    },
    {
      title: "Digital Marketing",
      url: "#",
    },
  ];
  const secondLinkData = [
    {
      title: "Overview",
      url: "#",
    },
    {
      title: "Team",
      url: "#",
    },
    {
      title: "portfolio",
      url: "#",
    },
    {
      title: "Career",
      url: "#",
    },
    {
      title: "Contact",
      url: "#",
    },
    {
      title: "Privacy Policy",
      url: "#",
    },
  ];


 

  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>

      <footer className="p-5 py-20 bg-[#1D6AAE] text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-4">
            <div>
              <Image src={logo} alt="logo" className=" w-56" width={100} height={100}></Image>
            </div>
            <h1 className='text-[16px] font-serif'>Introbangla Limited is an esteemed partner and a powerhouse in the field of Software Development and Testing services. We are renowned for our expertise and are trusted by our clients.</h1>
            <div className="flex">
              <FaFacebookF className="w-10 h-10 p-2 bg-white text-black hover:text-white rounded-full hover:bg-gray-600 m-2 duration-300"/>
              <BsYoutube className="w-10 h-10 p-2 bg-white text-black hover:text-white rounded-full hover:bg-gray-600 m-2 duration-300" />
              <FaLinkedinIn className="w-10 h-10 p-2 bg-white text-black hover:text-white rounded-full hover:bg-gray-600 m-2 duration-300" />
            </div>
          </div>
          <div className="">
            <h2 className="font-extrabold text-4xl">Quick Links</h2>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                {
                  fristLinkData.map((data,idx)=>
                  <a key={idx} className=' text-[16px] font-serif pt-2 hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> {data.title}</a>
                  )
                }
              </div>
              <div className="flex flex-col">
                {
                  secondLinkData.map((data,idx)=>
                  <a key={idx} className=' text-[16px] font-serif pt-2 hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> {data.title}</a>
                  )
                }
              </div>
            </div>
          </div>
          <div className=" border border-[#1F5D93] rounded-md p-5">
            <h2 className="text-4xl font-extrabold">Newsletter</h2>
            <p className="text-lg py-4">Sing up to get more every updates</p>
            <input type="text" placeholder="Email Address" className="input input-bordered w-full" />
            <button className="btn bg-[#282828] border-none hover:bg-[#282828] text-white mt-4 ">Subscribe Now <span className="ml-4"> <FaAngleDoubleRight /></span></button>
          </div>

        </div>
      </footer>

      <footer className="footer footer-center p-5 bg-[#373745] text-base-content">
        <div>
          <p className="text-white">Copyright © 2023 - <span className="text-[#1D6AAE] font-bold">INTROBANGLA.</span> All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footers;
