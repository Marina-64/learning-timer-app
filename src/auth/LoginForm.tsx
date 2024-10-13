import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    <div className="mx-6 flex justify-center items-center border border-gray-700 rounded-lg p-6">
      <div className="lg:w-3/4">
        <form onSubmit={handleSubmit}>
          {errorMessage &&
          <div>
            <div className="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <p className="text-red-500">{errorMessage}</p>
          </div>}
          <div>
            <label htmlFor="Value">Email</label>
            <input
              className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label htmlFor="Value">Password</label>
            <input
              className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mt-6 w-full bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
            Sign in
          </button>
          <div className="mt-6 focus:underline-offset-1 focus:underline">
            <a onClick={forgetPassword}>Forgot password? ></a>
          </div>
          <div className="mt-6 focus:underline-offset-1 focus:underline">
            <a onClick={signUp}>Sign up ></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ email, username, password }); // 実際にはここでログイン処理を呼び出す
//   };
//   return (
//     <form className="card bg-base-100 w-96 shadow-xl" onSubmit={handleSubmit}>
//       <div className="card-body">
//         <label
//           htmlFor="email"
//           className="input input-bordered flex items-center gap-2"
//         >
//           <input
//             id="email"
//             type="text"
//             className="grow"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label
//           htmlFor="username"
//           className="input input-bordered flex items-center gap-2"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="h-4 w-4 opacity-70"
//           >
//             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//           </svg>
//           <input
//             id="username"
//             type="text"
//             className="grow"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="h-4 w-4 opacity-70"
//           >
//             <path
//               fillRule="evenodd"
//               d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input
//             id="password"
//             type="password"
//             className="grow"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <div className="card-actions justify-end">
//           <button type="submit" className="btn btn-block neutral">
//             Sign In
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };


