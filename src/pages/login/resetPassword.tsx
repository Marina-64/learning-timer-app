import ResetPasswordForm from "../../auth/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="mt-20 flex justify-center">
      <div className="p-6 border border-gray-500 rounded-lg">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
