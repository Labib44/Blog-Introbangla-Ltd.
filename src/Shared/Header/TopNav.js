import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/click the point/Click the point2.png';
import Image from 'next/image';
import Link from 'next/link';

const TopNav = () => {
    return (
        <div className='border-b '>
            <div className='mid-container top_nav_pd hidden md:block'>
                <div className='logo flex items-center justify-between'>
                    <div className='cursor-pointer'>
                        <Link href="/">
                            <Image
                                src={logo}
                                alt="logo"
                                width={80}
                                height={80}
                                className='py-2 rounded-full'
                            ></Image>
                        </Link>
                    </div>
                    <div className="nav_content flex items-center justify-between">
                        <ul className="menu menu-horizontal p-0 ">
                            <li className='mr-1'><a target={"_blank"} href="https://www.youtube.com/@Clickthepoint"><small className='font-normal'>Premium Content</small></a></li>
                            <li className='mr-1'><a target={"_blank"} href="https://www.youtube.com/@Clickthepoint"><small className='font-normal'>Get Premium</small></a></li>
                            {/* <li className='mr-1 hover:text-primary rounded'><Link href='/'><small className='font-normal '>Contact</small></Link></li> */}
                        </ul>

                        <div className='flex ml-2'>
                            <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"}>
                                <FaFacebookF className='mx-2' />
                            </a>
                            <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"}>
                                <FaTwitter className='mx-2' />
                            </a>
                            <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"}>
                                <FaInstagram className='mx-2' />
                            </a>
                        </div>
                        <a href="https://www.youtube.com/@Clickthepoint" target={"_blank"} className='btn btn-sm btn-outline ml-2 rounded-sm'>Subscribe</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNav;