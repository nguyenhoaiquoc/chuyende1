import React from "react";
import BT from "./BT.jsx";
import NavigationMenu from "./NavigationMenu.jsx";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";
import ScrollTest from "../ScrollTest.jsx";
import Panel from "./Panel.jsx";
import User0008 from "./User0008.jsx";
import Policies from "./Policies.jsx";
import GridHeader from "./GridHeader.jsx";
import Gird from "./Gird.jsx";

export default function Product() {
    return (
        <div className="flex flex-col min-h-screen">
            <BT />
            {/* Thanh điều hướng */}
            <NavigationMenu />


            <Gird/>

            {/* Footer */}
            <Footer />

            {/* Nút cuộn lên đầu trang */}
            <ScrollTest />

            <Panel/>
        </div>
    );
}
