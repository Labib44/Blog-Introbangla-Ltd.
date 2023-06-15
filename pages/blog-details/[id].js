import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Comment from '../../src/Components/Comment';
import CreateContext from '../../src/Components/CreateContex';
import LatestBlogItem from '../../src/Components/LatestBlog.js/LatestBlogItem';
import LoadingComponents from '../../src/Shared/LoadingComponents';
import { toast } from 'react-hot-toast';
import img from '../../src/assets/profile.jpg'
import PopularBlogRight from '../../src/Components/PopularBlogs.js/PopularBlogRight';
import SocialLinked from '../../src/Shared/SocialLinked';
import Image from 'next/image';
import swal from 'sweetalert';
import { format } from 'date-fns';
import { AiOutlineCopy } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { FaShareAlt } from 'react-icons/fa';
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from "react-share";
import LoadingButton from '../../src/Shared/LoadingButton';
import Head from 'next/head';
import BlogDetailsLoader from '../../src/Shared/BlogDetailsLoader';
import BlogLoader from '../../src/Shared/BlogLoader';

const BlogDetails = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetchData, setFetchData] = useState()
    const [banner, setBanner] = useState()
    const router = useRouter()
    const { id } = router.query
    const {
        blogs,
        refresh,
        setRefresh,
        setUpdate
    } = useContext(CreateContext);
    const url = `${process.browser ? window.location.origin : ''}${router.asPath}`;

    // copy text to clipboard on click of copy button
    const handleCopy = () => {
        swal("Link Copied", {
            icon: "success"
        })
        setTimeout(() => {
        }, 2000);
    };


    useEffect(() => {
        setLoading(true);
        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/ad-banner`)
            .then((res) => res.json())
            .then((data) => {
                setBanner(data)
                setLoading(false)
            })
    }, [])


    useEffect(() => {
        setLoading(true);
        fetch(`https://backend.lobdho.com/clickthepoint/api/v1/blog?path=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data?.data.blogs[0]);
                setLoading(false)
            })
            .finally(() => setLoading(false));
    }, [id, fetchData, router]);


    useEffect(() => {
        if (blog?._id) {
            fetch(` https://backend.lobdho.com/clickthepoint/api/v1/blog/${blog?._id}`)
                .then((res) => res.json())
                .then((data) => {
                    // setUpdate(Math.random())
                })
        }
        // .finally(() => setLoading(false));
    }, [blog]);

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


    const handleComment = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const content = e.target.comment.value;
        const blogId = blog?._id;

        const comments = { name, email, content, blogId };


        setLoading(true);
        //  put comment in blog comments
        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/blog/${blog._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comments }),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data?.status === "success") {
                    // setBlog(data?.data);
                    // setFetchData(!fetchData);
                    setLoading(false)
                    swal("Your review will be published after admin approval", {
                        icon: "success",
                    });
                    // setRefresh(!refresh);
                    setUpdate(Math.random())
                }
                e.target.name.value = "";
                e.target.email.value = "";
                e.target.comment.value = "";
            });
    };

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

    // const bannerCopy = [...banner]


    // if src tag on description then add a custom css class
    const descriptionClass = blog?.description?.replace(/<img/g, '<img class="w-full"')




    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <div className='mid-container'>
                <div className="lg:flex md:flex mt-10">
                    {
                        loading ? (
                            <>
                                <div className="lg:w-[70%] md:w-[70%] lg:mb-0 md:mb-0 sm:mb-5 mb-5 lg:border-r-[1px] md:border-r-[1px] lg:pr-8 md:pr-5">
                                    <BlogDetailsLoader />
                                </div>
                            </>
                        ) : (
                            <div className="lg:w-[70%] md:w-[70%] lg:mb-0 md:mb-0 sm:mb-5 mb-5 lg:border-r-[1px] md:border-r-[1px] lg:pr-8 md:pr-5">
                                <div className='flex justify-between items-center'>
                                    <div className="flex items-center">
                                        <div className="avatar ">
                                            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <Image
                                                    src={img}
                                                    alt='profile'
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full w-20"
                                                ></Image>
                                            </div>
                                        </div>
                                        <div className="ml-6">
                                            <p className="antialiased  text-lg  font-normal flex">
                                                {blog?.authorName}{" "}
                                                <span className=" sm:block hidden">
                                                    <span className="badge badge-xs badge-primary font-semibold text-white  ml-3 p-2">
                                                        {" "}
                                                        Author{" "}
                                                    </span>
                                                </span>
                                            </p>
                                            <p className="text-xs mt-1 font-medium ">
                                                Published: {newDateName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-5'>

                                        <div className='flex gap-5 justify-center items-center'>

                                            <li className="dropdown dropdown-end ">
                                                <label tabIndex="0">
                                                    <FaShareAlt className='text-xl cursor-pointer text-blue-900' />
                                                </label>
                                                <ul
                                                    tabIndex="0"
                                                    className="dropdown-content menu p-2 drop-shadow-xl border rounded-box  bg-white"
                                                >
                                                    <li>
                                                        <a>
                                                            <FacebookShareButton url={url}>
                                                                <BsFacebook className='text-xl text-blue-400' />
                                                            </FacebookShareButton>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>

                                                            <TwitterShareButton url={url}>
                                                                <BsTwitter className='text-xl text-blue-400' />
                                                            </TwitterShareButton>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <LinkedinShareButton url={url}>
                                                                <BsLinkedin className='text-xl text-blue-400' />
                                                            </LinkedinShareButton>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                        </div>

                                        <CopyToClipboard text={url} onCopy={handleCopy}>
                                            <div className='flex justify-center items-center gap-1 cursor-pointer bg-orange-400 p-2 rounded text-white'>
                                                <h1 className='text-xs font-semibold'>Copy</h1>
                                                <AiOutlineCopy className='' />
                                            </div>
                                        </CopyToClipboard>{" "}

                                    </div>
                                </div>

                                <div className='mt-8'>
                                    <div>
                                        <Image
                                            src={blog?.image}
                                            alt={blog?.title}
                                            width={700}
                                            height={500}
                                            className="rounded-lg w-full max-h-[350px] object-cover"
                                        ></Image>
                                    </div>

                                    <div className='mt-5 mb-2 flex justify-between'>
                                        <h2 className=" font-bold text-2xl">{blog?.title}</h2>


                                    </div>

                                    <div className=''>
                                        <div
                                            className={`text-justify imgUrl pb-3 pt-1 w-full`}
                                            dangerouslySetInnerHTML={{ __html: blog?.description }}
                                        >
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {
                                        blogComments?.length > 0 && (
                                            <div>
                                                <h1 className="mb-2 text-xl font-semibold"> Recent reviews</h1>

                                                <hr className="mb-7" />
                                            </div>
                                        )
                                    }
                                    <section>
                                        {blogComments?.slice(-3)
                                            .reverse()
                                            .map((comment) => (
                                                // <Comment
                                                //     key={comment?._id}
                                                //     comment={comment}>
                                                // </Comment>
                                                <>
                                                    {
                                                        comment.status && (
                                                            <div className="flex gap-1 mb-5 w-full">
                                                                <div className="w-[4%]">
                                                                    <Image
                                                                        src={img}
                                                                        alt={img}
                                                                        width={50}
                                                                        height={50}
                                                                        className="rounded-full border w-full"
                                                                    ></Image>
                                                                </div>
                                                                <div className="w-[92%]">
                                                                    <div className="flex items-center gap-2 w-[100%]">
                                                                        <div className="bg-[#f5f9ff] py-2 pl-3 pr-5 rounded border">
                                                                            <h6 className="font-bold text-sm cursor-pointer">{comment?.name}</h6>
                                                                            <p className="text-sm">{comment?.content}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            ))}
                                        {/* <button >Show more</button> */}
                                    </section>

                                    <div className='mb-10'>
                                        <form
                                            onSubmit={handleComment}
                                            className={"lg:space-y-6 md:space-y-5 sm:space-y-6 space-y-4 lg:py-8 md:py-8 sm:py-5 py-5 lg:px-6 md:px-6 px-4 rounded-md bg-[#f5f9ff]"
                                            }
                                        >
                                            <h6 className="font-semibold text-xl">Leave a Review on this Blog</h6>
                                            <div>
                                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                                    <div>
                                                        <input className='py-3 px-5 w-full rounded-md focus:outline-0' type="text" name="name" id="name" placeholder='Your Name'
                                                        />
                                                    </div>
                                                    <div>
                                                        <input className='py-3 px-5 w-full rounded-md focus:outline-0' type="text" name="email" id="" placeholder='Your email address'
                                                        />
                                                    </div>
                                                </div>
                                                <textarea
                                                    className="textarea  focus:outline-none w-full lg:h-36 md:h-28 sm:h-36 h-24 mt-0"
                                                    placeholder="Your Comment"
                                                    name="comment"
                                                    required
                                                ></textarea>
                                            </div>
                                            {
                                                loading ? (
                                                    <div className=''>
                                                        <LoadingButton />
                                                    </div>
                                                ) : (
                                                    <button
                                                        disabled={loading}
                                                        className="btn btn-primary btn-sm ml-3 text-white font-bold" type="submit">
                                                        Submit
                                                    </button>
                                                )
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className="lg:w-[30%] md:w-[30%] lg:pl-8 md:pl-5  mt-4">
                        <h1 className='font-semibold text-xl border-b-[1px] pb-1 mb-5'>Categories</h1>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            {
                                categories?.map((item, index) => (
                                    <div
                                        onClick={() => router.push(`/category-blog/${item}`)}
                                        key={item?._id}
                                        className={`border flex justify-center items-center px-4 py-2   hover:border-red rounded-3xl cursor-pointer }`}>{item}</div>
                                ))
                            }
                        </div>

                        <div className='mb-5 grid gap-y-3'>
                            {
                                loading ? (
                                    <>
                                        <BlogLoader />
                                        <BlogLoader />
                                        <BlogLoader />
                                    </>
                                ) : (
                                    <>
                                        {
                                            banner?.slice(0, 3)?.map((item, index) => (
                                                <Image
                                                    key={item?._id}
                                                    src={item?.image}
                                                    alt={item?.image}
                                                    width={700}
                                                    height={500}
                                                    className="rounded-lg w-full max-h-[300px] object-cover"
                                                />
                                            ))
                                        }
                                    </>
                                )
                            }
                        </div>


                        <div>
                            <h1 className="font-semibold text-xl  pb-2">
                                Top Articles
                                <hr className="mt-1" />
                            </h1>

                            <div className="grid">
                                {blogs?.slice(0, 4).map((article) => (
                                    <PopularBlogRight
                                        key={article._id}
                                        blog={article}
                                    ></PopularBlogRight>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <SocialLinked />
                        </div>
                    </div>
                </div>

                <h1 className='font-semibold text-2xl border-b-[1px] w-52 pb-1 mb-5'>Related Blogs</h1>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-5 pb-20'>
                    {
                        loading ? (
                            <>
                                <BlogLoader />
                                <BlogLoader />
                                <BlogLoader />
                            </>
                        ) : (<>
                            {
                                relatedBlogs?.slice(0, 3).map((blog) => (
                                    <LatestBlogItem
                                        key={blog?._id}
                                        blog={blog}
                                    />
                                ))
                            }
                        </>)
                    }
                </div>
            </div>
        </>
    );
};

export default BlogDetails;