import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import NegativeFeedback from "./NegativeFeedback";
import PositiveFeedback from "./PositiveFeedback";

const MessageFeedback = ({ messageId, feedbackStatus }) => {
    const [feedbackType, setFeedbackType] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    const handleFeedback = (type) => {
        if (feedbackType) return;
        setFeedbackType(type);
        setShowFeedbackForm(true);
    };

    return (
        <div className="w-48 my-2">
            <div className="border border-neutral-600 bg-white dark:bg-neutral-900 px-1">
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
                                feedbackStatus === "positive"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-neutral-600 dark:text-neutral-400"
                            }`}
                            onClick={() => handleFeedback("positive")}
                            disabled={feedbackStatus !== null}
                        >
                            <ThumbsUp className={"w-4 h-4 " + (feedbackStatus === null ? "group-hover:text-green-600 dark:group-hover:text-green-400" : "")} />
                        </button>
                        <button
                            className={`group flex items-center gap-2 ${
                                feedbackStatus === "negative"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-neutral-600 dark:text-neutral-400"
                            }`}
                            onClick={() => handleFeedback("negative")}
                            disabled={feedbackStatus !== null}
                        >
                            <ThumbsDown className={"w-4 h-4 " + (feedbackStatus === null ? "group-hover:text-red-600 dark:group-hover:text-red-400" : "")} />
                        </button>
                    </div>
                </div>
            </div>

            {showFeedbackForm && feedbackType === "negative" && (
                <NegativeFeedback
                    messageId={messageId}
                    setShowNegativeFeedback={() => setShowFeedbackForm(false)}
                    setFeedbackType={setFeedbackType}
                />
            )}

            {showFeedbackForm && feedbackType === "positive" && (
                <PositiveFeedback
                    messageId={messageId}
                    setShowPositiveFeedback={() => setShowFeedbackForm(false)}
                    setFeedbackType={setFeedbackType}
                />
            )}
        </div>
    );
};

export default MessageFeedback;
