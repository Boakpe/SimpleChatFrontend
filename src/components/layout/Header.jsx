import ThemeSwitcher from '../ui/ThemeSwitcher';

const Header = () => {
    return (
        <header className="p-4 border-b border-neutral-600 bg-neutral-100 min-h-[64px] h-[64px] flex-shrink-0 sticky z-10 top-0 dark:bg-neutral-900">
            <div className="max-w-[1024px] mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
                    IMA CHAT
                    <span className="text-xs italic relative ml-1">
                        <span className="relative z-10 px-2 text-white dark:text-neutral-900">
                            BETA
                        </span>
                        <span className="absolute inset-0 bg-neutral-900 dark:bg-white transform skew-x-[-15deg]"></span>
                    </span>
                </h1>
                
                <ThemeSwitcher />
            </div>
        </header>
    );
};

export default Header;