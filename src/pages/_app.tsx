import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

// ログインページをSSRなしで読み込み
const Login = dynamic(() => import("../pages/login"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  // ここから一時的に無効化。テストするときにコメントアウト解除
  // const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // // ログイン状態を確認
  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("logged_in") === "true";
  //   setIsLoggedIn(loggedIn);
  // }, []);

  // // ログイン状態がまだ確認されていない場合は何も表示しない
  // if (isLoggedIn === null) return null;

  // // 未ログインの場合はログインページに遷移
  // if (!isLoggedIn) {
  //   return <Login />;
  // }
  // テストするときここまで解除

  // ログイン済みの場合はアプリのコンポーネントを表示
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
