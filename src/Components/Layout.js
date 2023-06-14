import { useRouter } from "next/router";
import React from "react";
import { Toaster } from "react-hot-toast";
import Footers from "../Shared/Footers";
import Navbar from "../Shared/Navbar";

function Layout({ children }) {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
      {/* {!pathName.includes("admin") ? (
        <Footers></Footers>
      ) : (
        <footer>Dashboarder</footer>
      )} */}
      {!pathName.includes("admin") && (
        <Footers></Footers>
      )}
      <Toaster />
    </>
  );
}

export default Layout;
