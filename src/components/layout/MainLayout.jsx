// src/components/layout/MainLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex">
            <SideBar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div
                className={
                    "flex flex-col h-screen w-full min-h-screen" +
                    (sidebarOpen ? " ml-80" : " ml-16")
                }
            >
                <Header />
                <Outlet /> {/* This is where child routes will be rendered */}
            </div>
        </div>
    );
}

export default MainLayout;