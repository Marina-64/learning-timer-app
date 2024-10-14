import { useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // リセットパスワードの処理
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="メールアドレス"
      />
      <button type="submit">リセットパスワード</button>
    </form>
  );
};

export default ResetPasswordForm;
