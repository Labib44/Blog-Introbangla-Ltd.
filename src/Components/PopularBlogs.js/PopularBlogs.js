import Link from 'next/link';
import React, { useContext } from 'react';
import BlogLoader from '../../Shared/BlogLoader';
import ItemLoader from '../../Shared/ItemLoader';
import SocialLinked from '../../Shared/SocialLinked';
import CreateContext from '../CreateContex';
import LatestBlogItem from '../LatestBlog.js/LatestBlogItem';
import PopularBlogItem from './PopularBlogItem';
import PopularBlogRight from './PopularBlogRight';

const PopularBlogs = () => {
    const {
        blogs,
        loading
    } = useContext(CreateContext);

    const articleCopy = [...blogs];

    const mostClickBlog = blogs.sort((a, b) => b.clickCounter - a.clickCounter);

    return (
        <div className='mt-40'>
            <section className='container mx-auto px-16'>
                <div className='flex justify-between items-center mb-5'>
                    <h1 className='text-2xl font-semibold mb-3 border-b-[1px] w-48 pb-2'>Popular Blogs</h1>
                    <Link href='/all-blogs'> <h1 className='font-bold cursor-pointer mr-5'>See All</h1></Link>
                </div>
                <div className="">
                    <div className=''>
                        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-7 lg:mb-0 md:mb-0 sm:mb-5 mb-5">
                            {
                                loading ? (
                                    <>
                                        <BlogLoader />
                                        <BlogLoader />
                                        <BlogLoader />
                                    </>
                                ) : (
                                    <>
                                        {mostClickBlog?.slice(0, 3).map((article, index) => (
                                            < LatestBlogItem
                                                key={index}
                                                blog={article}
                                            />
                                        ))}
                                    </>
                                )
                            }
                        </div>

                        <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 gap-x-7 gap-y-4">
                            {
                                loading ? (<>
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                    <ItemLoader />
                                </>) : (
                                    <>
                                        {mostClickBlog?.slice(3, 13).map((article) => (
                                            <PopularBlogItem
                                                key={article._id}
                                                blog={article}
                                            ></PopularBlogItem>
                                        ))}
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {/* <div className="md:w-[30%] grid  lg:ml-5 md:ml-5 mt-10 lg:mt-0 md:mt-0">
                                <div>
                                    <h2 className='bg-black text-white py-2 pl-3 rounded'>OUR PICKS</h2>
                                </div>
                                <div className=" grid">
                                    {blogs.slice(0, 4).map((article) => (
                                        <PopularBlogRight
                                            key={article._id}
                                            blog={article}
                                        ></PopularBlogRight>
                                    ))}
                                </div>
                                <div className='hidden sm:block'>
                                    <SocialLinked />
                                </div>
                            </div> */}
                </div>
            </section >
        </div>
    );
};

export default PopularBlogs;