import React, { useState } from "react";
import { User, Bot, ThumbsUp, ThumbsDown } from "lucide-react";
import { useParams } from "react-router-dom";
import NegativeFeedback from "./NegativeFeedback";
import PositiveFeedback from "./PositiveFeedback"; // Add this import

const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";
    const { chatId } = useParams();
    const [showNegativeFeedback, setShowNegativeFeedback] = useState(false);
    const [showPositiveFeedback, setShowPositiveFeedback] = useState(false);

    const handleNegativeFeedback = () => {
        setShowNegativeFeedback(true);
        setShowPositiveFeedback(false);
        console.log("Negative feedback received");
    };

    const handlePositiveFeedback = () => {
        setShowPositiveFeedback(true);
        setShowNegativeFeedback(false);
        console.log("Positive feedback received");
    };

    return (
        <>
            <div
                className={`flex flex-col border border-neutral-600  ${
                    isUser
                        ? "bg-neutral-100 dark:bg-neutral-900"
                        : "bg-white dark:bg-neutral-800"
                }`}
            >
                <div className="flex gap-4 p-4">
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

                {!isUser && (
                    <>
                        <div className="flex justify-end border-t border-neutral-600">
    <button
        className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2"
        onClick={handlePositiveFeedback}
    >
        <ThumbsUp
            className="text-neutral-600 dark:text-neutral-100"
            size={18}
        />
    </button>
    <button
        className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2"
        onClick={handleNegativeFeedback}
    >
        <ThumbsDown
            className="text-neutral-600 dark:text-neutral-100 "
            size={18}
        />
    </button>
</div>
                        {showNegativeFeedback && (
                            <NegativeFeedback
                                setShowNegativeFeedback={
                                    setShowNegativeFeedback
                                }
                            />
                        )}
                        {showPositiveFeedback && <PositiveFeedback />}
                    </>
                )}
            </div>
        </>
    );
};

export default ChatMessage;
