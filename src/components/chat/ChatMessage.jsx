import React from "react";
import { User, Bot } from "lucide-react";
import { useParams } from "react-router-dom";
import MessageFeedback from "../ui/MessageFeedback";

const MessageAvatar = ({ isUser }) => (
    <div className="flex-shrink-0">
        {isUser ? (
            <User className="text-neutral-600 dark:text-neutral-100" size={24} />
        ) : (
            <Bot className="text-neutral-600 dark:text-neutral-100" size={24} />
        )}
    </div>
);

const ChatMessage = ({ message }) => {
    const { chatId } = useParams();
    const isUser = message.role === "user";

    const messageClasses = `flex flex-col border border-neutral-600 ${
        isUser ? "bg-neutral-100 dark:bg-neutral-900" : "bg-white dark:bg-neutral-800"
    }`;

    return (
        <div className={messageClasses}>
            <div className="flex gap-4 p-4">
                <MessageAvatar isUser={isUser} />
                <div className="flex-grow whitespace-pre-wrap dark:text-neutral-100 text-sm">
                    {message.content}
                </div>
            </div>

            {!isUser && (
                <MessageFeedback 
                    chatId={chatId}
                    message={message.content}
                />
            )}
        </div>
    );
};

export default ChatMessage;
