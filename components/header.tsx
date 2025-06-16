"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { HeaderProps } from "@/type/type"
import clsx from "clsx"
import {
    Bell,
    ChevronDown,
    LogOut,
    Maximize,
    Menu,
    Settings,
    User,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderComponentProps extends HeaderProps {
    onMenuClick: () => void;
    currentPageTitle: string;
    isSidebarOpen: boolean;
}

export default function Header({
    adminName = "田中 太郎",
    adminAvatar,
    adminRole = "システム管理者",
    notificationCount = 3,
    onMenuClick,
    currentPageTitle,
    isSidebarOpen
}: HeaderComponentProps) {
    const router = useRouter()

    const handleLogout = () => router.push("/login")
    const handleNotifications = () => router.push("/notifications")
    const handleSettings = () => router.push("/settings")
    const handleExpandWindow = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }

    return (
        <header
            className={clsx(
                "fixed top-0 inset-x-0 h-16 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm flex items-center px-4 sm:px-6 lg:px-8 z-40 transition-all duration-300 ease-in-out shadow-sm",
                isSidebarOpen && "lg:ml-80"
            )}
        >
            <div className="flex items-center justify-between w-full">
                {/* Left side - logo and burger */}
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100/80 hover:scale-105 transition-all duration-200 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md backdrop-blur-sm"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5 text-gray-700" />
                        <span className="sr-only">メニューを開く</span>
                    </Button>

                    <div className="ml-4 flex items-center gap-4">
                        <div className="relative">
                            <img
                                src="/assest/images/logo.png"
                                alt="Logo"
                                className="w-10 h-10 rounded-lg shadow-sm border border-gray-100"
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent m-0 p-0">
                                {currentPageTitle}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right side - icons and user */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-blue-50 hover:scale-105 transition-all duration-200 rounded-xl"
                        onClick={handleNotifications}
                    >
                        <Bell className="h-5 w-5 text-gray-600" />
                        {notificationCount > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 animate-pulse bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white shadow-lg"
                            >
                                {notificationCount > 9 ? "9+" : notificationCount}
                            </Badge>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-blue-50 hover:scale-105 transition-all duration-200 rounded-xl"
                        onClick={handleSettings}
                    >
                        <Settings className="h-5 w-5 text-gray-600" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-blue-50 hover:scale-105 transition-all duration-200 rounded-xl"
                        onClick={handleExpandWindow}
                    >
                        <Maximize className="h-5 w-5 text-gray-600" />
                    </Button>

                    <Separator orientation="vertical" className="h-8 hidden sm:block mx-2 bg-gray-200" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl border border-transparent hover:border-blue-100 hover:shadow-md"
                            >
                                <div className="relative">
                                    <Avatar className="h-8 w-8 ring-2 ring-white shadow-md">
                                        <AvatarImage src={adminAvatar} alt={adminName} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                            {adminName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                </div>
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="text-sm font-semibold text-gray-900">{adminName}</span>
                                    <span className="text-xs text-gray-500 font-medium">{adminRole}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-64 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-xl rounded-2xl p-2"
                        >
                            <DropdownMenuLabel className="p-3">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                                        <AvatarImage src={adminAvatar} alt={adminName} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                                            {adminName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold text-gray-900">{adminName}</p>
                                        <p className="text-xs text-gray-500 font-medium">{adminRole}</p>
                                        <div className="flex items-center mt-1">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                                            <span className="text-xs text-green-600 font-medium">オンライン</span>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-100" />
                            <DropdownMenuItem
                                onClick={() => router.push("/profile")}
                                className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 cursor-pointer"
                            >
                                <User className="mr-3 h-4 w-4 text-blue-600" />
                                <span className="font-medium">プロフィール</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleSettings}
                                className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 cursor-pointer"
                            >
                                <Settings className="mr-3 h-4 w-4 text-blue-600" />
                                <span className="font-medium">設定</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-100" />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer text-red-600 focus:text-red-600"
                            >
                                <LogOut className="mr-3 h-4 w-4" />
                                <span className="font-medium">ログアウト</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}