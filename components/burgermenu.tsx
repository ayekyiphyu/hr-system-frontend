"use client"

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

interface BurgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
    variant?: "default" | "minimal" | "outline";
    size?: "sm" | "md" | "lg";
}

export default function BurgerMenu({
    isOpen,
    onClick,
    className,
    variant = "default",
    size = "md"
}: BurgerMenuProps) {

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
    }

    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
    }

    const variantClasses = {
        default: "hover:bg-gray-100/80 hover:scale-105 transition-all duration-200 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md backdrop-blur-sm",
        minimal: "hover:bg-gray-100 transition-colors duration-200 rounded-lg",
        outline: "border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 rounded-lg"
    }

    const baseClasses = clsx(
        variantClasses[variant],
        isOpen && variant === "default" && "bg-blue-50 border-blue-200",
        isOpen && variant === "outline" && "border-blue-300 bg-blue-50",
        isOpen && variant === "minimal" && "bg-gray-100",
        className
    )

    const iconClasses = clsx(
        sizeClasses[size],
        "text-gray-700 transition-transform duration-200",
        isOpen && "rotate-90"
    )

    return (
        <Button
            variant="ghost"
            size="icon"
            className={baseClasses}
            onClick={handleClick}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isOpen}
        >
            {isOpen ? (
                <X className={iconClasses} />
            ) : (
                <Menu className={iconClasses} />
            )}
            <span className="sr-only">
                {isOpen ? "メニューを閉じる" : "メニューを開く"}
            </span>
        </Button>
    )
}