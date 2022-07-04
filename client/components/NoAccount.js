import { signIn } from "next-auth/react";
import style from "../styles/NoAccount.module.css";

const NoAccount = () => {
  return (
    <div className={style.noaccount}>
      <h1>You are not signed in</h1>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default NoAccount;
