import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CreateContext from "../../../src/Components/CreateContex";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import { BsCloudUploadFill } from "react-icons/bs";
import LoadingComponents from "../../../src/Shared/LoadingComponents";
import { toast } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import useAuthAdmin from "../../../src/hooks/useAuthAdmin";
import LoadingButton from "../../../src/Shared/LoadingButton";
import Head from "next/head";
import RichText from "../../../src/Shared/RichText";

const EditBlog = () => {
  const [blog, setBlog] = useState({});
  const [selectedProductTag, setSelectedProductTag] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [richText, setValueOfRichText] = useState("");
  const [catInputValue, setCatInputValue] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [update, setUpdate] = useState("");
  const [isLoading, isSetLoading] = useState(false);
  const {
    refresh,
    setRefresh,
    loading,
    setLoading,
    richTextContent,
    setRichTextValue,
  } = useContext(CreateContext);

  const {
    title,
    path,
    description,
    image,
    category,
    tags,
    authorName,
    publishDate,
    shortDescription,
  } = blog || {};
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setRichTextValue(description);
  }, [blog]);

  // get blog by id
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.introbangla.com/api/v1/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data?.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch("https://api.introbangla.com/api/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
      })
      .catch((err) => err);
  }, [update]);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
    },
  });

  const blogSubmit = async (e) => {
    e.preventDefault();
    isSetLoading(true);
    const pathName = e.target.title.value
      .replace(/[&\/@#!$%\^?]/g, "")
      .split(" ")
      .join("-");
    const blog = {
      title: e.target.title.value || title,
      path: pathName || path,
      authorName: e.target.author.value || authorName,
      description: richTextContent || description,
      shortDescription: e.target.shortDesc.value || shortDescription,
      category: e.target.category.value || category,
      tags: selectedProductTag || tags,
      image: imageUrl || image,
    };

    fetch(`https://api.introbangla.com/api/v1/blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((result) => {
        isSetLoading(false);
        if (result?.status === "success") {
          swal("Blog Updated Successfully", {
            icon: "success",
          });
          setRefresh(!refresh);
          router.push("/admin/all-blogs");
        }
      });
  };

  // const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;

  const imgUrl = `https://api.imgbb.com/1/upload?key=14461d1404019ac5e51b83bd6b860f94`;
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImageUrl(result.data?.url);
      });
  };

  const reverseCategory = [...categoryData];

  EditBlog.modules = {
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
      [{ size: [] }],
    ],
  };

  EditBlog.formats = [
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
        {loading ? (
          <LoadingComponents />
        ) : (
          <div className="sm:py-10 py-5">
            <div className="bg-white shadow p-5 rounded md:w-[80%] w-[95%] mx-auto">
              <h1 className="font-semibold text-2xl border-b-[1px] w-32 pb-1 mb-5">
                Edit Blog
              </h1>
              <form onSubmit={blogSubmit} className="mt-5">
                <div className=" mb-4">
                  <label htmlFor="title" className=" font-semibold ">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="mt-2 w-full rounded input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none"
                    placeholder={title}
                    defaultValue={title}
                  />
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
                      placeholder={authorName}
                      defaultValue={authorName}
                    />
                  </div>

                  <div className=" mb-4">
                    <label htmlFor="tags" className=" font-semibold ">
                      Tags of the blogs
                    </label>
                    <div className="mt-2">
                      <TagsInput
                        value={tags || []}
                        onChange={setSelectedProductTag}
                        placeHolder="enter tag name"
                      />
                      <em className="text-xs">Press enter to add new tag</em>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="mb-5">
                    <div className=" mb-4">
                      <label htmlFor="category" className=" font-semibold ">
                        Category
                      </label>
                      <select
                        className="select select-bordered w-full mt-2 focus:outline-none "
                        name="category"
                        id="category"
                      >
                        {reverseCategory?.reverse().map((item) => (
                          <option key={item?._id}>{item.category}</option>
                        ))}
                      </select>

                      <small className="text-[#FF4B2B] text-xs font-medium my-2">
                        {errors?.category?.message}
                      </small>
                    </div>
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
                    id="shortDesc"
                    defaultValue={shortDescription}
                  ></textarea>
                </div>

                <div className=" gap-5 mb-4">
                  <label htmlFor="description" className=" font-semibold ">
                    Description/Details
                  </label>
                  <div className="w-full mt-2">
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
                      <img
                        src={image}
                        width="100"
                        height="2"
                        alt="category image"
                        className="w-full h-full object-contain "
                      />
                    </div>
                  )}
                </div>

                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn bg-[#3185FC] px-4 py-3 rounded cursor-pointer text-white ml-auto hover:bg-[#2c76dd] mt-5"
                  >
                    Edit your Blog
                  </button>
                ) : (
                  <div className="mt-5">
                    <LoadingButton />
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default useAuthAdmin(EditBlog);
