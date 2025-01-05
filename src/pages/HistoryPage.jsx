import { getConversations } from "../services/api/backend";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const History = () => {
    const [conversations, setConversations] = useState([]);

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

    return (
        <main className="flex flex-1 bg-neutral-50 dark:bg-neutral-900 relative">
            <div className="h-full overflow-y-auto p-4 space-y-2 w-[920px] mx-auto ">
                <div className="mt-4 flex-1 overflow-y-auto">
                    {conversations.map((conversation) => (
                        <NavLink
                            key={conversation.id}
                            to={`/chat/${conversation.id}`}
                            className={({ isActive }) =>
                                `mx-4 mb-2 flex items-center gap-3 p-2 border border-neutral-600 rounded-none h-16 ${
                                    isActive
                                        ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-1 outline-neutral-600"
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                }`
                            }
                        >
                            <MessageSquare size={18} strokeWidth={2} />

                            <div className="flex-1 min-w-0 ">
                                <div className="truncate text-sm font-medium uppercase">
                                    {conversation.title}
                                </div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                    {new Date(
                                        conversation.created_at
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default History;
