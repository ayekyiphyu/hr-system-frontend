"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock, X } from "lucide-react"
import router from "next/router"
import * as React from "react"
import { useState } from "react"

interface PasswordSettingProps {
    token?: string // For password reset via email link
    userId?: string // For logged-in user changing password
    mode?: "reset" | "change" // reset = from email link, change = logged-in user
    onSuccess?: () => void
    onCancel?: () => void
}

interface PasswordStrength {
    score: number
    feedback: string[]
    isValid: boolean
}

export default function PasswordSettingPage({
    token,
    userId,
    mode = "reset",
    onSuccess,
    onCancel
}: PasswordSettingProps) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    // Password strength validation
    const checkPasswordStrength = (password: string): PasswordStrength => {
        const feedback: string[] = []
        let score = 0

        if (password.length >= 8) {
            score += 1
        } else {
            feedback.push("8文字以上にしてください")
        }

        if (/[A-Z]/.test(password)) {
            score += 1
        } else {
            feedback.push("大文字を含めてください")
        }

        if (/[a-z]/.test(password)) {
            score += 1
        } else {
            feedback.push("小文字を含めてください")
        }

        if (/\d/.test(password)) {
            score += 1
        } else {
            feedback.push("数字を含めてください")
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            score += 1
        } else {
            feedback.push("特殊文字を含めてください")
        }

        return {
            score,
            feedback,
            isValid: score >= 4
        }
    }

    const passwordStrength = checkPasswordStrength(formData.newPassword)
    const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword !== ""

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError("")
    }

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Validation
        if (!passwordStrength.isValid) {
            setError("パスワードが要件を満たしていません")
            return
        }

        if (!passwordsMatch) {
            setError("パスワードが一致しません")
            return
        }

        if (mode === "change" && !formData.currentPassword) {
            setError("現在のパスワードを入力してください")
            return
        }

        setIsLoading(true)

        try {
            const endpoint = mode === "reset" ? "/api/reset-password" : "/api/change-password"
            const requestBody = mode === "reset"
                ? { token, newPassword: formData.newPassword }
                : { userId, currentPassword: formData.currentPassword, newPassword: formData.newPassword }

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            if (response.ok) {
                setIsSuccess(true)
                setTimeout(() => {
                    onSuccess?.()
                }, 2000)
            } else {
                const data = await response.json()
                setError(data.message || "パスワードの設定に失敗しました")
            }
        } catch (err) {
            setError("ネットワークエラーが発生しました。もう一度お試しください。")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md mx-auto">
                    <CardContent className="bg-secondary mx-auto p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl mb-4">
                            パスワードが設定されました
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mb-6">
                            {mode === "reset"
                                ? "新しいパスワードが正常に設定されました。ログインページに移動します。"
                                : "パスワードが正常に変更されました。"
                            }
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        {mode === "reset" ? "パスワード設定する" : "パスワードを変更"}
                    </CardTitle>
                </CardHeader>

                <CardContent className="bg-secondary mx-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Current Password (only for change mode) */}
                        {mode === "change" && (
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground primary-text" />
                                    <Input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type={showPasswords.current ? "text" : "password"}
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-white text-primary h-[46px] pl-10 pr-10 placeholder:text-muted-foreground"
                                        placeholder="現在のパスワード *"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("current")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPasswords.current ? <EyeOff className="h-4 w-4 primary-text" /> : <Eye className="h-4 w-4 " />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* New Password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground primary-text" />
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPasswords.new ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-white text-primary h-[46px] pl-10 pr-10 placeholder:text-muted-foreground"
                                    placeholder="新しいパスワード *"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility("new")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPasswords.new ? <EyeOff className="h-4 w-4 primary-text" /> : <Eye className="h-4 w-4 primary-text" />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className="space-y-2">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-2 w-full rounded ${passwordStrength.score >= level
                                                    ? passwordStrength.score <= 2
                                                        ? "bg-red-500"
                                                        : passwordStrength.score <= 3
                                                            ? "bg-yellow-500"
                                                            : "bg-green-500"
                                                    : "bg-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    {passwordStrength.feedback.length > 0 && (
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            {passwordStrength.feedback.map((item, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <X className="h-3 w-3 text-red-500" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground primary-text" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-white text-primary h-[46px] pl-10 pr-10 placeholder:text-muted-foreground"
                                    placeholder="パスワード確認 *"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility("confirm")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 primary-text" />}
                                </button>
                            </div>

                            {/* Password Match Indicator */}
                            {formData.confirmPassword && (
                                <div className={`text-sm flex items-center space-x-2 ${passwordsMatch ? "text-green-600" : "text-red-600"
                                    }`}>
                                    {passwordsMatch ? (
                                        <>
                                            <CheckCircle className="h-3 w-3" />
                                            <span>パスワードが一致しています</span>
                                        </>
                                    ) : (
                                        <>
                                            <X className="h-3 w-3" />
                                            <span>パスワードが一致しません</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row space-y-3 gap-3.5 justify-between sm:justify-end">
                            <Button
                                type="button"
                                variant="default"
                                onClick={() => router.push("/")}
                                className="w-[150px] h-[46px] back-button"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                戻る
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-[150px] h-[46px]"
                            >
                                {isLoading ? "設定中..." : "設定する"}
                            </Button>

                            {onCancel && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onCancel}
                                    className="w-full h-[46px]"
                                >
                                    キャンセル
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}