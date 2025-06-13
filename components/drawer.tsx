"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
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
    Menu,
    ScrollText,
    User,
    UserPlus,
    Users,
    Webhook
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface DrawerProps {
    children?: React.ReactNode
    trigger?: React.ReactNode
}

interface MenuItem {
    title: string
    icon: React.ComponentType<{ className?: string }>
    href?: string
    badge?: string
    children?: MenuItem[]
}

export default function NavigationDrawer({ children, trigger }: DrawerProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
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
                {
                    title: "スタッフ一覧",
                    icon: Users,
                    href: "/staff/list"
                },
                {
                    title: "スタッフ登録",
                    icon: UserPlus,
                    href: "/staff/register"
                },
                {
                    title: "スタッフ招待",
                    icon: Mail,
                    href: "/staff/invite"
                },
                {
                    title: "Webhook設定",
                    icon: Webhook,
                    href: "/staff/webhook",
                    badge: "NEW"
                }
            ]
        },
        {
            title: "組織管理・ユーザー管理",
            icon: Building,
            children: [
                {
                    title: "組織管理",
                    icon: Building,
                    href: "/organization"
                },
                {
                    title: "ユーザー管理",
                    icon: User,
                    href: "/users"
                }
            ]
        },
        {
            title: "求職者管理",
            icon: FileText,
            children: [
                {
                    title: "求人票一覧",
                    icon: FileText,
                    href: "/job-seekers"
                }
            ]
        },
        {
            title: "請求管理",
            icon: CreditCard,
            children: [
                {
                    title: "請求書管理",
                    icon: CreditCard,
                    href: "/billing"
                }
            ]
        }
    ]

    const bottomMenuItems: MenuItem[] = [
        {
            title: "FAQ",
            icon: HelpCircle,
            href: "/faq"
        },
        {
            title: "マニュアルダウンロード",
            icon: Download,
            href: "/manual"
        },
        {
            title: "利用規約",
            icon: ScrollText,
            href: "/terms"
        }
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
        setIsOpen(false)
    }

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...")
        router.push("/login")
        setIsOpen(false)
    }

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        const isExpanded = expandedItems.includes(item.title)
        const hasChildren = item.children && item.children.length > 0
        const paddingLeft = level === 0 ? "pl-4" : "pl-8"
        const Icon = item.icon

        return (
            <div key={item.title} className="w-full">
                <Button
                    variant="ghost"
                    className={`w-full justify-start ${paddingLeft} py-3 h-auto text-left hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${level > 0 ? "text-sm text-gray-600" : "text-base font-medium"
                        }`}
                    onClick={() => {
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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="icon" className="relative">
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">メニューを開く</span>
                    </Button>
                )}
            </SheetTrigger>

            <SheetContent side="left" className="w-80 p-0 bg-white">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <SheetHeader className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <SheetTitle className="text-white text-xl font-bold">
                            メニュー
                        </SheetTitle>
                        <SheetDescription className="text-blue-100">
                            システム管理画面
                        </SheetDescription>
                    </SheetHeader>

                    {/* Main Menu */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="py-4">
                            {menuItems.map(item => renderMenuItem(item))}
                        </div>

                        <Separator className="my-4" />

                        {/* Bottom Menu Items */}
                        <div className="py-2">
                            {bottomMenuItems.map(item => renderMenuItem(item))}
                        </div>
                    </div>

                    {/* Footer - Logout */}
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
    )
}