import { getConversations } from "../services/api/backend";
import { MessageSquare, Clock, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const History = () => {
    const [conversations, setConversations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchConversations = async () => {
        try {
            const data = await getConversations(0, 100);
            setConversations(data);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    const filteredConversations = conversations.filter(conv => 
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex flex-1 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-[920px] w-full mx-auto px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock 
                            className="text-neutral-600 dark:text-neutral-300" 
                            size={24} 
                            strokeWidth={2}
                        />
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                            Conversation History
                        </h1>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative">
                        <Search 
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" 
                            size={18} 
                            strokeWidth={2}
                        />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-600 
                                     text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400
                                     focus:outline-none focus:ring-1 focus:ring-neutral-600"
                        />
                    </div>
                </div>

                {/* Conversations List */}
                <div className="space-y-3">
                    {filteredConversations.length === 0 ? (
                        <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
                            No conversations found
                        </div>
                    ) : (
                        filteredConversations.map((conversation) => (
                            <NavLink
                                key={conversation.id}
                                to={`/chat/${conversation.id}`}
                                className={({ isActive }) =>
                                    `block border border-neutral-600 transition-colors duration-200 ${
                                        isActive
                                            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                            : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    }`
                                }
                            >
                                <div className="flex items-center gap-4 p-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 flex items-center justify-center  bg-neutral-50 dark:bg-neutral-800">
                                            <MessageSquare 
                                                className="text-neutral-600 dark:text-neutral-300" 
                                                size={20} 
                                                strokeWidth={2}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm font-medium uppercase truncate">
                                            {conversation.title}
                                        </h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={14} strokeWidth={2} className="text-neutral-500 dark:text-neutral-500" />
                                            <time className="text-xs text-neutral-500 dark:text-neutral-500">
                                                {new Date(conversation.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default History;