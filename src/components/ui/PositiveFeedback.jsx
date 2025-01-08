import React from "react";
import FeedbackModal from "./FeedbackModal";

const PositiveFeedback = ({ messageId, setShowPositiveFeedback, setPositiveFeedback }) => {
    return (
        <FeedbackModal
            onClose={() => setShowPositiveFeedback(false)}
            messageId={messageId}
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