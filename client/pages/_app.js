import "../styles/globals.css";
import { BlogProvider } from "../context/blogContext";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={pageProps.repoInfo}>
        <BlogProvider>
          <Component {...pageProps} />
        </BlogProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default App;
