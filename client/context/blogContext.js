import { createContext } from "react";
import useSWR from "swr";

export const BlogContext = createContext();

const fetcher = async (url) =>
  await fetch(url, { method: "GET" }).then((res) => res.json());

const API = "http://localhost:5000/api/blog/get";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  return {
    props: {
      repoInfo,
    },
  };
}

export const BlogProvider = ({ children }) => {
  const { data: blogData, error } = useSWR(API, fetcher);

  return (
    <BlogContext.Provider value={{ blogData }}>{children}</BlogContext.Provider>
  );
};
