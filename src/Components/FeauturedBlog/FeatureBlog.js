import React, { useContext } from 'react';
import CreateContext from '../CreateContex';
import FeatureBlogItem from './FeatureBlogItem';

const FeatureBlog = () => {
    const {
        dark,
        blogs
    } = useContext(CreateContext);


    return (
        <div className="mid-container">
            <h1 className='text-2xl font-semibold border-b-[1px] pb-3 mb-5 mt-16'>Featured Blogs </h1>
            <div className="mt-5 grid md:grid-cols-2 md:gap-10">
                <div className=" lg:mb-0 md:mb-0 sm:mb-5 mb-5">
                    {blogs.slice(0, 4).map((article) => (
                        <FeatureBlogItem
                            key={article._id}
                            blog={article}
                        ></FeatureBlogItem>
                    ))}
                </div>
                <div className=" lg:mb-0 md:mb-0 sm:mb-5 mb-5">
                    {blogs.slice(4, 8).map((article) => (
                        <FeatureBlogItem
                            key={article._id}
                            blog={article}
                        ></FeatureBlogItem>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureBlog;