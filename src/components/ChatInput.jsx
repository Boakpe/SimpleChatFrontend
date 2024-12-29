// src/components/ChatInput.jsx
import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const ChatInput = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);

    const updateHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height to auto to get correct scrollHeight
        textarea.style.height = "24px"; // Single line height
        
        // Calculate new height
        const newHeight = Math.min(textarea.scrollHeight, 120); // 120px = ~5 lines
        textarea.style.height = `${newHeight}px`;
    };

    useEffect(() => {
        updateHeight();
    }, [input]);

    const handleSubmit = () => {
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="border border-neutral-600 flex flex-col rounded2-t-2xl dark:border-neutral-600 border-b-0">
            <textarea
                ref={textareaRef}
                className="rounded2-t-2xl resize-none p-4 outline-none dark:bg-neutral-800 dark:text-white bg-white overflow-y-auto"
                style={{ 
                    minHeight: "24px",
                    maxHeight: "120px",
                    lineHeight: "24px"
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                disabled={isLoading}
                rows={1}
            />
            <div className="flex justify-between items-center p-2 px-4 bg-neutral-100 dark:bg-neutral-800">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {isLoading ? "AI is thinking..." : "Press Enter to send"}
                </div>
                <button
                    className={`border border-neutral-600 dark:border-neutral-600 p-2 rounded2-xl group ${
                        input && !isLoading
                            ? "bg-neutral-800 dark:bg-neutral-400"
                            : "bg-neutral-100 dark:bg-neutral-800"
                    }`}
                    onClick={handleSubmit}
                    disabled={isLoading || !input.trim()}
                >
                    <ArrowRight
                        className={`${
                            input && !isLoading
                                ? "-rotate-90 text-neutral-100 dark:text-neutral-800"
                                : "text-neutral-600 dark:text-neutral-400"
                        }`}
                        size={20}
                    />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
