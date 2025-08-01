"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthUser } from "@/hooks/useAuthUser"
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
import { useEffect, useRef, useState } from "react"

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<string[]>([])
    const prevPathnameRef = useRef(pathname)

    //for admin or organization or jobseeker
    const user = useAuthUser();
    const isAdmin = user?.isAdmin || false;


    // Only close sidebar on navigation if it was previously open and pathname actually changed
    useEffect(() => {
        if (prevPathnameRef.current !== pathname && isOpen) {
            onClose()
        }
        prevPathnameRef.current = pathname
    }, [pathname, isOpen, onClose])

    const menuItems: MenuItem[] = [
        {
            title: "ダッシュボード",
            icon: Home,
            href: "/dashboard"
        },

        ...(isAdmin ? [
            {
                title: "スタッフ管理",
                icon: Users,
                children: [
                    { title: "スタッフ一覧", icon: Users, href: "/staff/staff-lists" },
                    { title: "スタッフ登録", icon: UserPlus, href: "/staff/register" },
                    { title: "スタッフ招待", icon: Mail, href: "/staff/invite" },
                    { title: "Webhook設定", icon: Webhook, href: "/staff/webhook", badge: "NEW" }
                ]
            }
        ] : []),

        {
            title: "組織管理・ユーザー管理",
            icon: Building,
            children: [
                { title: "組織管理", icon: Building, href: "/organization/organization-lists" },
                { title: "ユーザー管理", icon: User, href: "/users/dashboard" }
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
        // Don't call onClose here - let the useEffect handle it
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/');
    };

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
                        e.stopPropagation() // Prevent event bubbling
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
        <div className="h-full w-full bg-white flex flex-col">
            {/* Close Button - positioned in top right */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 z-10 bg-white lg:hidden"
                aria-label="Close sidebar"
            >
                <X className="h-5 w-5 text-gray-600" />
            </button>

            {/* Logo Section */}
            <div className="primary-background text-[1rem] font-bold text-white h-[60px] flex items-center justify-center shadow-sm">
                {/* <img
                    src="/assest/images/logo01.png"
                    alt="Logo"
                    className="w-[60px] h-auto"
                /> */}
                HR Matching System
            </div>

            {/* Menu Section */}
            <div className="flex-1 overflow-y-auto py-2 secondary-background">
                {menuItems.map(item => renderMenuItem(item))}
                <Separator className="my-4" />
                {bottomMenuItems.map(item => renderMenuItem(item))}
            </div>

            <div onClick={handleLogout}>
                <div className="p-4 border-t secondary-background cursor-pointer hover:opacity-80">
                    <div className="flex items-center gap-3">
                        <LogOut className="h-5 w-5 " />
                        <span className="font-medium ">ログアウト</span>
                    </div>
                </div>
            </div>


        </div>
    )
}