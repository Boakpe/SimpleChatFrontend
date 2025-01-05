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
        console.log(`${type} feedback received`);
    };

    const buttonClass = (isActive) => 
        `hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 ${
            isActive ? "bg-neutral-200 dark:bg-neutral-700" : ""
        }`;

    return (
        <>
            <div className="flex justify-end border-t border-neutral-600 p-x bg-stripes">
                <button
                    className={buttonClass(feedbackType === 'positive')}
                    onClick={() => handleFeedback('positive')}
                >
                    <ThumbsUp className="text-neutral-600 dark:text-neutral-100" size={18} />
                </button>
                <button
                    className={buttonClass(feedbackType === 'negative')}
                    onClick={() => handleFeedback('negative')}
                >
                    <ThumbsDown className="text-neutral-600 dark:text-neutral-100" size={18} />
                </button>
            </div>

            {showFeedbackForm && feedbackType === 'negative' && (
                <NegativeFeedback
                    setShowNegativeFeedback={() => setShowFeedbackForm(false)}
                    chatId={chatId}
                    message={message}
                    setNegativeFeedback={() => setFeedbackType('negative')}
                />
            )}

            {showFeedbackForm && feedbackType === 'positive' && (
                <PositiveFeedback
                    setShowPositiveFeedback={() => setShowFeedbackForm(false)}
                    chatId={chatId}
                    message={message}
                    setPositiveFeedback={() => setFeedbackType('positive')}
                />
            )}
        </>
    );
};

export default MessageFeedback;
