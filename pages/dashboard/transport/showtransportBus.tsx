import Navbar from "../../../components/navbar";
import Dashboard from "../dashboard";
import TransportOptionBar from "../../../components/transport_option_bar";
import  TransportOptionBarProps from "../../../components/transport_option_bar";
import { transport_optionbar_items } from "../../../public/commonData/TransportOptionBarData";
import { NavbarProps } from "../../../components/navbar";
import navbar_items from "../../../public/commonData/AdminNavBarData";


const PropsTransportOptionBar: typeof TransportOptionBarProps = {
    selectedOption: transport_optionbar_items[0],
};

const NavbarProps: NavbarProps = {
    selected_option: "Dashboard",
};

export default function ShowTransportBus() {
    return (
        <>
            <Navbar/>
            <TransportOptionBar {...PropsTransportOptionBar}/>
            <TransportShow/>
            <DashboardFooter/>
        </>
    );
}