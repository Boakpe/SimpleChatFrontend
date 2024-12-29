import { useParams } from "react-router-dom";
import MainContent from "../components/MainContent";
import { useChat } from "../hooks/useChat";

function ChatPage({new_chat}) {
    const { chatId } = useParams();

    const { messages, isLoading, sendMessage } = useChat(chatId);

    return (
        <MainContent
            messages={messages}
            sendMessage={sendMessage}
            isLoading={isLoading}
        />
    );
}

export default ChatPage;
