'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full secondary-background backdrop-blur-md p-4 border-t border-gray-200 shadow z-10">
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
                    <span className="text-sm text-gray-700 font-medium">
                        © {currentYear} YUIME INC. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
