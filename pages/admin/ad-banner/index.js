import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import { BsCloudUploadFill } from "react-icons/bs";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import swal from "sweetalert";
import LoadingComponents from "../../../src/Shared/LoadingComponents";
import loadingImg from "../../../src/assets/animation/animation_500_le7eamh7.gif";
import LoadingButton from "../../../src/Shared/LoadingButton";
import Head from "next/head";

const index = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState();
  const [update, setUpdate] = useState();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.introbangla.com/api/v1/ad-banner`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setBanner(data);
      });
  }, [update]);

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
      })
      .catch((err) => {
        toast.error("Something went wrong! please try again later!");
      });
  };

  const adBanner = async (data) => {
    setIsLoading(true);
    const image = {
      image: imageUrl,
    };

    fetch("https://api.introbangla.com/api/v1/ad-banner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(Math.random());
        setImageUrl(null);
        setIsLoading(false);
        if (result.status === "success") {
          // router.push("/admin/all-blogs");
          swal("Banner added successfully!", {
            icon: "success",
          });
        }
      })
      .catch((err) => {
        toast.error("Image upto 1MB");
      });
  };

  const handleDeleteBanner = (id) => {
    fetch(`https://api.introbangla.com/api/v1/ad-banner/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(Math.random());
      });
  };

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
          <div>
            <div className="mb-5 mt-10 grid grid-cols-5 gap-5">
              {banner?.map((item, index) => (
                <div key={item?._id} className="relative">
                  <Image
                    src={item?.image}
                    alt={item?.image}
                    width={200}
                    height={150}
                    className="rounded-lg w-full max-h-[200px] object-cover cursor-pointer"
                  />

                  <div
                    onClick={() => handleDeleteBanner(item?._id)}
                    className="absolute top-1 right-1 bg-red-500 p-4 rounded-full text-white h-5 w-5 flex justify-center items-center cursor-pointer"
                  >
                    <h1 className="font-semibold">X</h1>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(adBanner)} className="mt-5 w-full">
              <div className=" flex items-center gap-8 mt-16">
                <div className="w-[30%]">
                  <div className="relative border border-dashed h-32  text-center">
                    <BsCloudUploadFill
                      size={25}
                      className="text-warning mx-auto block  mt-5"
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
                  <div className="flex justify-center">
                    {!isLoading && (
                      <button
                        disabled={!imageUrl}
                        type="submit"
                        className="btn mx-auto bg-[#3185FC] px-4 py-3 rounded cursor-pointer text-white  hover:bg-[#2369ca] mt-5"
                      >
                        {imageUrl
                          ? "Publish your Ad-Banner"
                          : "Please upload image"}
                      </button>
                    )}
                    {isLoading && (
                      <div className="mt-5">
                        <LoadingButton />
                      </div>
                    )}
                  </div>
                </div>
                {imageUrl && (
                  <div className=" w-[300px] h-[250px] p-1 bg-white shadow-md rounded-md mt-3 ">
                    <Image
                      src={imageUrl}
                      width="300"
                      height="250"
                      alt={imageUrl}
                      className="w-full h-full object-cover "
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default index;
