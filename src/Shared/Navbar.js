import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CgSearch } from 'react-icons/cg';
import logo from '../assets/click the point/HeaderLogo-101982a7.png'
import { useRouter } from "next/router";
import CreateContext from "../Components/CreateContex";
import profile from '../assets/profile.jpg'
import { MdOutlineDashboard } from 'react-icons/md';
import TopNav from "./Header/TopNav";
import { signOut } from "firebase/auth";
import auth from "./firebaseInit";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const router = useRouter();
  const { pathname } = useRouter();
  const {
    user,
    token,
    setToken,
    setUser,
    setDark,
    refresh,
    setRefresh
  } = useContext(CreateContext);

  const userRole = user?.role;

  const menuItem = <>
    <li><Link href="https://www.introbangla.com/technology" target="_blank" className=" hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE] focus:bg-white hover:bg-white active:bg-white">Techonology</Link></li>
    <li><Link href="https://www.introbangla.com/our-portfolio" target="_blank" className=" hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE] focus:bg-white hover:bg-white active:bg-white">Portfolio</Link></li>
    <li><Link href="/all-blogs" className=" hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE] focus:bg-white hover:bg-white active:bg-white">Blog</Link></li>
    <li><Link href="https://www.introbangla.com/contact-us" target="_blank" className=" hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE] focus:bg-white hover:bg-white active:bg-white">Contact</Link></li>
    {
      userRole === 'admin' && (
        <li><Link href="/admin/all-blogs" className=" hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE] focus:bg-white hover:bg-white active:bg-white">Dashboard</Link></li>

      )
    }
  </>

  useEffect(() => {
    setRefresh(true)
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    setUser(user);
    setRefresh(false)
    setToken(token);
  }, [router, setUser, setToken, refresh]);


  const handleLogin = () => {
    router.push("/auth/login");
  };
  const handleAdminDashboard = () => {
    router.push("/admin/all-blogs");
  };
  const handleLogOut = () => {
    signOut(auth)
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  useEffect(() => {
    // navbar up/down event
    let lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (y > lastVal) {
        setIsNavVisible(false);
      }
      if (y < lastVal) {
        setIsNavVisible(true);
      }
      if (y === 0) {
        setIsNavVisible(true);
      }
      lastVal = y;
    };
  }, []);

  return (
    <>
      <div
        className={`border-b border-lightGray duration-500 ${
          isNavVisible
          ? "top-0 fixed z-50 w-full bg-white duration-500"
          : "top-0 md:-top-[110px] fixed z-30 w-full bg-white duration-500"
        }}`}
      >

        <div className="navbar container mx-auto px-16">
          <div className="navbar-start py-2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-200 mt-3 p-2 w-52 ">

                <DropDownMenu></DropDownMenu>
                {menuItem}
              </ul>
            </div>
            <div className='cursor-pointer'>
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className='py-2 w-36'
                ></Image>
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <DropDownMenu></DropDownMenu>
              {menuItem}
            </ul>
          </div>
          <div className="navbar-end">

            {
              !token && !user && (

                <button onClick={()=>handleLogin()} className="py-2 px-5 font-bold text-[#1D6AAE] outline outline-[#1D6AAE] outline-2 rounded-none hover:bg-[#1D6AAE] hover:text-white">
                  Login
                </button>
              )
            }

            {
              token && userRole === "admin" &&
              <button onClick={() => handleLogOut()} className="py-2 px-5 font-bold text-[#1D6AAE] outline outline-[#1D6AAE] outline-2 rounded-none hover:bg-[#1D6AAE] hover:text-white">
                Log Out
              </button>
            }
            {
               token && userRole === "user" &&
              (<button onClick={() => handleLogOut()} className="py-2 px-5 font-bold text-[#1D6AAE] outline outline-[#1D6AAE] outline-2 rounded-none hover:bg-[#1D6AAE] hover:text-white">
                Log Out
              </button>)
            }
          </div>
        </div>
      </div>


    </>
  );
};

export default Navbar;

// cart drawer
