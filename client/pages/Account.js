import { getSession, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import NoAccount from "../components/NoAccount";
import style from "../styles/Account.module.css";
import Image from "next/image";
import { BlogContext } from "../context/blogContext";
import Blog from "../components/Blog";

const Account = () => {
  const [user, setUser] = useState();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { blogData } = useContext(BlogContext);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setUser(session?.data?.user);
    setFilteredBlogs(
      blogData?.blog.filter((data) => data.email === session?.data?.user?.email)
    );
  }, []);

  return (
    <div className={style.account}>
      <div className={style.accountHeader}>
        <button onClick={() => router.push("/")}>
          <IoIosArrowBack size={25} /> Back
        </button>

        {session.status == "unauthenticated" ? (
          <AiOutlineUser size={25} color="white" />
        ) : (
          <div className={style.accountInfo}>
            <div id={style.userImg}>
              <Image
                src={
                  user?.image
                    ? user.image
                    : "https://images.pexels.com/photos/7485787/pexels-photo-7485787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                layout="fill"
              />
            </div>
            <div>
              <h3>{user?.name}</h3>
              <a
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>

      {session.status == "unauthenticated" ? (
        <NoAccount />
      ) : (
        <div className={style.accountBody}>
          <h2>Your blogs</h2>
          <div className={style.accountBlogs}>
            {filteredBlogs.map((item) => {
              return (
                <Blog
                  name={item.name}
                  message={item.message}
                  id={item.id}
                  image={item.image}
                  email={item.email}
                  session={session}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
