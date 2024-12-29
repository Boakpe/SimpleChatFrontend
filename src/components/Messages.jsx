import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const Messages = ({ messages }) => {
    const chatContainerRef = useRef(null);
    // Automatically scroll to bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={chatContainerRef}
            className=" p-4 space-y-4 w-[724px] mx-auto"
        >
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
        </div>
    );
};

export default Messages;
