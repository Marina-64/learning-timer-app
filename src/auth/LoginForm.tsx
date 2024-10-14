import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); //エラーメッセージテストする時はuseState("Sample error message.")入れる
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページの再読み込みを防ぐ
    setIsLoading(true);

    if (!email || !/\S+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      // \S+: 1文字以上の空白以外の文字
      // @: 「@」という文字が含まれている
      // [a-zA-Z\d.-]+: ドメイン部分に英数字や「.」「-」が1つ以上
      // \.[a-zA-Z]{2,}$: トップレベルドメインは2文字以上（例: .com, .co.jp）
      alert("有効なメールアドレスを入力してください。");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("6文字以上のパスワードを入力してください。");
      setIsLoading(false);
      return;
    }

    // ログイン処理
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }), // 入力内容をAPIに送信
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    if (response.ok) {
      // ログイン成功時の処理
      router.push("/?logged_in=true");
    } else {
      // ログイン失敗時の処理
      const errorDate = await response.json();
      setErrorMessage(errorDate.error || "The login or the password is wrong.");
    }
  };

  const forgetPassword = () => {
    router.push("/login/reset_password");
  };

  const signUp = () => {
    router.push("/login/signUp");
  };

  return (
    <div>
      <div className="mt-4 flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label htmlFor="password">Password</label>
            <input
              className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-neutral mt-6 w-full hover:bg-gray-600">
            Sign in
          </button>
          <div className="mt-6 flex">
            <a
              onClick={forgetPassword}
              className="underline underline-offset-4 hover:text-blue-500 transition-colors"
            >
              Forgot password?
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 translate-y-[2px]" // SVGの高さと位置を調整
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="mt-6 flex">
            <a
              onClick={signUp}
              className="underline underline-offset-4 hover:text-blue-500 transition-colors"
            >
              Sign up
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 translate-y-[2px]" // SVGの高さと位置を調整
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </form>
      </div>
      {errorMessage && (
        <div className="mx-6 mt-6 flex gap-2 bg-gray-100 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500" // サイズと色のクラスを追加
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
