import { useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`リセットリンクを送信しました: ${email}`);
    // リセットパスワードの処理をここに実装（API呼び出しなど）
  };

  return (
    <div className="mt-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex justify-between">
          <button type="submit" className="btn btn-ghost">
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-neutral ml-4 hover:bg-gray-600"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
