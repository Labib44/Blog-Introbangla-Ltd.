import Image from "next/image";
import React from "react";
import loading from '../../public/assets/loading.gif'

const LoadingComponents = () => {
  return (

    <div className="w-full h-[300px] overflow-hidden flex justify-center items-center">
      <Image
        src={loading}
        alt={loading}
        width={300}
        height={100}
        className="rounded-t-md object-cover h-full"
      ></Image>
    </div>
  );
};

export default LoadingComponents;
