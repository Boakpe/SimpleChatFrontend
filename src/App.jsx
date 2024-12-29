import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import SideBar from "./components/SideBar";
import ChatPage from "./pages/ChatPage";
import NewChatPage from "./pages/NewChatPage";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <BrowserRouter>
            <ThemeProvider>
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
                        <Routes>
                            <Route path="/" element={<Navigate to="/new" />} />
                            <Route path="/new" element={<NewChatPage />} />
                            <Route
                                path="/chat/:chatId"
                                element={<ChatPage/>}
                            />
                        </Routes>
                    </div>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
