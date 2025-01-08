import React from "react";
import FeedbackModal from "./FeedbackModal";

const NegativeFeedback = ({messageId, setShowNegativeFeedback, setFeedbackType }) => {
    return (
        <FeedbackModal
            onClose={() => {
                setShowNegativeFeedback(false);
                setFeedbackType(null);
            }}
            messageId={messageId}
            onSubmit={() => {
                setShowNegativeFeedback(false);
                setFeedbackType("negative");
            }}
            feedbackType="negative"
            showTypeSelect={true}
        />
    );
};

export default NegativeFeedback;