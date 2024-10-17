import React from "react";
import LoginForm from "../../auth/LoginForm"; // LoginFormのインポート

const LoginPage: React.FC = () => {
  return (
    <div className="mt-20 flex justify-center">
      <div className="p-6 border border-gray-500 rounded-lg">
        <h1 className="text-xl font-bold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
