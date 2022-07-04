import { useRouter } from "next/router";
import { BlogContext } from "../context/blogContext";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import style from "../styles/AboutBlog.module.css";
import Image from "next/image";

const AboutBlog = () => {
  const { blogData } = useContext(BlogContext);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setBlog(blogData?.blog.filter((data) => data.id === router.query.id));
  }, []);

  return (
    <div className={style.aboutBlog}>
      <title>{blog[0]?.name}</title>

      <div className={style.aboutBlogHeader}>
        <a href="/">
          <IoIosArrowBack size={25} /> Back
        </a>
      </div>

      <div className={style.aboutBlogContent}>
        <div className={style.aboutBlogImg}>
          <Image
            src={
              blog[0]?.image?.data
                ? `data:image/jpeg;base64,${blog[0]?.image?.data}`
                : "https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1>{blog[0]?.name}</h1>
        <em>{blog[0]?.timestamp}</em>
        <p>{blog[0]?.message}</p>
      </div>
    </div>
  );
};

export default AboutBlog;
