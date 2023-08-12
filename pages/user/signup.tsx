import withAuth from "@components/auth/protectedRoute";
import Layout from "@components/layout";
import SignUp from "@components/user/signup";

const SignUpPage = () => {
  return (
    <Layout title="Login" protectedPage={false}>
      <SignUp />
    </Layout>
  );
}

export default withAuth(SignUpPage);
