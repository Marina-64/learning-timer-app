import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import Login from "../pages/login";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (!router.query.logged_in) {
    return <Login />;
  }

  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
