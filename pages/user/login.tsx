import Layout from "@components/layout";
import Login from "@components/user/login";

export default function Home() {
  return (
    <Layout title="Login" protectedPage={false}>
      <Login />
    </Layout>
  );
}
