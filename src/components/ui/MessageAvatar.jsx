import React from "react";
import { User, Bot } from "lucide-react";

export const MessageAvatar = ({ isUser }) => (
    <div className="flex-shrink-0 absolute -translate-x-[52px]">
        {isUser ? (
            <User className="text-neutral-600 dark:text-neutral-100 " size={24} />
        ) : (
            <Bot className="text-neutral-600 dark:text-neutral-100 " size={24} />
        )}
    </div>
);