"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MenuItem } from "@/type/type"
import {
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
    ScrollText,
    User,
    UserPlus,
    Users,
    Webhook,
    X
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    useEffect(() => {
        onClose()
    }, [pathname])

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

    const toggleExpanded = (title: string) => {
        setExpandedItems(prev =>
            prev.includes(title)
                ? prev.filter(item => item !== title)
                : [...prev, title]
        )
    }

    const handleNavigation = (href: string) => {
        router.push(href)
        onClose()
    }

    const handleLogout = () => {
        console.log("Logging out...")
        router.push("/login")
        onClose()
    }

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const isExpanded = expandedItems.includes(item.title)
        const hasChildren = !!item.children?.length
        const paddingLeft = level === 0 ? "pl-4" : "pl-8"
        const Icon = item.icon
        const isActive = item.href === pathname

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

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                onClick={onClose}
                aria-label="Close sidebar"
            />

            {/* Sidebar */}
            <div className="relative w-80 h-screen bg-white shadow-xl z-50">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 z-10"
                    aria-label="Close sidebar"
                >
                    <X className="h-5 w-5 !text-white" />
                </button>

                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="primary-background text-white h-[100px]">

                        <h2 className="text-lg font-bold text-center text-white">
                            Management System
                        </h2>
                    </div>

                    {/* Menu */}
                    <div className="flex-1 overflow-y-auto py-2">
                        {menuItems.map(item => renderMenuItem(item))}
                        <Separator className="my-4" />
                        {bottomMenuItems.map(item => renderMenuItem(item))}
                    </div>

                    {/* Logout */}
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
            </div>
        </div>
    )
}