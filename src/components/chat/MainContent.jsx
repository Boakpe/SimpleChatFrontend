import MessagesList from "./MessagesList";
import ChatInput from "../ui/ChatInput";

function MainContent({ messages, sendMessage, isLoading }) {
    return (
        <main className="flex flex-col flex-1 bg-neutral-50 dark:bg-neutral-900 relative">
            <div className="h-full">
                <MessagesList messages={messages} />
            </div>
            <div className="bottom-0 left-0 right-0 w-full sticky">
                <div className="w-[752px] mx-auto">
                    <ChatInput
                        onSendMessage={sendMessage}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
}

export default MainContent;