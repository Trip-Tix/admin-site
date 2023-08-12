import withAuth from "@components/auth/protectedRoute";
import Layout from "@components/layout";

const Profile = () => {
  return (
    <Layout title="profile" protectedPage={true}>
    </Layout>
  );
}

export default withAuth (Profile);
