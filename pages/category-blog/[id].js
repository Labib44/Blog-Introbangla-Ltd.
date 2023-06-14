import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import CategoryBlogItem from '../../src/Components/CategoryBlogItem';
import CreateContext from '../../src/Components/CreateContex';

const CategoryBlog = () => {
    const { blogs, refresh } = useContext(CreateContext);
    const router = useRouter();
    const { id } = router.query;
    const [srcValue, setSrcValue] = useState('');


    const categoryBlogs = blogs?.filter((blog) => blog?.category === id);

    const filterBlog = categoryBlogs?.filter((item) => {
        if (srcValue === '') {
            return item;
        }
        return item.title.toLowerCase().includes(srcValue.toLowerCase());
    });

    let content;

    if (filterBlog?.length) {
        content = filterBlog.map((item) => (
            <CategoryBlogItem key={item._id} blog={item} />
        ));
    }

    if (categoryBlogs?.length && !srcValue) {
        content = categoryBlogs.map((item) => (
            <CategoryBlogItem key={item._id} blog={item} />
        ));
    }

    if (!filterBlog?.length) {
        content = <h1 className='text-center text-2xl font-bold text-error min-h-[30vh] pt-10'>No Blogs Found !</h1>
    }

    return (
        <div>
            <div className='mid-container'>
                <div className=' mt-10 pb-20'>
                    <div className='sm:flex justify-between items-center mb-5'>
                        <h1 className='text-2xl font-semibold mb-3 border-b-[1px] w-72 pb-2'>Blogs for <span className='text-warning'>{id}</span></h1>
                        {/* <Link href='/all-blogs'> <h1 className='font-bold cursor-pointer mr-5'>See All</h1></Link> */}
                        <div class="mb-3 md:w-[40%] w-full">
                            <div class="input-group relative flex  items-stretch w-full mb-4">
                                <input
                                    onChange={(e) => {
                                        setSrcValue(e.target.value);
                                    }}
                                    type="search" class="form-control  relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />

                                <button class="btn px-6 py-2.5 bg-warning text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-500 hover:shadow-lg focus:bg-orange-500  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-8'>
                        {/* {categoryBlogs?.map((article) => (
                            <CategoryBlogItem
                                key={article._id}
                                blog={article}
                            ></CategoryBlogItem>
                        ))} */}
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryBlog;