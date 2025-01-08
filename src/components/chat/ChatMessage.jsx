import React from "react";
import { useParams } from "react-router-dom";
import { MessageAvatar } from "../ui/MessageAvatar";
import { MessageContent } from "./MessageContent";
import MessageFeedback from "../ui/MessageFeedback";
import LoadingAgent from "../ui/LoadingAgent";


const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";
    const { chatId } = useParams();
    const messageClasses = `flex flex-col border border-neutral-600 ${
        isUser
            ? "bg-neutral-100 dark:bg-neutral-900"
            : "bg-white dark:bg-neutral-800"
    }`;

    const contentEndsWithAgentCall = message.content
        .trim()
        .endsWith("[AGENT_CALL]");
    const displayedContent = message.content.replace(/\[AGENT_CALL\]$/, "");

    return (
        <div>
            <div className={messageClasses}>
                <div className="flex gap-4 p-4">
                    <MessageAvatar isUser={isUser} />
                    {/* <h1>{message.id} - {message.feedback_status}</h1> */}
                    <div className="flex-grow dark:text-neutral-100 text-sm">
                        {contentEndsWithAgentCall ? (
                            <>
                                <MessageContent content={displayedContent} />
                                <LoadingAgent />
                            </>
                        ) : (
                            <MessageContent content={displayedContent} />
                        )}
                    </div>
                </div>
            </div>
            {!isUser && (
                <MessageFeedback messageId={message.id} feedbackStatus={message.feedback_status} key={`feedback-${chatId}-${message.id}`} />
            )}
        </div>
    );
};

export default ChatMessage;
