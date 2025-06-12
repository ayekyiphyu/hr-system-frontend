"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import router from "next/router"
import * as React from "react"
import { useState } from "react"

interface ForgotPasswordProps {
    onBackToLogin?: () => void
}

export default function ForgotPasswordPage({ onBackToLogin }: ForgotPasswordProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // Replace this with your actual API call
            const response = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setIsSubmitted(true)
            } else {
                const data = await response.json()
                setError(data.message || "メールアドレスの送信に失敗しました")
            }
        } catch (err) {
            setError("ネットワークエラーが発生しました。もう一度お試しください。")
        } finally {
            setIsLoading(false)
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (error) setError("")
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md mx-auto">
                    <CardContent className="bg-secondary mx-auto p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl mb-4">
                            メールを送信しました
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mb-6">
                            パスワードリセットのリンクを{email}に送信しました。
                            メールボックスをご確認ください。
                        </CardDescription>
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsSubmitted(false)
                                    setEmail("")
                                }}
                                className="w-full"
                            >
                                別のメールアドレスを試す
                            </Button>
                            {onBackToLogin && (
                                <Button
                                    variant="link"
                                    onClick={onBackToLogin}
                                    className="w-full text-primary"
                                >
                                    ログインに戻る
                                </Button>
                            )}
                        </div>
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
                        パスワードをお忘れですか？
                    </CardTitle>
                    <CardDescription className="text-muted-foreground primary-text mt-[10px]">
                        ※メールアドレスを入力してください。パスワードリセットのリンクをお送りします。
                    </CardDescription>
                </CardHeader>

                <CardContent className="bg-secondary mx-auto w-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className="bg-white text-primary h-[46px] pl-10 placeholder:text-muted-foreground"
                                    placeholder="メールアドレス *"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            // disabled={isLoading || !email.trim()}
                            className="w-full h-[46px]"
                        >
                            {isLoading ? "送信中..." : "リセットリンクを送信"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        {onBackToLogin && (
                            <Button
                                variant="default"
                                onClick={onBackToLogin}
                                className="text-primary p-0 h-auto primary-background"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                ログインに戻る
                            </Button>
                        )}

                        <div className="w-auto">
                            <Button
                                variant="outline"
                                onClick={() => (router.push('/'))}
                                className="text-primary p-0 h-auto"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                ログインに戻る
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}