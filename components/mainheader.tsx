import router from "next/router";
import { useState } from "react";

export default function MainHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleRegister = () => {

        router.push('/register')

    };

    const handleLogin = () => {
        router.push('/')
    };

    const handleJobSeeker = () => {
        console.log("jobSeeker")
    }

    const handleAgency = () => {
        console.log("Agency")
    }

    return (
        <header className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Company Logo/Name */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold textsecondary transition-colors cursor-pointer">
                                HR Matching System
                            </h1>

                        </div>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                            Home
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                            Jobs
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                            Companies
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                            About
                        </a>
                    </nav>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* <button
                            onClick={handleLogin}
                            className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors border border-gray-300 rounded-md hover:border-blue-600"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleRegister}
                            className="bgsecondary  text-white px-6 py-2 text-sm font-medium rounded-md transition-colors shadow-sm "
                        >
                            Register
                        </button> */}

                        <button
                            onClick={handleJobSeeker}
                            className="w-full text-left text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium border border-gray-300 rounded-md"
                        >
                            JobSeeker
                        </button>
                        <button
                            onClick={handleAgency}
                            className="w-auto text-left text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium border border-gray-300 rounded-md"
                        >
                            Agency
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 p-2"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Home
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Jobs
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Companies
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                About
                            </a>
                            <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
                                <button
                                    onClick={handleLogin}
                                    className="w-full text-left text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium border border-gray-300 rounded-md"
                                >
                                    Login
                                </button>


                                <button
                                    onClick={handleRegister}
                                    className="w-full bgsecondary hover:bg-blue-700 text-white px-3 py-2 text-base font-medium rounded-md"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}