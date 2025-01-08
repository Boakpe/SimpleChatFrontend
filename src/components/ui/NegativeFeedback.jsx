import React from "react";
import FeedbackModal from "./FeedbackModal";

const NegativeFeedback = ({messageId, setShowNegativeFeedback, setNegativeFeedback }) => {
    return (
        <FeedbackModal
            onClose={() => setShowNegativeFeedback(false)}
            messageId={messageId}
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