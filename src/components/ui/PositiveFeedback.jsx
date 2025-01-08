import React from "react";
import FeedbackModal from "./FeedbackModal";

const PositiveFeedback = ({ messageId, setShowPositiveFeedback, setFeedbackType }) => {
    return (
        <FeedbackModal
            onClose={() => {
                setShowPositiveFeedback(false);
                setFeedbackType(null);
            }}
            messageId={messageId}
            onSubmit={() => {
                setShowPositiveFeedback(false);
                setFeedbackType("positive");
            }}
            feedbackType="positive"
            showTypeSelect={false}
        />
    );
};

export default PositiveFeedback;