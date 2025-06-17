'use client';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full h-[74px] bg-secondary border-t border-gray-200/80 backdrop-blur-sm shadow-sm z-10">
            {/* Container with responsive padding and centered content */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                {/* Flex container that fills the full height */}
                <div className="flex flex-col sm:flex-row items-center justify-center h-full gap-1 sm:gap-4">
                    {/* Copyright text - centered on mobile, left-aligned on desktop */}
                    <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left order-2 sm:order-1 leading-tight">
                        © {new Date().getFullYear()} YUIME. All rights reserved.
                        Version 1.0.0
                    </p>
                </div>
            </div>
        </footer>
    );
}