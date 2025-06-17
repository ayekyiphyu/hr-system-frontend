'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function InvitationForm() {
    const [formData, setFormData] = useState({
        emails: '',
        role: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailCount, setEmailCount] = useState(0);

    const roleOptions = [
        {
            value: 'owner',
            label: 'オーナー',
            description: 'システム全体の管理権限',

        },
        {
            value: 'admin',
            label: '管理者',
            description: 'ユーザー管理と設定変更',

        },
        {
            value: 'operator',
            label: 'オペレーター',
            description: '日常業務の実行権限',

        },
        {
            value: 'viewer',
            label: '閲覧者',
            description: 'データ参照のみ可能',

        },
    ];

    const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, emails: value });
        const count = value.split(',').filter(e => e.trim()).length;
        setEmailCount(count);
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!formData.emails.trim()) {
            setError('メールアドレスを入力してください');
            setIsLoading(false);
            return;
        }
        if (!formData.role) {
            setError('権限を選択してください');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSuccess(`${emailCount}件の招待を送信しました`);
        setIsLoading(false);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ emails: '', role: '', message: '' });
            setEmailCount(0);
            setSuccess('');
        }, 3000);
    };

    return (
        <div className="flex justify-center items-start min-h-screen sm:p-8 !p-0">
            {/* Desktop Version */}
            <div className="hidden md:block w-full ">
                <Card className="!border-0 ">


                    <CardContent className="bg-gradient-to-br from-white to-green-50/50  sm:p-8 m-4 ">
                        {success && (
                            <Alert className="mb-6 border-green-200 bg-green-50">
                                <Mail className="w-5 h-5 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription className="text-red-800">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    value={formData.emails}
                                    onChange={handleEmailChange}
                                    placeholder="例: user1@example.com, user2@example.com"
                                    className="min-h-[120px] text-base"
                                    disabled={isLoading}
                                />
                                <div className="flex justify-between mt-2 text-sm">
                                    <span className="text-gray-500">カンマ区切りで複数入力</span>
                                    {emailCount > 0 && (
                                        <span className="text-primary font-medium">
                                            {emailCount}件のアドレス
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    権限 <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full h-12 text-base">
                                        <SelectValue placeholder="権限を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className=""
                                            >
                                                <div className="flex items-center">

                                                    <div>
                                                        <div className="font-medium">{option.label}</div>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    メッセージ（任意）
                                </label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="招待メッセージを入力してください"
                                    className="min-h-[100px] text-base"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setFormData({ emails: '', role: '', message: '' });
                                        setEmailCount(0);
                                        setError('');
                                    }}
                                    className="h-12 w-32"
                                    disabled={isLoading}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-12 w-32"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            送信中
                                        </span>
                                    ) : '送信する'}
                                </Button>
                            </div>
                        </form>
                    </CardContent >
                </Card >
            </div >

            {/* Mobile Version */}
            < div className="block md:hidden w-full max-w-md" >
                <Card className="shadow-lg border-0">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            <CardTitle className="text-xl font-bold text-primary">
                                アカウント招待
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="px-4 pb-6">
                        {success && (
                            <Alert className="mb-4 border-green-200 bg-green-50 py-2">
                                <Mail className="w-4 h-4 text-green-600" />
                                <AlertDescription className="text-green-800 text-sm">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert variant="destructive" className="mb-4 py-2">
                                <AlertDescription className="text-red-800 text-sm">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    value={formData.emails}
                                    onChange={handleEmailChange}
                                    placeholder="user1@example.com, user2@example.com"
                                    className="min-h-[100px] text-sm "
                                    disabled={isLoading}
                                />
                                <div className="flex justify-between mt-1 text-xs">
                                    <span className="text-gray-500">カンマ区切りで入力</span>
                                    {emailCount > 0 && (
                                        <span className="text-primary font-medium">
                                            {emailCount}件
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    権限 <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full h-11 text-sm">
                                        <SelectValue placeholder="権限を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="py-2"
                                            >
                                                <div className="flex items-center gap-2">

                                                    <div>
                                                        <div className="font-medium text-sm">{option.label}</div>

                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    メッセージ（任意）
                                </label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="メッセージを入力"
                                    className="min-h-[80px] text-sm"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="h-11 w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '送信中...' : '送信する'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setFormData({ emails: '', role: '', message: '' });
                                        setEmailCount(0);
                                        setError('');
                                    }}
                                    className="h-11 w-full"
                                    disabled={isLoading}
                                >
                                    キャンセル
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div >
        </div >
    );
}