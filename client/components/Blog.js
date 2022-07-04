import Image from "next/image";
import style from "../styles/Blog.module.css";
import { useRouter } from "next/router";

const Blog = ({ id, name, message, timestamp, image, email, session }) => {
  const router = useRouter();

  const removeBlog = async () => {
    await fetch("http://localhost:5000/api/blog/remove", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: id }),
    }).then((res) => setTimeout(window.location.reload(), 2000));
  };

  return (
    <div className={style.blog}>
      <div id={style.blogImage}>
        <Image
          src={
            image?.data
              ? `data:image/jpeg;base64,${image?.data}`
              : "https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={style.textInfo}>
        <h1 id={style.title}>{name}</h1>
        <p id={style.message}>
          {message.substring(0, 150) + "..."}
          <span
            onClick={() =>
              router.push({
                pathname: "/AboutBlog",
                query: { id: id },
              })
            }
          >
            More
          </span>
        </p>
      </div>

      {session?.status == "authenticated" &&
      session.data.user.email == email ? (
        <div className={style.deleteBtn}>
          <button onClick={removeBlog}>Delete</button>
        </div>
      ) : (
        ""
      )}

      <div className={style.blogFooter}>
        <em id={style.timestamp}>{timestamp}</em>
      </div>
    </div>
  );
};

export default Blog;
