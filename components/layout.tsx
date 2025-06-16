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
import { useMemo, useState } from "react"
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

    const handleMenuClick = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                adminName={adminName}
                adminAvatar={adminAvatar}
                adminRole={adminRole}
                notificationCount={notificationCount}
                onMenuClick={handleMenuClick}
                currentPageTitle={getCurrentPageTitle}
                isSidebarOpen={isSidebarOpen}
            />

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className={clsx("pt-16 transition-all duration-300", isSidebarOpen && "ml-64")}>
                {children}
            </main>
        </div>
    )
}