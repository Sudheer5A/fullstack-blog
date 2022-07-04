import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import BlogsHolder from "../components/BlogsHolder";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (!session) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <title>Bloggy</title>
      <Header />
      <div>
        <BlogsHolder />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
