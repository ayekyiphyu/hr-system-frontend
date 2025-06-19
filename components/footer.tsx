'use client';

export default function Footer() {
    return (
        <footer className="secondary-background fixed bottom-0 left-0 right-0 w-full bg-white/95 p-4 border-t border-gray-200 backdrop-blur-sm shadow-sm z-10">
            {/* Container with responsive padding and centered content */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Flex container for content */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
                    <span className="text-sm text-gray-600">
                        © 2025 Yuime Company
                    </span>
                </div>
            </div>
        </footer>
    );
}