import withAuth from "@components/auth/protectedRoute";
import Layout from "@components/layout";

const Settings = () => {
  return (
    <Layout title="Settings" protectedPage={true}>
    </Layout>
  );
}

export default withAuth (Settings);