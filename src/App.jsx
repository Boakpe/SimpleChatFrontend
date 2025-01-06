// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import EmptyLayout from "./components/layout/EmptyLayout";
import ChatPage from "./pages/ChatPage";
import NewChatPage from "./pages/NewChatPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage"; // Create this component

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/new" />} /> 
                    
                    {/* Routes with MainLayout (Header and SideBar) */}
                    <Route element={<MainLayout />}>
                        <Route path="/new" element={<NewChatPage />} />
                        <Route path="/chat/:chatId" element={<ChatPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                    </Route>

                    {/* Routes with EmptyLayout (No Header/SideBar) */}
                    <Route element={<EmptyLayout />}>
                        <Route path="*" element={<NotFoundPage />} />
                        {/* Add other routes that need an empty layout here, e.g., login, signup, etc. */}
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;