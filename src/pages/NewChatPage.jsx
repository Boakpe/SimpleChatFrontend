import MainContent from "../components/MainContent";
import { useChat } from "../hooks/useChat";

function NewChatPage() {
    const { messages, isLoading, sendMessage } = useChat(undefined);

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
