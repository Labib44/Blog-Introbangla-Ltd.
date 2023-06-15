import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateContext from "../../src/Components/CreateContex";
import LatestBlogItem from "../../src/Components/LatestBlog.js/LatestBlogItem";
import { toggleFilters } from "../../src/features/filter/filterSlice";
import BlogLoader from "../../src/Shared/BlogLoader";
import LoadingComponents from "../../src/Shared/LoadingComponents";

const index = () => {
    const { filters } = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const [srcValue, setSrcValue] = useState("");

    const { dark, blogs, loading } = useContext(CreateContext);

    const activeClass = `bg-warning ${
        dark && "text-[#fffff] bg-primary border-warning"
    } text-white`;

    let content;

    const filterBlog = blogs?.filter((item) => {
        if (srcValue === "") {
            return item;
        }
        return item.title.toLowerCase().includes(srcValue.toLowerCase());
    });

    if (filterBlog?.length) {
        content = filterBlog.map((item) => (
            <LatestBlogItem key={item._id} blog={item} />
        ));
    }

    if (blogs?.length && !filters?.length && !srcValue) {
        content = blogs.map((item) => (
            <LatestBlogItem key={item._id} blog={item} />
        ));
    }

    if (blogs?.length && filters?.length && !srcValue) {
        content = blogs
            .filter((item) => {
                if (filters.includes("all")) {
                    return item;
                }
                return filters.includes(item?.category);
            })
            .map((item) => <LatestBlogItem key={item._id} blog={item} />);
    }

    if (!filterBlog.length && !loading) {
        content = (
            <h1 className="text-center text-red-600 text-2xl font-bold">
                No Blogs Found !
            </h1>
        );
    }

    if (loading) {
        content = (
            <>
                <BlogLoader />
                <BlogLoader />
                <BlogLoader />
                <BlogLoader />
                <BlogLoader />
                <BlogLoader />
            </>
        );
    }

    const categorySet = new Set(blogs?.map((item) => item?.category));
    const categories = Array.from(categorySet).sort();

    return (
        <div className="mid-container">
            <div className="mt-5 mb-5">
                <h1 className="text-4xl text-center font-bold">All Blogs</h1>
                {/* <p className='text-sm text-center mt-2'>Travel, inspiration and tips for your next adventure. Discover the world with us!</p> */}
            </div>

            <div className="mb-5">
                <div className="flex justify-center">
                    <div className="mb-3 md:w-[60%] w-full">
                        <div className="input-group relative flex  items-stretch w-full mb-4">
                            <input
                                onChange={(e) => {
                                    setSrcValue(e.target.value);
                                }}
                                type="search"
                                className="form-control  relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="button-addon2"
                            />

                            <button
                                className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                type="button"
                                id="button-addon2"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="search"
                                    className="w-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:flex gap-10 ">
                <div className="md:w-[15%] pb-10">
                    <div className=" sticky top-32">
                        <h1 className="font-semibold text-xl my-5 border-b pb-2">
                            Category
                        </h1>
                        <div className=" grid gap-3 mb-10 w-full">
                            {categories?.length > 0 && (
                                <div
                                    onClick={() =>
                                        dispatch(toggleFilters("all"))
                                    }
                                    className={`border flex justify-center items-center px-4 py-2   hover:border-red rounded-3xl cursor-pointer ${
                                        filters.includes("all")
                                            ? activeClass
                                            : null
                                    }`}
                                >
                                    All
                                </div>
                            )}
                            {categories?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        dispatch(toggleFilters(item))
                                    }
                                    className={`border flex justify-center items-center px-4 py-2   hover:border-red rounded-3xl cursor-pointer ${
                                        filters.includes(item)
                                            ? activeClass
                                            : null
                                    }`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="min-h-[65vh] md:w-[85%]">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-x-5 gap-y-7 mb-24 ">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
