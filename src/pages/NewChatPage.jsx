import { useParams } from "react-router-dom";
import MainContent from "../components/MainContent";
import { useChat } from "../hooks/useChat";
import { getNextId } from "../services/fastapi";
import { useEffect } from "react";

function NewChatPage({new_chat}) {
    const { chatId } = useParams();
    const { messages, isLoading, sendMessage } = useChat(chatId);
    const initializeChat = async () => {
        try {
            const nextId = await getNextId();
            console.log("Next ID:", nextId);
        } catch (error) {
            console.error("Failed to get next ID:", error);
        }
    };

    useEffect(() => {
        initializeChat();
    }, []);

    return (
        <>
        <MainContent
            messages={messages}
            sendMessage={sendMessage}
            isLoading={isLoading}
        />
        </>
    );
}

export default NewChatPage;
