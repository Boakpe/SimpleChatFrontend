import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import SideBar from "./components/layout/SideBar";
import ChatPage from "./pages/ChatPage";
import NewChatPage from "./pages/NewChatPage";
import HistoryPage from "./pages/HistoryPage";

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
                                element={<ChatPage />}
                            />
                            <Route path="/history" element={<HistoryPage />} />
                        </Routes>
                    </div>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;