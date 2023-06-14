import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import Image from 'next/image';

const TopNav = () => {
    return (
        <div className='border-b '>
            <div className='mid-container top_nav_pd hidden md:block'>
                <div className='logo flex items-center justify-between'>
                    <div className='cursor-pointer'>
                        <Link to='/'>
                            <Image
                                src={logo}
                                alt='logo'
                                width={100}
                                height={100}
                                className='w-[100px]'
                            ></Image>
                        </Link>
                    </div>
                    <div className="nav_content flex items-center justify-between">
                        <ul className="menu menu-horizontal p-0">
                            <li className='mr-1'><a target={"_blank"} href="https://www.youtube.com/@Clickthepoint"><small className='font-normal'>Premium Content</small></a></li>
                            <li className='mr-1'><a target={"_blank"} href="https://www.youtube.com/@Clickthepoint"><small className='font-normal'>Get Premium</small></a></li>
                            {/* <li className='mr-1 hover:text-primary'><Link to='/contact'><small className='font-normal text-secondary'>Contact</small></Link></li> */}
                        </ul>

                        <div className="nav_content_rignt flex items-center justify-between">
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
        </div>
    );
};

export default TopNav;