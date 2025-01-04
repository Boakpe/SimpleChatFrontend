// src/hooks/useChat.js
import { useState, useEffect } from "react";
import { sendMessage } from "../services/api";
import {
    getMessages,
    createMessage,
    createConversation,
} from "../services/fastapi";
import { useNavigate } from "react-router-dom"; // Add this import


export const useChat = (chatId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const initializeChat = async () => {
        try {
            setIsLoading(true);
            console.log("COMPONENT: useChat.js -- chatId: ", chatId);
            const msgs = await getMessages(chatId);
            setMessages(msgs);
        } catch (error) {
            console.error("Failed to initialize chat:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!chatId) return;
        initializeChat();
    }, [chatId]);

    const handleSendMessage = async (userInput) => {
        let currentChatId = chatId;
        
        if (!currentChatId) {
            const newChat = await createConversation(userInput, 0);
            currentChatId = newChat.id;
        }
    
        const userMessage = { role: "user", content: userInput };
        setMessages((prev) => [...prev, userMessage]);
        
        // Store user message in backend
        await createMessage(userInput, "user", currentChatId);
    
        const aiMessage = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, aiMessage]);
    
        try {
            setIsLoading(true);
            const messageHistory = [...messages, userMessage];
            let finalAiContent = "";
    
            await sendMessage(messageHistory, (newContent) => {
                finalAiContent = newContent;
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...aiMessage,
                        content: newContent,
                    };
                    return updated;
                });
            });
    
            // Store the AI answer
            await createMessage(finalAiContent, "assistant", currentChatId);
            
            // Navigate only after streaming is complete
            if (!chatId) {
                navigate(`/chat/${currentChatId}`);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    ...aiMessage,
                    content:
                        "Sorry, there was an error processing your request.",
                };
                return updated;
            });

            await createMessage(
                "Sorry, there was an error processing your request.",
                "assistant",
                chatId
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        isLoading,
        sendMessage: handleSendMessage,
    };
};
