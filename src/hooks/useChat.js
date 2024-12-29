// src/hooks/useChat.js
import { useState, useEffect } from "react";
import { sendMessage } from "../services/api";
import {
    getMessages,
    createMessage,
    createConversation,
} from "../services/fastapi";

export const useChat = (chatId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

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
        if (!chatId) {
            const newChatId = await createConversation("New Chat", 0);
            console.log("COMPONENT: useChat.js -- newChatId: ", newChatId);
            chatId = newChatId.id;
        }

        const userMessage = { role: "user", content: userInput };

        setMessages((prev) => [...prev, userMessage]);

        // Store user message in backend
        console.log("COMPONENT: useChat.js -- chatId: ", chatId);
        await createMessage(userInput, "user", chatId);

        const aiMessage = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, aiMessage]);

        try {
            setIsLoading(true);
            const messageHistory = [...messages, userMessage];

            // Temporarily hold AI text
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

            // Now store the entire AI answer just once
            await createMessage(finalAiContent, "assistant", chatId);
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
