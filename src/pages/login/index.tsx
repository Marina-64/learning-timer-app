import React from "react";
import LoginForm from "../../auth/LoginForm"; // LoginFormのインポート

const LoginPage: React.FC = () => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
