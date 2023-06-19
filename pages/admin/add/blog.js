import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CreateContext from "../../../src/Components/CreateContex";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import { TagsInput } from "react-tag-input-component";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import { BsCloudUploadFill } from "react-icons/bs";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import useAuthAdmin from "../../../src/hooks/useAuthAdmin";
import Image from "next/image";
import LoadingButton from "../../../src/Shared/LoadingButton";
import Head from "next/head";
import RichText from "../../../src/Shared/RichText";

const blog = () => {
  const [selectedProductTag, setSelectedProductTag] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [richText, setValueOfRichText] = useState("");
  const router = useRouter();
  const { setRefresh, refresh, richTextContent } = useContext(CreateContext);
  const [catInputValue, setCatInputValue] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [update, setUpdate] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("https://api.introbangla.com/api/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
      })
      .catch((err) => err);
  }, [update]);

  const blogSubmit = async (data) => {
    setLoading(true);
    const pathName = data.title
      .replace(/[&\/@#!$%\^?]/g, "")
      .split(" ")
      .join("-");
    const blog = {
      title: data.title,
      path: pathName,
      authorName: data.author,
      publishDate: data.date,
      description: richTextContent,
      shortDescription: data.shortDesc,
      category: data.category,
      tags: selectedProductTag,
      image: imageUrl,
    };

    fetch("https://api.introbangla.com/api/v1/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result?.status === "success") {
          router.push("/admin/all-blogs");
          setRefresh(!refresh);
          swal("Blog added successfully!", {
            icon: "success",
          });
        }
      })
      .catch((err) => {
        toast.error("Image upto 1MB");
      });
  };

  // const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;

  const handleImageUpload = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch("https://api.introbangla.com/api/v1/upload/single-image-upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setImageUrl(result?.url);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong! please try again later!");
      });
  };

  const categoryValue = catInputValue;
  const inputValue = catInputValue;

  // const handleAddCategory = (e) => {
  //   if (catInputValue) {
  //     fetch("https://api.introbangla.com/api/v1/category", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(
  //         { category: categoryValue }
  //       ),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setCatInputValue('')
  //         reset()
  //         setUpdate(Math.random());
  //       });
  //   }
  // }

  const reverseCategory = [...categoryData];

  blog.modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"],
      // [{ size: [] }],
    ],
  };
  blog.formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
    "size",
  ];

  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <DashboardLayout>
        <div className="sm:py-10 py-5">
          <div className="bg-white shadow p-5 rounded md:w-[80%] w-[95%] mx-auto">
            <h1 className="font-semibold text-2xl border-b-[1px] w-60 pb-1 mb-5">
              Create a new Blog
            </h1>
            <form onSubmit={handleSubmit(blogSubmit)} className="mt-5">
              <div className=" mb-4">
                <label htmlFor="title" className=" font-semibold ">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-2 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                  placeholder="Title Name"
                  {...register("title", {
                    required: "Blog title is required!",
                  })}
                  onKeyUp={(e) => {
                    trigger("title");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs font-medium my-2">
                  {errors?.title?.message}
                </small>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className=" mb-4">
                  <label htmlFor="author" className=" font-semibold ">
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="mt-2 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                    placeholder="Author Name"
                    {...register("author", {
                      required: "Author name is required!",
                    })}
                    onKeyUp={(e) => {
                      trigger("author");
                    }}
                  />
                  <small className="text-[#FF4B2B] text-xs font-medium my-2">
                    {errors?.author?.message}
                  </small>
                </div>

                <div className=" mb-4">
                  <label htmlFor="date" className=" font-semibold ">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="mt-2 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                    {...register("date", {
                      required: "Date is required",
                    })}
                    onKeyUp={(e) => {
                      trigger("date");
                    }}
                  />
                  <small className="text-[#FF4B2B] text-xs font-medium my-2">
                    {errors?.date?.message}
                  </small>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className=" mb-4">
                  <label htmlFor="tags" className=" font-semibold ">
                    Tags of the blogs
                  </label>
                  <div className="mt-2">
                    <TagsInput
                      value={selectedProductTag}
                      onChange={setSelectedProductTag}
                      placeHolder="enter tag name"
                    />
                    <em className="text-xs">Press enter to add new tag</em>
                  </div>
                </div>

                <div className="mb-5">
                  <div className=" mb-4">
                    <label htmlFor="category" className=" font-semibold ">
                      Category
                    </label>
                    <select
                      className="select select-bordered w-full mt-2 focus:outline-none "
                      {...register("category", {
                        required: " Category are required!",
                      })}
                      onKeyUp={(e) => {
                        trigger("category");
                      }}
                    >
                      {reverseCategory?.reverse().map((item) => (
                        <option key={item?._id}>{item.category}</option>
                      ))}
                    </select>

                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.category?.message}
                    </small>
                  </div>

                  {/* <div className="flex justify-end items-center mt-2">

                    <input
                      onChange={(e) => setCatInputValue(e.target.value)}
                      type="text"
                      id="categoryInput"
                      name="author"
                      defaultValue={catInputValue}
                      className="w-[40%]  input input-bordered input-sm focus:border-warning duration-300 ease-in-out focus:outline-none rounded-none rounded-l"
                      placeholder="Category Name"
                    />
                    <div
                      onClick={handleAddCategory}
                      className="bg-green-500 text-xs  p-2 font-bold text-white rounded-r cursor-pointer select-none" type="">ADD</div>

                  </div> */}
                </div>
              </div>

              <div className=" mb-4">
                <label htmlFor="shortDesc" className=" font-semibold ">
                  Short Description for blog card
                </label>

                <textarea
                  className="textarea  focus:outline-none w-full lg:h-36 md:h-28 sm:h-36 h-24 mt-0 input input-bordered"
                  placeholder="Write a short description about the blog"
                  name="comment"
                  {...register("shortDesc", {
                    required: "Short Description is required",
                  })}
                  onKeyUp={(e) => {
                    trigger("shortDesc");
                  }}
                ></textarea>
                <small className="text-[#FF4B2B] text-xs font-medium my-2">
                  {errors?.shortDesc?.message}
                </small>
              </div>

              <div className=" gap-5 mb-4">
                <label htmlFor="description" className=" font-semibold ">
                  Description/Details
                </label>
                <div className="w-full mt-2">
                  {/* <ReactQuill
                    theme="snow"
                    modules={blog.modules}
                    formats={blog.formats}
                    defaultValue={richText}
                    onChange={setValueOfRichText}
                    style={{ height: 350, marginBottom: 12 }}
                  /> */}
                  <RichText />
                </div>
              </div>

              <div className="w-full  mt-16">
                <div className="relative border border-dashed h-28 sm:w-96  text-center">
                  <BsCloudUploadFill
                    size={25}
                    className="text-warning mx-auto block  mt-4"
                  />
                  <p className=" text-slate-900">Drag your image here</p>
                  <span className="text-xs text-slate-900">
                    (Only *.jpeg and *.png images will be accepted)
                  </span>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                  />
                </div>
                {imageUrl && (
                  <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ">
                    <Image
                      src={imageUrl}
                      width="100"
                      height="100"
                      alt={imageUrl}
                      className="w-full h-full object-contain "
                    />
                  </div>
                )}
              </div>

              {!loading && (
                <button
                  disabled={!imageUrl}
                  type="submit"
                  className="btn bg-[#3185FC] px-4 py-3 rounded cursor-pointer text-white ml-auto hover:bg-[#2570da] mt-5"
                >
                  {imageUrl ? "Publish your Blog" : "Please upload image"}
                </button>
              )}
              {loading && (
                <div className="mt-5">
                  <LoadingButton />
                </div>
              )}
            </form>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default useAuthAdmin(blog);
