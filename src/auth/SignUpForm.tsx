import { useState } from "react";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // パスワードの表示非表示

  const router = useRouter();

  const validatePassword = (password: string) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/; // 半角英数字のみ
    const containsBoth = /^(?=.*[a-zA-Z])(?=.*\d)/; // 英字、数字の両方を含む
    if (!alphanumericRegex.test(password)) {
      return "パスワードは半角英数字のみ使用できます。";
    }
    if (!containsBoth.test(password)) {
      return "パスワードは英字と数字の両方を使用してください。";
    }
    if (password.length < 6) {
      return "6文字以上のパスワードを入力してください。";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      alert(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      alert("パスワードと確認用パスワードが一致しません。");
      return;
    }
    if (!email || !/\S+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("有効なメールアドレスを入力してください。");
      return;
    }
    // ↓仮で入れてます
    const response = await fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      // JSON.stringifyでオブジェクトを文字列に変換
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("アカウントを作成しました。ログインしてください。");
      router.push("/login"); // ログイン画面に遷移
    } else {
      const { message } = await response.json();
      setErrorMessage(message);
    }
  };

  return (
    <div className="mt-4 flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
            type="text"
            id="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mt-6">
          <label htmlFor="email">Email</label>
          <input
            className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-6 relative">
          <label htmlFor="password">Password(半角英数字両方6文字以上)</label>
          <div className="mt-2 flex items-center border border-neutral-300 rounded-lg">
            <input
              className="w-full p-2 rounded-l-lg"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="p-2 text-gray-500"
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                // hide
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                    clipRule="evenodd"
                  />
                  <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                </svg>
              ) : (
                // show
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mt-6 relative">
          <label htmlFor="password">※Confirm Password</label>
          <div className="mt-2 flex items-center border border-neutral-300 rounded-lg">
            <input
              className="w-full p-2 rounded-l-lg"
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className="p-2 text-gray-500"
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                // hide
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                    clipRule="evenodd"
                  />
                  <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                </svg>
              ) : (
                // show
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button className="btn btn-neutral mt-6 w-full hover:bg-gray-600">
          Submit
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
