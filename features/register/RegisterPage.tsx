"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Eye, EyeOff, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface RegisterFormData {
    fullName: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    department: string
    role: string
}

interface PasswordStrength {
    score: number
    feedback: string[]
    isValid: boolean
}

export default function RegisterStaffPage() {
    const router = useRouter()
    const [formData, setFormData] = useState<RegisterFormData>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        department: "",
        role: ""
    })

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirm: false
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const roles = [
        { value: "owner", label: "オーナー" },
        { value: "admin", label: "管理者" },
        { value: "operator", label: "オペレーター" },
        { value: "viewer", label: "閲覧者" }
    ]

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

    const passwordStrength = checkPasswordStrength(formData.password)
    const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ""

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError("")
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError("")
    }

    const togglePasswordVisibility = (field: 'password' | 'confirm') => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const validateForm = (): boolean => {
        if (!formData.fullName.trim()) {
            setError("氏名を入力してください")
            return false
        }

        if (!formData.email.trim()) {
            setError("メールアドレスを入力してください")
            return false
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("有効なメールアドレスを入力してください")
            return false
        }

        if (!formData.phone.trim()) {
            setError("電話番号を入力してください")
            return false
        }

        if (!passwordStrength.isValid) {
            setError("パスワードが要件を満たしていません")
            return false
        }

        if (!passwordsMatch) {
            setError("パスワードが一致しません")
            return false
        }

        if (!formData.department) {
            setError("組織部を選択してください")
            return false
        }

        if (!formData.role) {
            setError("権限を選択してください")
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsSuccess(true)
                setTimeout(() => {
                    router.push("/login")
                }, 3000)
            } else {
                const data = await response.json()
                setError(data.message || "登録に失敗しました")
            }
        } catch (err) {
            setError("ネットワークエラーが発生しました。もう一度お試しください。")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        console.log("cancelled")
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            department: "",
            role: ""
        })
        setShowPasswords({ password: false, confirm: false })
        setError("")
        setIsLoading(false)

    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="w-full max-w-sm sm:max-w-md relative z-10">
                    <Card className="shadow-2xl border-0 sm:border backdrop-blur-sm bg-white/95">
                        <CardContent className="bg-gradient-to-br from-white to-green-50/50 p-6 sm:p-8 m-4 sm:m-[46px] text-center">
                            <div className="flex justify-center mb-4 sm:mb-6 relative">
                                <div className="relative">
                                    <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 animate-bounce" />
                                    <div className="absolute inset-0 h-12 w-12 sm:h-16 sm:w-16 bg-green-500/20 rounded-full animate-ping"></div>
                                </div>
                            </div>

                            <CardTitle className="text-lg sm:text-2xl mb-3 sm:mb-4 text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text font-bold">
                                登録が完了しました
                            </CardTitle>

                            <CardDescription className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base px-2 leading-relaxed">
                                アカウントが正常に作成されました。
                                <br />
                                <span className="font-semibold text-green-600">
                                    ログインページに移動します...
                                </span>
                            </CardDescription>

                            <Button
                                onClick={handleCancel}
                                className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                                ログインページへ
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                < div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" ></div >
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div >

            <div className="w-full relative z-10">
                <Card className="w-full pb-0 mb-0">
                    <CardHeader className="text-center">
                        <div className="p-0">
                            <CardTitle className="text-2xl font-bold">
                                Create Regsiter
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="bg-gradient-to-br from-white to-gray-50/30 m-4 sm:mt-[0px] p-4 sm:p-6 rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {error && (
                                <Alert variant="destructive" className="border-red-200 bg-red-50/80">
                                    <AlertDescription className="text-sm text-red-700">{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* 氏名 */}
                            <div className="space-y-2">
                                <div className="relative group">
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                        placeholder="氏名 *"
                                    />
                                </div>
                            </div>

                            {/* パスワード & パスワード確認 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* パスワード */}
                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPasswords.password ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                            placeholder="パスワード *"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("password")}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPasswords.password ?
                                                <EyeOff className="h-4 w-4 primary-text" /> :
                                                <Eye className="h-4 w-4 primary-text " />
                                            }
                                        </button>
                                    </div>
                                </div>

                                {/* パスワード確認 */}
                                <div className="space-y-2">
                                    <div className="relative group">

                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPasswords.confirm ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                            placeholder="パスワード確認 *"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility("confirm")}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPasswords.confirm ?
                                                <EyeOff className="h-4 w-4 primary-text" /> :
                                                <Eye className="h-4 w-4 primary-text" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
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
                                        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                                            {passwordStrength.feedback.map((item, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <X className="h-3 w-3 text-red-500 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            {/* Password Match Indicator */}
                            {formData.confirmPassword && (
                                <div className={`text-xs sm:text-sm flex items-center space-x-2 ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                                    {passwordsMatch ? (
                                        <>
                                            <CheckCircle className="h-3 w-3 flex-shrink-0" />
                                            <span>パスワードが一致しています</span>
                                        </>
                                    ) : (
                                        <>
                                            <X className="h-3 w-3 flex-shrink-0" />
                                            <span>パスワードが一致しません</span>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* メールアドレス */}
                            <div className="space-y-2">
                                <div className="relative group">

                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                        placeholder="メールアドレス *"
                                    />
                                </div>
                            </div>

                            {/* 電話番号 */}
                            <div className="space-y-2">
                                <div className="relative group">

                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                        placeholder="電話番号 *"
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <div className="relative group">
                                    <Select onValueChange={(value) => handleSelectChange("role", value)}>
                                        <SelectTrigger className="bg-white primary-text w-full placeholder:primary-text text-sm sm:text-base !h-[46px] min-h-[46px]" >
                                            <SelectValue placeholder="権限 *" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.value} value={role.value}>
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>


                            {/* Buttons */}
                            <div className="hidden sm:flex justify-center items-center gap-4">
                                {/* Back to Login Button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="w-[151px]  h-[50px] sm:h-12 text-sm sm:text-base primary-text"
                                >

                                    キャンセル
                                </Button>

                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={isLoading}
                                    className="w-[151px] h-[50px] sm:h-12 text-sm sm:text-base  text-white border-0"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white  rounded-full"></div>
                                            登録中...
                                        </>
                                    ) : (
                                        <>

                                            登録する
                                        </>
                                    )}
                                </Button>


                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}