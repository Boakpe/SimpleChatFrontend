import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
    return (
        <header className="p-4 border-b border-neutral-600 bg-neutral-100 min-h-[64px] h-[64px] flex-shrink-0 sticky z-10 top-0 dark:bg-neutral-900">
            <div className="max-w-[1024px] mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    CHAT INTERFACE
                </h1>
                <ThemeSwitcher />
            </div>
        </header>
    );
};

export default Header;