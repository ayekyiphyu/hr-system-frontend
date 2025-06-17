"use client"

import { HeaderProps, MenuItem } from "@/type/type"
import clsx from "clsx"
import {
    Building,
    CreditCard,
    Download,
    FileText,
    HelpCircle,
    Home,
    Mail,
    ScrollText,
    User,
    UserPlus,
    Users,
    Webhook
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import BurgerMenu from "./burgermenu"
import Header from "./header"
import Sidebar from "./sidebar"

interface LayoutProps extends HeaderProps {
    children: React.ReactNode;
}

export default function Layout({
    children,
    adminName = "田中 太郎",
    adminAvatar,
    adminRole = "システム管理者",
    notificationCount = 3
}: LayoutProps) {
    const pathname = usePathname()
    // Ensure sidebar starts closed on initial load
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Prevent sidebar from opening on initial mount
    useEffect(() => {
        setIsSidebarOpen(false)
    }, [])

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

    const getCurrentPageTitle = useMemo(() => {
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
        const currentPage = allMenuItems.find(item => item.href === pathname)
        return currentPage?.title || "ダッシュボード"
    }, [pathname])

    // Toggle sidebar function
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    // Close sidebar function
    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Fixed width, pushes content */}
            <div className={clsx(
                "fixed left-0 top-0 h-screen bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out",
                "w-80", // Fixed width
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                />
            </div>

            {/* Main container - adjusts based on sidebar */}
            <div className={clsx(
                "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                isSidebarOpen ? "ml-80" : "ml-0" // Push content when sidebar is open
            )}>
                {/* Header - spans full width of available space */}
                <div className="sticky top-0 z-30 w-full">
                    <Header
                        adminName={adminName}
                        adminAvatar={adminAvatar}
                        adminRole={adminRole}
                        notificationCount={notificationCount}
                        currentPageTitle={getCurrentPageTitle}
                    />
                </div>

                {/* Main Content Area */}
                <main className="flex-1 min-h-0">
                    <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
                        {/* Content Header with Burger Menu */}
                        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Burger Menu */}
                                    <BurgerMenu
                                        isOpen={isSidebarOpen}
                                        onClick={toggleSidebar}
                                        variant="default"
                                        size="md"
                                    />

                                    {/* Page Title */}
                                    <div className="flex flex-col">

                                        <p className="text-sm text-gray-500 mt-1">
                                            {pathname}
                                        </p>
                                    </div>
                                </div>

                                {/* Optional: Additional controls */}
                                <div className="flex items-center gap-2">
                                    {/* Add breadcrumbs, search, or other controls here */}
                                </div>
                            </div>
                        </div>

                        {/* Page Content */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
                            <div className="p-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile backdrop - only show on mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-35 lg:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}
        </div>
    )
}