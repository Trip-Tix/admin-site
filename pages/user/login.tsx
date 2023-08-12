import withAuth from "@components/auth/protectedRoute";
import Layout from "@components/layout";
import Login from "@components/user/login";

const LoginPage = () => {
  return (
    <Layout title="Login" protectedPage={false}>
      <Login />
    </Layout>
  );
}

export default withAuth(LoginPage);