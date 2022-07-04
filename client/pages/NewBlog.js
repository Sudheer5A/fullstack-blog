import style from "../styles/NewBlog.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useSession } from "next-auth/react";
import NoAccount from "../components/NoAccount";
import axios from "axios";

const NewBlog = () => {
  const router = useRouter();
  const session = useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const postBlog = async (e) => {
    const fd = new FormData();
    e.preventDefault();
    if (name == "" && message == "" && image == null)
      return alert("Name and message are required!");
    setLoading(!loading);
    fd.append("name", name);
    fd.append("message", message);
    fd.append("image", image);
    fd.append("email", session?.data?.user?.email);

    await axios
      .post("http://localhost:5000/api/blog/add", fd)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));

    setImage("");
    setMessage("");
    setName("");
    router.push("/");
  };

  return (
    <div className={style.newblog}>
      <title>Create new</title>
      <div className={style.newBlogHeader}>
        <a onClick={() => router.back()}>
          <IoIosArrowBack size={25} /> Back
        </a>

        <a onClick={() => router.push("/")}>
          <MdOutlineCancel size={25} /> Cancel
        </a>
      </div>

      {session.status == "unauthenticated" ? (
        <NoAccount />
      ) : (
        <form
          className={style.blogForm}
          onSubmit={postBlog}
          encType="multipart/form-data"
        >
          <input
            onChange={(e) => {
              if (e.target.files[0].size > 100000) {
                setImage(null);
                alert("Image size should be less than 1MB");
              } else {
                setImage(e.target.files[0]);
              }
            }}
            type="file"
            placeholder="Upload file"
            fileName="image"
          />{" "}
          <input
            value={name}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            value={message}
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          ></textarea>
          {loading ? (
            <div id={style.loader}>
              <span id={style.circle}></span>
              <span id={style.circle}></span>
              <span id={style.circle}></span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={image && message && image ? false : true}
            >
              Post
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default NewBlog;
