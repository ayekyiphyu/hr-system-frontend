'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LogIn, User } from 'lucide-react'; // Make sure this import exists
import Link from 'next/link';
import React, { useState } from 'react';

export default function LoginPage() {
    // 1. State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // 2. Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //3. Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        // TODO: Add your API call or auth logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">ログイン</CardTitle>
                </CardHeader>
                <CardContent className='bg-secondary w-sm ' style={{ margin: '0 auto' }}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-white primary-text h-[46px] mt-[30px] placeholder:primary-text"
                                placeholder="メールアドレス *"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="bg-white primary-text h-[46px] mt-[30px] placeholder:primary-text"
                                placeholder="パスワード *"
                            />
                        </div>

                        <Link href="/forgot-password" className="block">
                            <Button
                                variant="link"
                                className="text-sm primary-text  p-0 cursor-pointer flex justify-end w-full text-primary "
                            >
                                パスワードをお忘れですか？
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 h-[46px] mt-[30px] cursor-pointer primary-background text-white"

                        >
                            <LogIn />
                            ログイン
                        </Button>


                    </form>

                    <div className="mt-6 text-right space-y-4">
                        <div className="pt-2">
                            <Link href="/register" className="block">
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2 h-[46px] cursor-pointer mb-[48px]"
                                >
                                    <User className="h-4 w-4 primary-text" />
                                    <span className='primary-text'>新規登録</span>
                                </Button>
                            </Link>


                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
