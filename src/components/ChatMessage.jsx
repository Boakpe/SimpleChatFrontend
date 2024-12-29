// src/components/ChatMessage.jsx
import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
    // Determine if the message is from the user or AI to show different styling
    const isUser = message.role === "user";

    return (
        <div
            className={`flex gap-4 border border-neutral-600 rounded2-2xl p-4  ${
                isUser
                    ? "bg-neutral-100 dark:bg-neutral-900 "
                    : "bg-white dark:bg-neutral-800 "
            }`}
        >
            <div className="flex-shrink-0">
                {isUser ? (
                    <User
                        className="text-neutral-600 dark:text-neutral-100"
                        size={24}
                    />
                ) : (
                    <Bot
                        className="text-neutral-600 dark:text-neutral-100"
                        size={24}
                    />
                )}
            </div>
            <div className="flex-grow whitespace-pre-wrap dark:text-neutral-100 text-sm">
                {message.content}
            </div>
        </div>
    );
};

export default ChatMessage;
