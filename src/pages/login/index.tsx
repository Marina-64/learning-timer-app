import React, { useState } from "react";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ログイン処理
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // ログイン成功時の処理
      router.push("/?logged_in=true");
    } else {
      // ログイン失敗時の処理
      const errorCase = () => {
        router.push("/login/error");
      };
      errorCase();
    }
  };

  const forgetPassword = () => {
    router.push("/login/reset_password");
  };

  const signUp = () => {
    router.push("/login/signUp");
  };

  return (
    <div className="mx-6 flex justify-center items-center mt-20 mx- border border-gray-700 rounded-lg p-6">
      <div className="lg:w-3/4">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Value">Email</label>
            <input
              className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
              type="text"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mt-6 w-full bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
            Sign in
          </button>
          <div className="mt-6 focus:underline-offset-1 focus:underline">
            <a onClick={forgetPassword} href={forgetPassword} target="_blank" rel="noopener noreferrer">Forgot password? ></a>
          </div>
          <div className="mt-6 focus:underline-offset-1 focus:underline">
            <a onClick={signUp} href={signUp} target="_blank" rel="noopener noreferrer">Sign up ></a>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
