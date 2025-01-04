import React, { useState } from "react";

const NegativeFeedback = ({ setShowNegativeFeedback }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        type: 'bug',
        description: ''
    });

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Add your submission logic here
        setTimeout(() => {
            setIsSubmitting(false);
            setShowNegativeFeedback(false);
        }, 1000);
    };

    return (
        <div className="fixed h-screen w-screen bg-black bg-opacity-50 top-0 left-0 z-30">
            <div className="fixed border-neutral-600 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 text-neutral-900 p-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-[400px] border h-[400px] flex flex-col">
                <h1 className="font-bold text-xl mb-4">Feedback</h1>
                <p className="mb-2">What type of issue do you wish to report?</p>
                <select 
                    className="border border-neutral-600 p-2 w-full mb-4 dark:bg-neutral-800 hover:border-neutral-400 "
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                    <option value="bug">Bug</option>
                    <option value="typo">Typo</option>
                    <option value="suggestion">Suggestion</option>
                </select>
                <textarea
                    className="border border-neutral-600 p-2 w-full flex-grow dark:bg-neutral-800  resize-none mb-4"
                    placeholder="Please describe the issue"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
                <div className="flex justify-end gap-4">
                    <button
                        className="bg-neutral-100 text-black p-2 w-24 hover:bg-neutral-200  disabled:opacity-50 border border-neutral-600"
                        onClick={() => setShowNegativeFeedback(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-neutral-800 text-white p-2 w-24 hover:bg-neutral-700  disabled:opacity-50 border border-neutral-600"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NegativeFeedback;