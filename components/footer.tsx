'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 backdrop-blur-md p-4 border-t border-gray-200/80 shadow-lg z-10">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/30 via-purple-50/20 to-pink-50/30"></div>

            {/* Container with responsive padding and centered content */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Flex container for content */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
                    <span className="text-sm bg-gradient-to-r from-gray-600 via-slate-700 to-gray-600 bg-clip-text text-transparent font-medium">
                        © {currentYear} YUIME INC. All Rights Reserved.
                    </span>
                </div>
            </div>

            {/* Decorative gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        </footer>
    );
}