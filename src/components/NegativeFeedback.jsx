import React from "react";
import FeedbackModal from "./FeedbackModal";

const NegativeFeedback = ({ setShowNegativeFeedback, chatId, message, setNegativeFeedback }) => {
    return (
        <FeedbackModal
            onClose={() => setShowNegativeFeedback(false)}
            chatId={chatId}
            message={message}
            onSubmit={() => {
                setShowNegativeFeedback(false);
                setNegativeFeedback(true);
            }}
            feedbackType="negative"
            showTypeSelect={true}
        />
    );
};

export default NegativeFeedback;