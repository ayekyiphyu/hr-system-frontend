'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react'; // Make sure this import exists
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
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-white text-primary h-[4.6rem]"
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
                                className="bg-white"
                                placeholder="パスワード *"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2"
                            disabled={!formData.email || !formData.password}
                        >
                            ログイン
                        </Button>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        <Link href="/forgot-password" className="block">
                            <Button variant="link" className="text-sm text-primary p-0 cursor-pointer">
                                パスワードをお忘れですか？
                            </Button>
                        </Link>

                        <div className="pt-2 border-t">
                            <p className="text-sm mb-2">アカウントをお持ちでないですか？</p>
                            <Link href="/register" className="block">
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <User className="h-4 w-4" />
                                    新規登録
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
