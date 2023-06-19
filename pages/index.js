import Head from "next/head";
import { useContext } from "react";
// import Contact from "../src/Components/Contact";
import CreateContext from "../src/Components/CreateContex";
// import FeatureBlog from "../src/Components/FeauturedBlog/FeatureBlog";
import Banner from "../src/Components/Home/Banner/Banner";
import Subscribe from "../src/Components/Home/Subscribe/Subscribe";
import LatestBlogs from "../src/Components/LatestBlog.js/LatestBlogs";
import PopularBlogs from "../src/Components/PopularBlogs.js/PopularBlogs";

export default function Home() {

  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>Blog - Introbangla Ltd.</title>
        <meta name="description" content="Blog - Introbangla Ltd." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <PopularBlogs />
      <LatestBlogs />
      <Subscribe/>
      {/* <FeatureBlog/>
      <Contact/> */}
    </>
  );
}
