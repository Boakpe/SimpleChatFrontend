import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
    return (
        <header className="p-4 border-b border-neutral-600 bg-neutral-100 h-16 stciky dark:bg-neutral-900 border-r ">
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
