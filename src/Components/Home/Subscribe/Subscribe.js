import React from 'react';
import { GoLocation } from "react-icons/go";
import { MdOutlineMailOutline, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";

const Subscribe = () => {
    return (
        <div>
 

<section className="bg-gradient-to-bl from-[#1D6AAE] via-[#333539] to-[#666666] py-10 md:py-20">
      <div className="container mx-auto lg:px-16 md:px-10 px-5 grid grid-cols-1 xl:grid-cols-2 justify-center gap-5 lg:gap-20 xl:gap-36">
        <div className="text-white">
          <h1 className="text-4xl font-bold leading-tight">
            Have any project on mind! feel free contact with us or{" "}
            <a href="#" className="mt-2  py-2 text-[#1D6AAE] p-2 md:mx-2">say hello</a>

          </h1>
          <div className="border border-lightGray p-5 md:p-10 m-0 lg:m-5 mt-10 rounded-lg">
            <div className="block sm:flex items-center gap-5 mb-10">
              <div className="bg-white mr-4 text-black cursor-pointer shadow-lg hover:bg-textSecondary duration-300 hover:text-white p-3 rounded-full text-3xl w-14 md:max-w-none h-14 md:max-h-none">
                <GoLocation />
              </div>
              <div>
                <p className="text-lg hidden sm:block">Location</p>
                <p className="text-xl font-semibold mt-5 sm:mt-0">
                  Flat-2B, House-30, Road-12,
                  <br /> Sector 10, Uttara <br /> Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="block sm:flex items-center gap-5 mb-10">
              <div className="bg-white mr-4 text-black cursor-pointer shadow-lg hover:bg-textSecondary duration-300 hover:text-white p-3 rounded-full text-3xl w-14 md:max-w-none h-14 md:max-h-none">
                <MdOutlineMailOutline />
              </div>
              <div>
                <p className="text-lg hidden sm:block">Email Address</p>
                <p className="text-xl font-semibold mt-5 sm:mt-0">info@introbangla.com</p>
              </div>
            </div>
            <div className="block sm:flex items-center gap-5">
              <div className="bg-white mr-4 text-black cursor-pointer shadow-lg hover:bg-textSecondary duration-300 hover:text-white p-3 rounded-full text-3xl w-14 md:max-w-none h-14 md:max-h-none">
                <AiOutlinePhone />
              </div>
              <div>
                <p className="text-lg hidden sm:block">Phone No</p>
                <p className="text-xl font-semibold mt-5 sm:mt-0">+880 9678-844448</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-5 md:p-10 rounded-lg lg:w-lg w-full max-w-lg bg-white shadow-2xl">
            <h1 className="text-2xl font-bold mb-5 text-center">Send us Message</h1>

            <form >
              <input
                type="Text"
                name="name"
                className="w-full p-4 text-md block text-black border border-lightGray focus:outline-none rounded-lg my-5"
                placeholder="Full Name"
              />
              <input
                type="search"
                name="email"
                className="w-full p-4 text-md block text-black border border-lightGray focus:outline-none rounded-lg my-5"
                placeholder="Email address"
              />
              <input
                type="text"
                name="website"
                className="w-full p-4 text-md block text-black border border-lightGray focus:outline-none rounded-lg my-5"
                placeholder="Website"
              />
              <textarea
                type="text"
                name="message"
                rows={5}
                className="w-full p-4 text-md block text-black border border-lightGray focus:outline-none rounded-lg my-5"
                placeholder="Write a Message"
              />
              <div className="flex justify-center">
                <button className="flex gap-3 py-4 px-6 bg-primary rounded-lg text-white items-center mt-5">
                  Send Messages <MdKeyboardDoubleArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default Subscribe;