import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import NegativeFeedback from "./NegativeFeedback";
import PositiveFeedback from "./PositiveFeedback";

const MessageFeedback = ({ chatId, message }) => {
    const [feedbackType, setFeedbackType] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    const handleFeedback = (type) => {
        if (feedbackType) return;
        setFeedbackType(type);
        setShowFeedbackForm(true);
    };

    return (
        <div className="w-48 my-2">
            <div className="border border-neutral-600 bg-white dark:bg-neutral-900">
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-1 p-2">
                        <div className="w-2 h-2 bg-neutral-600 dark:bg-neutral-400" />
                        <span className="text-xs font-medium uppercase text-neutral-600 dark:text-neutral-400">
                            Feedback
                        </span>
                    </div>

                    <div className="flex gap-2 items-center p-2">
                        <button
                            className={`group flex items-center gap-2 ${
                                feedbackType === "positive"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-neutral-600 dark:text-neutral-400"
                            }`}
                            onClick={() => handleFeedback("positive")}
                            disabled={feedbackType !== null}
                        >
                            <ThumbsUp className="w-4 h-4 group-hover:text-green-600 dark:group-hover:text-green-400" />
                        </button>
                        <button
                            className={`group flex items-center gap-2 ${
                                feedbackType === "negative"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-neutral-600 dark:text-neutral-400"
                            }`}
                            onClick={() => handleFeedback("negative")}
                            disabled={feedbackType !== null}
                        >
                            <ThumbsDown className="w-4 h-4 group-hover:text-red-600 dark:group-hover:text-red-400" />
                        </button>
                    </div>
                </div>
            </div>

            {showFeedbackForm && feedbackType === "negative" && (
                <NegativeFeedback
                    setShowNegativeFeedback={() => setShowFeedbackForm(false)}
                    chatId={chatId}
                    message={message}
                    setNegativeFeedback={() => setFeedbackType("negative")}
                />
            )}

            {showFeedbackForm && feedbackType === "positive" && (
                <PositiveFeedback
                    setShowPositiveFeedback={() => setShowFeedbackForm(false)}
                    chatId={chatId}
                    message={message}
                    setPositiveFeedback={() => setFeedbackType("positive")}
                />
            )}
        </div>
    );
};

export default MessageFeedback;
