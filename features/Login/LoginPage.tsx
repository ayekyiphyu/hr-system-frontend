'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    // 1. State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // 2. Handle input changes
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //3. Handle form submit
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        // TODO: Add your API call or auth logic here
    };

    return (
        <div className="min-h-screen bg-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md">
                <Card className="shadow-xl border-0 sm:border">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-center text-xl sm:text-2xl font-bold text-primary">
                            ログイン
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-secondary p-4 sm:p-6 mr-[46px] ml-[46px]">
                        <div className="space-y-4 sm:space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                    placeholder="メールアドレス *"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="bg-white primary-text h-10 sm:h-12 w-full placeholder:primary-text text-sm sm:text-base"
                                    placeholder="パスワード *"
                                />
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex justify-end">
                                <Link href="/forgot-password">
                                    <Button
                                        variant="link"
                                        className="text-xs sm:text-sm primary-text p-0 h-auto text-primary hover:text-primary/80 transition-colors"
                                    >
                                        パスワードをお忘れですか？
                                    </Button>
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                variant="outline"
                                onClick={handleSubmit}
                                className="w-full flex items-center justify-center gap-2 h-10 sm:h-12 primary-background text-white hover:primary-background/90 transition-colors text-sm sm:text-base font-medium"
                            >
                                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                                ログイン
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}