import Layout from "@components/layout";
import SignUp from "@components/user/signup";

export default function Home() {
  return (
    <Layout title="Login" protectedPage={false}>
      <SignUp />
    </Layout>
  );
}
