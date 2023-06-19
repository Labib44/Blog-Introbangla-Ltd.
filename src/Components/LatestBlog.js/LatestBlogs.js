import Link from 'next/link';
import React, { useContext } from 'react';
import BlogLoader from '../../Shared/BlogLoader';
import LoadingComponents from '../../Shared/LoadingComponents';
import CreateContext from '../CreateContex';
import LatestBlogItem from './LatestBlogItem';

const LatestBlogs = () => {
    const {
        blogs,
        loading
    } = useContext(CreateContext);


    return (
        <>
            <div className='container mx-auto px-16'>
                <div className='md:mt-40 mt-10 pb-10'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-semibold mb-3 border-b-[1px] w-48 pb-2'>Latest Blogs</h1>
                        <Link href='/all-blogs'> <h1 className='font-bold cursor-pointer mr-5'>See All</h1></Link>
                    </div>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-8'>
                        {
                            loading ? (<>
                                <BlogLoader />
                                <BlogLoader />
                                <BlogLoader />
                                <BlogLoader />
                                <BlogLoader />
                                <BlogLoader />
                            </>) : (
                                <>
                                    {blogs?.slice(0, 6).map((article) => (
                                        <LatestBlogItem
                                            key={article._id}
                                            blog={article}
                                        ></LatestBlogItem>
                                    ))}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LatestBlogs;