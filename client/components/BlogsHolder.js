import { BlogContext } from "../context/blogContext";
import { useContext } from "react";
import Blog from "./Blog";
import style from "../styles/BlogsHolder.module.css";

const BlogsHolder = () => {
  const { blogData } = useContext(BlogContext);

  return (
    <div className={style.blogs}>
      {blogData?.blog.map((blog) => {
        return (
          <Blog
            id={blog?.id}
            name={blog.name}
            message={blog.message}
            timestamp={blog.timestamp}
            image={blog.image}
          />
        );
      })}
    </div>
  );
};

export default BlogsHolder;
