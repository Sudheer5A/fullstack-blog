import style from "../styles/Header.module.css";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

const Header = () => {
  const router = useRouter();
  return (
    <div className={style.header}>
      <h1 className={style.headerTitle}>Bloggy</h1>
      <nav>
        <button id={style.newBtn} onClick={() => router.push("/Account")}>
          <AiOutlineUser size={20} color="white" /> Account
        </button>
        <button id={style.newBtn} onClick={() => router.push("/NewBlog")}>
          <IoCreateOutline size={20} /> New
        </button>
      </nav>
    </div>
  );
};

export default Header;
