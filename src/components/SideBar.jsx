import { PanelLeft, Plus, MessageSquare } from "lucide-react";
import { getConversations } from "../services/fastapi";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
    const [conversations, setConversations] = useState([]);

    const fetchConversations = async () => {
        try {
            const data = await getConversations(0, 10);
            setConversations(data);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    return (
        <aside
            className={`fixed h-screen bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-600 z-10 ${
                sidebarOpen ? "w-80" : "w-16"
            }`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-neutral-600 dark:border-neutral-600 h-16">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 border border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-none"
                    >
                        <PanelLeft
                            className="text-neutral-600 dark:text-neutral-300"
                            size={20}
                            strokeWidth={1.5}
                        />
                    </button>
                    {sidebarOpen && (
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 uppercase">
                            Conversations
                        </span>
                    )}
                </div>

                {/* New Chat Button */}
                <NavLink 
                    to="/"
                    className={({ isActive }) =>
                        `mx-4 mt-4 flex items-center gap-3 p-2 border border-neutral-600 rounded-none ${
                            isActive 
                                ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white" 
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`
                    }
                >
                    <Plus size={18} strokeWidth={1.5} />
                    {sidebarOpen && <span className="font-medium uppercase">New Chat</span>}
                </NavLink>

                {/* Conversations List */}
                <div className="mt-4 flex-1 overflow-y-auto">
                    {conversations.map((conversation) => (
                        <NavLink
                            key={conversation.id}
                            to={`/chat/${conversation.id}`}
                            className={({ isActive }) =>
                                `mx-4 mb-2 flex items-center gap-3 p-2 border border-neutral-600 rounded-none ${
                                    isActive 
                                        ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-1 outline-neutral-600" 
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                }`
                            }
                        >
                            <MessageSquare size={18} strokeWidth={1.5} />
                            {sidebarOpen && (
                                <div className="flex-1 min-w-0 ">
                                    <div className="truncate text-sm font-medium uppercase">
                                        {conversation.title}
                                    </div>
                                    <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                        {new Date(conversation.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default SideBar;