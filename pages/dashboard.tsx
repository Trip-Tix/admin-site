import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import { NavigationOption } from "@public/common/navigation_option";

export default function Main() {
    return (
        <Layout title="Dashboard">
            <SidebarWithHeader navItem={NavigationOption.Home}>
                <p>Dashboard</p>    
            </SidebarWithHeader>
        </Layout>
    );
}