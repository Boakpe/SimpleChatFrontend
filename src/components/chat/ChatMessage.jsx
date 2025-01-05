import React from "react";
import { useParams } from "react-router-dom";
import { MessageAvatar } from "../ui/MessageAvatar";
import { MessageContent } from "./MessageContent";
import MessageFeedback from "../ui/MessageFeedback";

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
                <div className="flex-grow dark:text-neutral-100 text-sm">
                    <MessageContent content={message.content} />
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
