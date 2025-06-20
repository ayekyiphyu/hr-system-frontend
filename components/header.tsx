'use client';

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuthUser } from '@/hooks/useAuthUser';
import { HeaderProps } from "@/type/type";
import {
    Bell,
    ChevronDown,
    LogOut,
    Maximize,
    Settings
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderComponentProps extends HeaderProps {
    currentPageTitle: string;
}

export default function Header({
    currentPageTitle
}: HeaderComponentProps) {
    const router = useRouter();
    const user = useAuthUser();

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
    };

    const handleNotifications = () => router.push("/notifications");
    const handleSettings = () => router.push("/staff/staff-setting");
    const handlePasswordSettings = () => router.push("/password-setting");
    const handleExpandWindow = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    const adminName = user?.name || "ゲスト";
    const adminRole = user?.role || "未ログイン";
    const adminAvatar = user?.avatar || undefined;
    const notificationCount = 3; // You can update this dynamically if needed

    return (
        <header className="w-full h-[60px] secondary-background border-b border-gray-200/80 bg-white/95 backdrop-blur-sm flex items-center px-4 sm:px-6 lg:px-8 shadow-sm">
            <div className="flex items-center justify-between w-full">
                {/* Left - Logo and Page Title */}
                <div className="flex items-center">
                    <div className="relative">
                        <img
                            src="/assest/images/logo01.png"
                            alt="Logo"
                            className="w-[35px] h-auto cursor-pointer"
                            onClick={() => router.push('/dashboard')}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    </div>
                    <div className="ml-4">
                        <p className="text-[1rem] primary-text py-3 font-bold hidden lg:block">
                            {currentPageTitle}
                        </p>
                    </div>
                </div>

                {/* Right - Controls */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-blue-50 hover:scale-105 transition-all duration-200 rounded-xl"
                        onClick={handleNotifications}
                        aria-label="通知"
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
                        aria-label="設定"
                    >
                        <Settings className="h-5 w-5 text-gray-600" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-blue-50 hover:scale-105 transition-all duration-200 rounded-xl"
                        onClick={handleExpandWindow}
                        aria-label="フルスクリーン"
                    >
                        <Maximize className="h-5 w-5 text-gray-600" />
                    </Button>

                    <Separator orientation="vertical" className="h-8 hidden sm:block mx-2 bg-gray-200" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl border border-transparent hover:border-blue-100 hover:shadow-md group"
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
                                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
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
                                onClick={handlePasswordSettings}
                                className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 cursor-pointer"
                            >
                                <Settings className="mr-3 h-4 w-4 text-blue-600" />
                                <span className="font-medium">パスワード設定</span>
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
    );
}
