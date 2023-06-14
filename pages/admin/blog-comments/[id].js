import { format } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Comment from '../../../src/Components/Comment';
import CreateContext from '../../../src/Components/CreateContex';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import LatestBlogItem from '../../../src/Components/LatestBlog.js/LatestBlogItem';
import LoadingComponents from '../../../src/Shared/LoadingComponents';

const BlogComments = () => {

    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetchData, setFetchData] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const {
        blogs
    } = useContext(CreateContext);

    useEffect(() => {
        setLoading(true)
        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/blog/${id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data?.data)
            })
            .catch(err => (err))
            .finally(() => setLoading(false))

    }, [id, fetchData])

    const blogComments = blog?.comments

    const relatedBlogs = blogs?.filter((blog) => blog?._id !== id);

    const dates = blog?.publishDate || new Date();

    const date = new Date(dates);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const newDate = `${month}/${day}/${year}`;

    const monthName = format(new Date(dates), 'MMMM');
    const newDateName = ` ${monthName.slice(0, 3)} ${day}, ${year}`;


    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <DashboardLayout>
                {
                    loading ? (
                        <div className='h-[90vh]'>
                            <LoadingComponents />
                        </div>
                    ) :
                        (
                            <div className='mid-container'>
                                <div className='pt-10 md:pb-7 pb-5'>
                                    <div className='w-full md:h-72 sm:h-60 h-36'>

                                        <Image
                                            src={blog?.image}
                                            alt={blog?.title}
                                            width={300}
                                            height={200}
                                            className='w-full h-full object-cover mb-3'
                                        ></Image>
                                    </div>
                                    <h2 className='mt-5 font-bold text-2xl mb-2'>{blog?.title}</h2>
                                    {
                                        blog?.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className=' text-xs font-semibold bg-gray-200 px-3 py-1 rounded-full mr-2'>{tag}</span>
                                        ))
                                    }

                                    <div className=' flex justify-between mb-3 mt-3'>
                                        <p className='font-bold'>{blog?.authorName}</p>
                                        <p>{newDateName}</p>
                                    </div>

                                </div>

                                {
                                    blogComments?.length > 0 && (
                                        <div>
                                            <h1 className="mb-2 text-xl font-semibold"> See All Reviews</h1>

                                            <hr className="mb-7" />
                                        </div>
                                    )
                                }
                                {
                                    !blogComments?.length && (
                                        <div>
                                            <h1 className="mb-2 text-xl font-semibold"> No reviews</h1>

                                            <hr className="mb-7" />
                                        </div>
                                    )
                                }
                                <section>
                                    {blogComments?.map((comment) => (
                                        <Comment key={comment?._id} comment={comment} setFetchData={setFetchData}></Comment>
                                    ))}
                                    {/* <button >Show more</button> */}
                                </section>

                                <button type=""
                                    onClick={() => router.back()}
                                    className='btn btn-sm btn-warning font-bold text-white mb-20
                            '>
                                    Back
                                </button>
                            </div>
                        )
                }
            </DashboardLayout>
        </>
    );
};

export default BlogComments;