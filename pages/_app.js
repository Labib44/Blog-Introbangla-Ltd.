import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "regenerator-runtime/runtime";
import CreateContext from "../src/Components/CreateContex";
import Layout from "../src/Components/Layout";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../src/features/app/store";
import Head from "next/head";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [richTextContent, setRichTextContent] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reloader, setReloader] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState();
  const [richTextValue, setRichTextValue] = useState("");

  const value = {
    richTextContent,
    setRichTextContent,
    richTextValue,
    setRichTextValue,
    user,
    setUser,
    setToken,
    token,
    reloader,
    setReloader,
    blogs,
    setBlogs,
    loading,
    setLoading,
    setDark,
    dark,
    refresh,
    setRefresh,
    setUpdate,
    update,
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://api.introbangla.com/api/v1/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data?.data?.blogs);
      })
      .catch((err) => err)
      .finally(() => setLoading(false));
  }, [refresh, update]);

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="nnVU7oZpgxK_CZ9PCUWyh7aQFw2bKIAkFUJ6wursOxE"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CreateContext.Provider value={value}>
          <Layout>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </Layout>
        </CreateContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
