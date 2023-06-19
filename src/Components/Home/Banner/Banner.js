import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import img from "../../../assets/image 31.png";
import BlogLoader from "../../../Shared/BlogLoader";
import CreateContext from "../../CreateContex";

const Banner = () => {
  const router = useRouter()

  const {
    blogs,
    loading
  } = useContext(CreateContext);

  //   const handleDetailsPage = () => {
  //     router.push(`/blog-details/${blog?.path}`)
  // }


  return (
    <section className="mid-container relative top-28">
      <div className="md:flex  gap-6">
        <div className="md:w-[60%] md:order-2 order-1">
          <div className="mb-5">
            {
              loading ? (<BlogLoader />) : (
                <>
                  {blogs?.slice(3, 4).map((blog) => {
                    return (
                      <div
                        onClick={() => router.push(`/blog-details/${blog?.path}`)}
                        key={blog?._id}
                        className="cursor-pointer">
                        <Image
                          src={blog?.image}
                          alt={blog?.image}
                          width={600}
                          height={600}
                          className="w-full object-cover"
                        ></Image>
                        <h1 className="text-xl font-bold text-center mt-3">
                          {blog?.title}
                        </h1>
                        <p className=" text-center text-sm">
                          By-{" "}
                          <span className="font-bold">
                            {blog?.authorName}
                          </span>
                        </p>
                        <p className='text-xs mt-2 text-justify'>{blog?.shortDescription?.slice(0,800)}<span className='font-bold'>....</span></p>
                      </div>
                    );
                  })}
                </>
              )
            }
          </div>
        </div>
        <div className="md:w-[30%] md:order-1 ">
          <div className="mb-5">
            {
              loading ? (<BlogLoader />) : (
                <>
                  {blogs?.slice(0, 1).map((blog) => {
                    return (
                      <div
                        onClick={() => router.push(`/blog-details/${blog?.path}`)}
                        key={blog?._id}
                        className="cursor-pointer">
                        <Image
                          src={blog?.image}
                          alt={blog?.image}
                          width={600}
                          height={600}
                          className="w-full object-cover"
                        ></Image>
                        <h1 className="text-xl font-bold text-center mt-3">
                          {blog?.title}
                        </h1>
                        <p className="   text-center text-sm">
                          By-{" "}
                          <span className="font-bold">
                            {blog?.authorName}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </>)
            }
          </div>
          <div>
            {
              loading ? (<BlogLoader />) : (
                <>
                  {blogs.slice(1, 2).map((blog) => {
                    return (
                      <div
                        onClick={() => router.push(`/blog-details/${blog?.path}`)}
                        key={blog?._id}
                        className="cursor-pointer">
                        <Image
                          src={blog?.image}
                          alt={blog?.image}
                          width={600}
                          height={600}
                          className="w-full object-cover"
                        ></Image>
                        <h1 className="text-xl font-bold text-center mt-3">
                          {blog?.title}
                        </h1>
                        <p className="   text-center text-sm">
                          By-{" "}
                          <span className="font-bold">
                            {blog?.authorName}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </>)
            }
          </div>
        </div>

        <div className="md:w-[30%] md:order-3 ">
          <div className="mb-5">
            {
              loading ? (<BlogLoader />) : (
                <> {blogs.slice(5, 6).map((blog) => {
                  return (
                    <div
                      onClick={() => router.push(`/blog-details/${blog?.path}`)}
                      key={blog?._id}
                      className="cursor-pointer">
                      <Image
                        src={blog?.image}
                        alt={blog?.image}
                        width={600}
                        height={600}
                        className="w-full object-cover"
                      ></Image>
                      <h1 className="text-xl font-bold text-center mt-3">
                        {blog?.title}
                      </h1>
                      <p className="   text-center text-sm">
                        By-{" "}
                        <span className="font-bold">
                          {blog?.authorName}
                        </span>
                      </p>
                    </div>
                  );
                })}
                </>
              )
            }
          </div>
          <div>
            {
              loading ? (<BlogLoader />) : (
                <>
                  {blogs.slice(7, 8).map((blog) => {
                    return (
                      <div
                        onClick={() => router.push(`/blog-details/${blog?.path}`)}
                        key={blog?._id}
                        className="cursor-pointer">
                        <Image
                          src={blog?.image}
                          alt={blog?.image}
                          width={600}
                          height={600}
                          className="w-full object-cover"
                        ></Image>
                        <h1 className="text-xl font-bold text-center mt-3">
                          {blog?.title}
                        </h1>
                        <p className="   text-center text-sm">
                          By-{" "}
                          <span className="font-bold">
                            {blog?.authorName}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
