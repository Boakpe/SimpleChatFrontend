import MainContent from "../components/chat/MainContent";
import { useChat } from "../hooks/useChat";
import { MessageSquare, Search, Database, Map, ArrowRight } from "lucide-react";
import { useState } from "react";

const ExampleQuery = ({ icon: Icon, title, query, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-start gap-4 p-4 border border-neutral-600 bg-white dark:bg-neutral-800 
                 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200 w-full text-left"
    >
        <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 flex items-center justify-center border border-neutral-600 bg-neutral-50 dark:bg-neutral-900">
                <Icon className="text-neutral-600 dark:text-neutral-300" size={20} strokeWidth={2} />
            </div>
        </div>
        <div>
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-1">
                {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {query}
            </p>
        </div>
    </button>
);

const CustomQueryInput = ({ onSubmit }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSubmit(query);
            setQuery("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center">
                <textarea
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Faça sua própria pergunta..."
                    className="w-full p-4 pr-12 bg-white dark:bg-neutral-800 border border-neutral-600
                             text-neutral-900 dark:text-white placeholder-neutral-500
                             focus:outline-none focus:ring-1 focus:ring-neutral-600 resize-none "
                />
                <button
                    type="submit"
                    disabled={!query.trim()}
                    className="absolute right-4 p-2 text-neutral-600 dark:text-neutral-300
                             disabled:opacity-50 disabled:cursor-not-allowed
                             hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
                >
                    <ArrowRight size={20} strokeWidth={2} />
                </button>
            </div>
        </form>
    );
};

function NewChatPage() {
    const { messages, isLoading, sendMessage } = useChat(undefined);
    const [showWelcome, setShowWelcome] = useState(messages.length === 0);

    const handleExampleClick = (query) => {
        sendMessage(query);
        setShowWelcome(false);
    };

    const examples = [
        {
            icon: Database,
            title: "Análise de Seccionais",
            query: "Quantos produtores estão cadastrados em cada seccional?",
        },
        {
            icon: Search,
            title: "Dados de Belo Horizonte",
            query: "Quais são todos os dados dos produtores da coordenadoria de Belo Horizonte?",
        },
        {
            icon: Map,
            title: "Distribuição Municipal",
            query: "Quantas propriedades existem em cada município?",
        },
    ];

    return (
        <div className="flex flex-1 flex-col bg-neutral-50 dark:bg-neutral-900">
            {showWelcome ? (
                <div className="max-w-[920px] w-full mx-auto px-6 py-12">
                    <div className="mb-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center border border-neutral-600 bg-white dark:bg-neutral-800">
                                <MessageSquare className="text-neutral-600 dark:text-neutral-300" size={32} strokeWidth={2} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
                            Bem-vindo ao Assistente de Dados
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                            Explore os dados dos produtores e propriedades através de consultas naturais. 
                            Faça sua própria pergunta ou selecione um exemplo abaixo.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {/* Custom Query Section */}
                        <div className="mb-8">
                            <h2 className="text-sm font-medium uppercase text-neutral-600 dark:text-neutral-400 mb-4">
                                Sua Consulta
                            </h2>
                            <CustomQueryInput onSubmit={(query) => handleExampleClick(query)} />
                        </div>

                        {/* Examples Section */}
                        <div>
                            <h2 className="text-sm font-medium uppercase text-neutral-600 dark:text-neutral-400 mb-4">
                                Ou Escolha um Exemplo
                            </h2>
                            <div className="space-y-3">
                                {examples.map((example, index) => (
                                    <ExampleQuery
                                        key={index}
                                        {...example}
                                        onClick={() => handleExampleClick(example.query)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <MainContent
                    messages={messages}
                    sendMessage={sendMessage}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}

export default NewChatPage;