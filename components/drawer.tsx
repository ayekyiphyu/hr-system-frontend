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
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { HeaderProps, MenuItem } from "@/type/type"
import {
    Bell,
    Building,
    ChevronDown,
    ChevronRight,
    CreditCard,
    Download,
    FileText,
    HelpCircle,
    Home,
    LogOut,
    Mail,
    Maximize,
    Menu,
    ScrollText,
    Settings,
    User,
    UserPlus,
    Users,
    Webhook,
    X
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"; // Added usePathname import
import { useMemo, useState } from "react"

export default function Drawer({
    adminName = "田中 太郎",
    adminAvatar,
    adminRole = "システム管理者",
    notificationCount = 3
}: HeaderProps) {
    const router = useRouter()
    const pathname = usePathname() // Added pathname hook
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const menuItems: MenuItem[] = [

        {
            title: "ダッシュボード",
            icon: Home,
            href: "/dashboard"
        },
        {
            title: "スタッフ管理",
            icon: Users,
            children: [
                { title: "スタッフ一覧", icon: Users, href: "/staff/list" },
                { title: "スタッフ登録", icon: UserPlus, href: "/staff/register" },
                { title: "スタッフ招待", icon: Mail, href: "/staff/invite" },
                { title: "Webhook設定", icon: Webhook, href: "/staff/webhook", badge: "NEW" }
            ]
        },
        {
            title: "組織管理・ユーザー管理",
            icon: Building,
            children: [
                { title: "組織管理", icon: Building, href: "/organization" },
                { title: "ユーザー管理", icon: User, href: "/users" }
            ]
        },
        {
            title: "求職者管理",
            icon: FileText,
            children: [{ title: "求人票一覧", icon: FileText, href: "/job-seekers" }]
        },
        {
            title: "請求管理",
            icon: CreditCard,
            children: [{ title: "請求書管理", icon: CreditCard, href: "/billing" }]
        }
    ]

    const bottomMenuItems: MenuItem[] = [
        { title: "FAQ", icon: HelpCircle, href: "/faq" },
        { title: "マニュアルダウンロード", icon: Download, href: "/manual" },
        { title: "利用規約", icon: ScrollText, href: "/terms" }
    ]

    // Fixed the getCurrentPageTitle function
    const getCurrentPageTitle = useMemo(() => {
        // Create a flat array of all menu items (including children)
        const allMenuItems: MenuItem[] = []

        const flattenMenuItems = (items: MenuItem[]) => {
            items.forEach(item => {
                allMenuItems.push(item)
                if (item.children) {
                    flattenMenuItems(item.children)
                }
            })
        }

        flattenMenuItems([...menuItems, ...bottomMenuItems])

        // Find the current page
        const currentPage = allMenuItems.find(item => item.href === pathname)

        return currentPage?.title || "ダッシュボード"
    }, [pathname, menuItems, bottomMenuItems]) // Added dependencies

    const toggleExpanded = (title: string) => {
        setExpandedItems(prev =>
            prev.includes(title)
                ? prev.filter(item => item !== title)
                : [...prev, title]
        )
    }

    const handleNavigation = (href: string) => {
        router.push(href)
        setIsDrawerOpen(false)
    }

    const handleLogout = () => {
        console.log("Logging out...")
        router.push("/login")
        setIsDrawerOpen(false)
    }

    const handleNotifications = () => router.push("/notifications")
    const handleSettings = () => router.push("/settings")
    const handleExpandWindow = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const isExpanded = expandedItems.includes(item.title)
        const hasChildren = !!item.children?.length
        const paddingLeft = level === 0 ? "pl-4" : "pl-8"
        const Icon = item.icon
        const isActive = item.href === pathname // Added active state

        return (
            <div key={item.title} className="w-full">
                <Button
                    variant="ghost"
                    className={`w-full justify-start ${paddingLeft} py-3 h-auto text-left transition-colors duration-200 ${isActive
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-blue-50 hover:text-blue-600"
                        } ${level > 0 ? "text-sm text-gray-600" : "text-base font-medium"}`}
                    onClick={(e) => {
                        e.preventDefault()
                        if (hasChildren) {
                            toggleExpanded(item.title)
                        } else if (item.href) {
                            handleNavigation(item.href)
                        }
                    }}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <Icon className={`${level === 0 ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                    {item.badge}
                                </Badge>
                            )}
                        </div>
                        {hasChildren && (
                            <div className="ml-2 flex-shrink-0">
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </div>
                        )}
                    </div>
                </Button>
                {hasChildren && isExpanded && (
                    <div className="ml-2 border-l-2 border-gray-100">
                        {item.children?.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            {/* Fixed Header */}
            <header className="fixed inset-x-0 top-0 h-16 border-b bg-white/95 backdrop-blur z-50 flex items-center px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between w-full">
                    {/* Left Side - Menu & Logo */}
                    <div className="flex items-center">
                        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="hover:bg-gray-100 border-2 border-gray-400 shadow-sm hover:shadow-md">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">メニューを開く</span>
                                </Button>
                            </SheetTrigger>
                        </Sheet>

                        <div className="ml-4 hidden sm:block">
                            <h1 className="text-xl font-bold text-black !m-0 !p-0">
                                {getCurrentPageTitle}
                            </h1>
                        </div>
                    </div>

                    {/* Right Side - Icons and User Info */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-gray-100 transition-colors duration-200"
                            onClick={handleNotifications}
                        >
                            <Bell className="h-5 w-5" />
                            {notificationCount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                                >
                                    {notificationCount > 9 ? "9+" : notificationCount}
                                </Badge>
                            )}
                            <span className="sr-only">通知</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100 transition-colors duration-200"
                            onClick={handleSettings}
                        >
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">設定</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100 transition-colors duration-200"
                            onClick={handleExpandWindow}
                        >
                            <Maximize className="h-5 w-5" />
                            <span className="sr-only">全画面表示</span>
                        </Button>

                        <Separator orientation="vertical" className="h-8 hidden sm:block" />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors duration-200 px-2 sm:px-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={adminAvatar} alt={adminName} />
                                        <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                                            {adminName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="hidden sm:flex flex-col items-start">
                                        <span className="text-sm font-medium text-gray-900">{adminName}</span>
                                        <span className="text-xs text-gray-500">{adminRole}</span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{adminName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{adminRole}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={handleSettings}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>設定</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>ログアウト</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Drawer positioned below header */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetContent
                    side="left"
                    className="w-80 p-0 bg-white z-40"
                    style={{
                        top: '64px',
                        height: 'calc(100vh - 64px)'
                    }}
                >
                    <img src={"/assest/images/logo.png"} alt="Logo" className="w-[100px] h-[100px] mx-auto mt-[10px]" />
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="absolute top-3 right-3 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Close drawer"
                    >

                        <X size={16} />
                    </button>


                    <div className="flex flex-col h-full">
                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto mt-[0px]">
                            {menuItems.map(item => renderMenuItem(item))}
                            <Separator className="my-4 " />
                            {bottomMenuItems.map(item => renderMenuItem(item))}
                        </div>

                        {/* Logout Section */}
                        <div className="p-4 border-t bg-gray-50">
                            <Button
                                variant="ghost"
                                className="w-full justify-start pl-4 py-3 h-auto text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                                onClick={handleLogout}
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut className="h-5 w-5" />
                                    <span className="font-medium">ログアウト</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}