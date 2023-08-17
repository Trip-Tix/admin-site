import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";

export default function Main() {
    return (
        <Layout title="Dashboard">
            <SidebarWithHeader>
                <p>Dashboard</p>    
            </SidebarWithHeader>
        </Layout>
    );
}