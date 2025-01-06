// src/components/layout/EmptyLayout.jsx
import { Outlet } from "react-router-dom";

function EmptyLayout() {
    return (
        <div className="flex flex-col h-screen w-full min-h-screen">
            <Outlet /> {/* Child routes will be rendered here */}
        </div>
    );
}

export default EmptyLayout;