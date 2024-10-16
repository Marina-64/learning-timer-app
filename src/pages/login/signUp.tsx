import SignUpForm from "../../auth/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <div className="mt-20 flex justify-center">
      <div className="p-6 mx-8 border border-gray-500 rounded-lg">
        <h1 className="text-xl font-bold">Sign up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
