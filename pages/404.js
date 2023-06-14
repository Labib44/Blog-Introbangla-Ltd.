import Link from "next/link";
import React from "react";
import styles from "../styles/notFound.module.css";

const NotFound = () => {
  return (
    <div className={`"mid-container" + ${styles.myErrorPge}`}>
      <section className={`${styles.page_404} + "h-[100vh] flex items-center"`}>
        <div className="container -mt-32">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className={styles.four_zero_four_bg}>
                  <h1 className={`${styles.text404}  "text-center font-bold "`}>
                    404
                  </h1>
                </div>
                <div className={styles.content_box_404}>
                  <h3 className="text-2xl font-bold">Look like you're lost</h3>
                  <p className="mb-5">
                    The page you are looking for not available!
                  </p>
                  <Link
                    href={"/"}
                    className="uppercase bg-primary text-white p-3 rounded"
                  >
                    Go To Home Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
