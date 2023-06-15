import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CgSearch } from 'react-icons/cg';
import logo from '../assets/click the point/Click the point2.png'
import { useRouter } from "next/router";
import CreateContext from "../Components/CreateContex";
import profile from '../assets/profile.jpg'
import { MdOutlineDashboard } from 'react-icons/md';
import TopNav from "./Header/TopNav";
import { signOut } from "firebase/auth";
import auth from "./firebaseInit";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
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
    <li><Link href="/" className=" hover:underline underline-offset-8 decoration-2 decoration-primary hover:text-primary focus:bg-white hover:bg-white active:bg-white">Techonology</Link></li>
    <li><Link href="/" className=" hover:underline underline-offset-8 decoration-2 decoration-primary hover:text-primary focus:bg-white hover:bg-white active:bg-white">Portfolio</Link></li>
    <li><Link href="/all-blogs" className=" hover:underline underline-offset-8 decoration-2 decoration-primary hover:text-primary focus:bg-white hover:bg-white active:bg-white">Blog</Link></li>
    <li><Link href="/" className=" hover:underline underline-offset-8 decoration-2 decoration-primary hover:text-primary focus:bg-white hover:bg-white active:bg-white">Contact</Link></li>
    {
      userRole === 'admin' && (
        <li><Link href="/admin/all-blogs" className=" hover:underline underline-offset-8 decoration-2 decoration-primary hover:text-primary focus:bg-white hover:bg-white active:bg-white">Dashboard</Link></li>
        
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

  return (
    <>
      {/* <TopNav /> */}
      {/* <div className='shadow-sm sticky top-0 z-50 bg-base-100'>
        <div className='mid-container '>
          <div className="navbar bg-base-100 px-0 py-3">

            <div className="navbar-start ">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <Link href='/'>
                    <li><h6 className='font-semibold text-[16px] hover:bg-base-100 hover:text-primary'>Home</h6></li>
                  </Link>
                  <Link href='/all-blogs'>
                    <li><h6 className='font-semibold text-[16px] hover:bg-base-100 hover:text-primary'>Blogs</h6></li>
                  </Link>

                  {
                    userRole === 'admin' && (
                      <Link href='/admin/all-blogs'>
                        <li><h6 className='font-semibold text-[16px] hover:bg-base-100 hover:text-primary'>Dashboard</h6></li>
                      </Link>
                    )
                  }
                </ul>
              </div>

            </div>
            <div className="flex justify-center items-center navbar-center">
              <Link href='/' className="ml-3">
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className='w-16 md:hidden '
                ></Image>

              </Link>
            </div>
            <div className='navbar-end'>
              <div className="hidden lg:flex mr-5">
                <ul className="menu menu-horizontal px-1 hover:bg-base-100">
                  <Link href='/'>
                    <li><h6 className='font-semibold text-[16px] hover:bg-base-100 hover:text-primary'>Home</h6></li>
                  </Link>
                  <Link href='/all-blogs'>
                    <li><h6 className='font-semibold text-[16px] hover:bg-base-100 hover:text-primary'>Blogs</h6></li>
                  </Link>
                  {
                    userRole === 'admin' && (
                      <Link href='/admin/all-blogs'>
                        <li><h6 className='font-semibold text-[16px] hover:bg-base-100 hover:text-primary'>Dashboard</h6></li>
                      </Link>
                    )
                  }
                </ul>
              </div>
              <div className="flex justify-end gap-4 items-center">

                <div className='lg:hidden '>
                  {
                    pathname.includes("admin") && (<label htmlFor="my-drawer-2" tabIndex="1" className=" cursor-pointer">
                      <MdOutlineDashboard className='text-2xl' />
                    </label>)
                  }
                </div>

              </div>

              <div className="ml-3">
                {
                  !token && !user && (

                    <button onClick={() => handleLogin()} className='btn btn-sm btn-primary font-bold text-white'>
                      Login
                    </button>
                  )
                }

                {
                  token && userRole === "admin" &&
                  <button onClick={() => handleLogOut()} className='btn btn-sm btn-error font-bold'>
                    LogOut
                  </button>
                }
                {
                  token && userRole === "user" &&
                  (<button onClick={() => handleLogOut()} className='btn btn-sm btn-error font-bold'>
                    LogOut
                  </button>)
                }
              </div>
            </div>
          </div>
        </div>
      </div > */}

      {/* new navbar */}

      <div className="navbar mid-container">
        <div className="navbar-start">
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
                className='py-2 rounded-full'
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

              <button onClick={() => handleLogin()} className="btn btn-outline rounded-none">
                Client Login
              </button>
            )
          }

          {
            token && userRole === "admin" &&
            <button onClick={() => handleLogOut()} className="btn btn-outline rounded-none">
              LogOut
            </button>
          }
          {
            token && userRole === "user" &&
            (<button onClick={() => handleLogOut()} className="btn btn-outline rounded-none">
              LogOut
            </button>)
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;

// cart drawer
