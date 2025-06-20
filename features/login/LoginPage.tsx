'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { dummyLogin } from '@/dummy/password-dummy';
import { LoginFormData } from '@/type/type';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import router from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
    // 1. State to hold form data
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    // 2. Additional states for better UX
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    // 3. Handle input changes with proper typing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: LoginFormData) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError('');
    };

    // 4. Handle form submit with proper error handling
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            console.log('Submitting:', formData);

            // Basic validation
            if (!formData.email || !formData.password) {
                setError('メールアドレスとパスワードを入力してください');
                setIsLoading(false);
                return;
            }

            const response = await dummyLogin(formData);

            if (response.success && response.user) {
                console.log('Login successful:', response.user);

                // Store token if needed
                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                    document.cookie = `authToken=${response.token}; path=/`;
                }


                // Redirect based on role
                if (response.user.isAdmin) {
                    router.push('/dashboard');
                } else if (response.user.isOrganization) {
                    console.log('Redirecting to organization dashboard');
                } else if (response.user.isJobseeker) {
                    console.log('Redirecting to jobseeker dashboard');
                } else if (response.user.isUser) {
                    console.log('Redirecting to user dashboard');
                }

            } else {
                setError(response.message || 'ログインに失敗しました');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('ネットワークエラーが発生しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    // 5. Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md">
                <Card className="shadow-xl border-0 sm:border">
                    <CardHeader className="space-y-1">

                        <CardTitle className="text-center text-xl sm:text-2xl font-bold text-primary flex flex-col items-center">
                            <img
                                src="/assest/images/logo01.png"
                                alt="Logo"
                                className="h-[100px] w-auto "
                            />
                            <p className='pt-[1rem] pb-[0rem]'>ログイン</p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white p-4 sm:p-6 mr-[46px] ml-[46px]">
                        {/* Show error message */}
                        {error && (
                            <Alert className="mb-4 border-red-200 bg-red-50">
                                <AlertDescription className="text-red-800">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                    className="bg-white text-foreground h-10 sm:h-12 w-full placeholder:text-muted-foreground text-sm sm:text-base"
                                    placeholder="メールアドレス *"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2 relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                    className="bg-white text-foreground h-10 sm:h-12 w-full placeholder:text-muted-foreground text-sm sm:text-base pr-10"
                                    placeholder="パスワード *"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            <p className="text-xs mt-1 text-right  font-bold text-primary-text">
                                <a href="/forgot-password" className="text-primary-text underline hover:underline">パスワードを忘れた場合</a>
                            </p>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                variant="default"
                                disabled={isLoading}
                                className="w-full text-white flex items-center justify-center gap-2 h-10 sm:h-12 bg-primary text-primary-foreground text-sm sm:text-base font-medium"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        処理中...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4 sm:w-5 sm:h-5 !text-white" />
                                        ログイン
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
