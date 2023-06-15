import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CreateContext from "../Components/CreateContex";
// import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
// import { BsYoutube } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import Head from "next/head";

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { FaAngleDoubleRight } from "react-icons/fa";
import logo from '../assets/click the point/Click the point2.png'

const Footers = () => {
  const { dark, blogs, refresh } = useContext(CreateContext);
  const [categoryData, setCategoryData] = useState([]);

  // const categorySet = new Set(blogs?.map((item) => item?.category));
  // const categories = Array.from(categorySet).sort();


  useEffect(() => {
    fetch(" https://backend.lobdho.com/clickthepoint/api/v1/category")
      .then(res => res.json())
      .then(data => {
        setCategoryData(data)
      })
      .catch(err => (err))
  }, [refresh])

  const categorySet = new Set(blogs?.map(item => item?.category))
  const categories = Array.from(categorySet).sort()

  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      {/* <div className="bg-accent border-t">
        <div className="mid-container">
          <footer className="footer md:px-10 py-10 pb-20 ">
            <div className="space-y-3">
              <span className="text-xl font-semibold">Quick Links</span>
              <a  href="https://lobdho.com.bd/about-us" target={"_blank"} className="link link-hover">About Us</a>
              <a  href="https://lobdho.com.bd/products" target={"_blank"} className="link link-hover">Shop</a>
              <a  href="https://lobdho.com.bd/contact-us" target={"_blank"} className="link link-hover">Contact</a>
            </div>

            <div className="space-y-3">
              <span className="text-xl font-semibold">Categories</span>
             

              {
                categories?.slice(0, 5)?.map((item, index) => (
                  <div key={item?._id}>
                    <Link href={`/category-blog/${item}`} className="link link-hover">{item}</Link>
                  </div>
                ))
              }
            </div>
            <div className="space-y-3">
              <span className="text-xl font-semibold">Follow us on</span>
              <Link href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className="link link-hover hover:underline-none">
                <div className="flex items-center space-x-2">
                  <FaFacebookF className="text-xl" />
                  <span>Facebook</span>
                </div>
              </Link>
              
              <Link href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className="link link-hover hover:underline-none">
                <div className="flex items-center space-x-2">
                  <GrInstagram className="text-xl" />
                  <span>Instagram</span>
                </div>
              </Link>
              <Link href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className="link link-hover hover:underline-none">
                <div className="flex items-center space-x-2">
                  <BsYoutube className="text-xl" />
                  <span>Youtube</span>
                </div>
              </Link>
              
            </div>
            <div>
              <span className="text-xl font-semibold">Newsletter</span>
              <div className="form-control w-80">
                <label className="label">
                  <span className="label-text">Enter your email address</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="admin@site.com"
                    className="input input-bordered w-full pr-16 focus:outline-none"
                  />
                  <button className="btn btn-warning absolute top-0 right-0 rounded-l-none font-bold text-white ">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </footer>

          <footer className="footer px-10 py-5 border-t ">
            <div className="items-center grid-flow-col">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
              <p>
                Copyright © 2023 - All right reserved By{" "}
                <Link href="/" >
                  <span className="font-bold text-warning cursor-pointer text-center">
                    Click The Point
                  </span>{". "}
                </Link>
               

              </p>
            </div>
            <div className="md:place-self-center md:justify-self-end justify-self-center">
              <div className="flex justify-center items-center gap-4">
                <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className="cursor-pointer">
                  <FaFacebookF className="text-2xl" />
                </a>

                <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className="cursor-pointer">
                  <BsYoutube className="text-3xl" />
                </a>

                <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className="cursor-pointer">
                  <GrInstagram className="text-2xl" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div> */}

      {/* New Footer */}

      <footer className="p-10 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-4">
            <div>
              <Image src={logo} alt="logo" width={100} height={100}></Image>
            </div>
            <h1 className='text-[#000000a6] text-[16px] font-serif'>Introbangla Limited is an esteemed partner and a powerhouse in the field of Software Development and Testing services. We are renowned for our expertise and are trusted by our clients.</h1>
            <div className="flex py-5">
              <FaFacebookF className="w-12 h-12 p-2" />
              <BsYoutube className="w-12 h-12 p-2" />
              <FaLinkedinIn className="w-12 h-12 p-2" />
            </div>
          </div>
          <div className="">
            <h2 className="font-extrabold text-xl">Quick Links</h2>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <a className='text-[#000000a6] text-[16px] font-serif pt-2 hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> Web Development</a>
                <a className='text-[#000000a6] text-[16px] font-serif  hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> App Development</a>
                <a className='text-[#000000a6] text-[16px] font-serif  hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span>QA & Test Automation</a>
                <a className='text-[#000000a6] text-[16px] font-serif  hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span>UI/UX Design</a>
                <a className='text-[#000000a6] text-[16px] font-serif  hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span>SEO Optimization</a>
                <a className='text-[#000000a6] text-[16px] font-serif  hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span>Digital Marketing</a>

              </div>
              <div className="flex flex-col">
                <a className='text-[#000000a6] text-[16px] font-serif pt-2 hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> Overview</a>
                <a className='text-[#000000a6] text-[16px] font-serif hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> Team</a>
                <a className='text-[#000000a6] text-[16px] font-serif hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> portfolio</a>
                <a className='text-[#000000a6] text-[16px] font-serif hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> Career</a>
                <a className='text-[#000000a6] text-[16px] font-serif hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> Contact</a>
                <a className='text-[#000000a6] text-[16px] font-serif hover:underline underline-offset-1 flex items-center' href="#"><span><BsDot className="w-8 h-8"></BsDot></span> Privacy Policy</a>

              </div>
            </div>
          </div>
          <div className="  rounded-md p-5">
            <h2 className="text-xl font-extrabold">Newsletter</h2>
            <p className="text-xl py-4">Sing up to get more every updates</p>
            <input type="text" placeholder="Email Address" className="input input-bordered w-full" />
            <button className="btn btn-success text-white mt-4 ">Subscribe Now <span className="ml-4"> <FaAngleDoubleRight /></span></button>
          </div>

        </div>
      </footer>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved By Click The Point.</p>
        </div>
      </footer>
    </>
  );
};

export default Footers;
