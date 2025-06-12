"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { SetStateAction, useState } from "react"

interface ForgotPasswordProps {
    onBackToLogin?: () => void
}

export default function ForgotPasswordPage({ onBackToLogin }: ForgotPasswordProps) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: { preventDefault: () => void }) => {
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

    const handleEmailChange = (e: { target: { value: SetStateAction<string> } }) => {
        setEmail(e.target.value)
        if (error) setError("")
    }

    const handleBackToLogin = () => {
        if (onBackToLogin) {
            onBackToLogin()
        } else {
            router.push("/")
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-muted">
                <div className="w-full max-w-sm sm:max-w-md">
                    <Card className="shadow-xl border-0 sm:border">
                        <CardContent className="bg-secondary p-6 sm:p-8 m-4 sm:mt-[0px] text-center">
                            <div className="flex justify-center mb-4 sm:mb-6">
                                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
                            </div>
                            <CardTitle className="text-lg sm:text-2xl mb-3 sm:mb-4 text-primary">
                                メールを送信しました
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base px-2">
                                パスワードリセットのリンクを{email}に送信しました。
                                メールボックスをご確認ください。
                            </CardDescription>
                            <div className="space-y-3 sm:space-y-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsSubmitted(false)
                                        setEmail("")
                                    }}
                                    className="w-full h-10 sm:h-12 text-sm sm:text-base"
                                >
                                    別のメールアドレスを試す
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={handleBackToLogin}
                                    className="w-full text-primary text-sm sm:text-base"
                                >
                                    ログインに戻る
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-muted">
            <div className="w-full max-w-sm sm:max-w-md">
                <Card className="shadow-xl border-0 sm:border ">
                    <CardHeader className="text-center space-y-2 sm:space-y-3 p-0 mb-0">
                        <CardTitle className="text-lg sm:text-2xl font-bold text-primary">
                            パスワードをお忘れですか？
                        </CardTitle>
                        <CardDescription className="text-muted-foreground primary-text px-2 text-center sm:text-[10px]">
                            ※メールアドレスを入力してください。パスワードリセットのリンクをお送りします。
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="gap-0 bg-secondary sm:mt-0 mr-[46px] ml-[46px] p-4 sm:p-6">
                        <div className="space-y-4 sm:space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription className="text-sm">{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground primary-text" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                        className="bg-white text-primary h-10 sm:h-12 pl-10 placeholder:text-muted-foreground text-sm sm:text-base"
                                        placeholder="メールアドレス *"
                                    />
                                </div>
                            </div>

                            {/* Desktop: Side by side buttons */}
                            <div className="hidden sm:flex justify-between items-center gap-4">
                                <Button
                                    variant="default"
                                    onClick={handleBackToLogin}
                                    className="flex-1 max-w-[150px] h-10 sm:h-12 text-white cursor-pointer text-sm sm:text-base back-button"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    戻る
                                </Button>

                                <Button
                                    type="submit"
                                    variant="outline"
                                    onClick={handleSubmit}
                                    className="flex-1 max-w-[150px] h-10 sm:h-12 primary-background text-white flex items-center justify-center gap-2 text-sm sm:text-base"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "送信中..." : "送信する"}
                                </Button>
                            </div>

                            {/* Mobile: Stacked buttons */}
                            <div className="flex flex-col space-y-3 sm:hidden">
                                <Button
                                    type="submit"
                                    variant="outline"
                                    onClick={handleSubmit}
                                    className="w-full h-12 primary-background text-white flex items-center justify-center gap-2 text-base"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "送信中..." : "送信する"}
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleBackToLogin}
                                    className="w-full h-12 primary-text cursor-pointer text-base"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    戻る
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}