import React from "react";
import FeedbackModal from "./FeedbackModal";

const PositiveFeedback = ({ setShowPositiveFeedback, chatId, message, setPositiveFeedback }) => {
    return (
        <FeedbackModal
            onClose={() => setShowPositiveFeedback(false)}
            chatId={chatId}
            message={message}
            onSubmit={() => {
                setShowPositiveFeedback(false);
                setPositiveFeedback(true);
            }}
            feedbackType="positive"
            showTypeSelect={false}
        />
    );
};

export default PositiveFeedback;