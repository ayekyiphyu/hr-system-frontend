'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Mail } from 'lucide-react';
import { useState } from 'react';

export default function InvitationForm() {
    const [formData, setFormData] = useState({
        emails: '',
        role: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [emailCount, setEmailCount] = useState(0);

    const roleOptions = [
        {
            value: 'owner',
            label: 'オーナー',

        },
        {
            value: 'admin',
            label: '管理者',

        },
        {
            value: 'operator',
            label: 'オペレーター',

        },
        {
            value: 'viewer',
            label: '閲覧者',

        },
    ];

    const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, emails: value });
        const emails = value.split(',').filter(e => e.trim()).length;
        setEmailCount(value.trim() ? emails : 0);
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.emails.trim()) {
            setError('メールアドレスを入力してください');
            return;
        }
        if (!formData.role) {
            setError('権限を選択してください');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSuccess(true);
        } catch (err) {
            setError('招待の送信に失敗しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({ emails: '', role: '', message: '' });
        setEmailCount(0);
        setError('');
        setIsSuccess(false);
        setIsLoading(false);
    };

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
                                招待を送信しました
                            </CardTitle>

                            <CardDescription className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base px-2 leading-relaxed">
                                <span className="font-semibold text-green-600">
                                    {emailCount}件
                                </span>
                                のアカウント招待が正常に送信されました。
                                <br />
                                招待されたユーザーにメールが届きます。
                            </CardDescription>

                            <Button
                                onClick={handleReset}
                                className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                                新しい招待を送信
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="w-full relative z-10">
                <Card className="w-full pb-0 mb-0">
                    <CardHeader className="text-center">
                        <div className="p-0">
                            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">

                                YUIMEアカウント招待
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

                            {/* メールアドレス */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Textarea
                                        value={formData.emails}
                                        onChange={handleEmailChange}
                                        placeholder="例: user1@example.com, user2@example.com"
                                        className="bg-white primary-text min-h-[120px] w-full placeholder:primary-text text-sm sm:text-base resize-none"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-sm">
                                    <span className="text-gray-500">カンマ区切りで複数のメールアドレスを入力</span>
                                    {emailCount > 0 && (
                                        <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">
                                            {emailCount}件のアドレス
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 権限選択 */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    権限 <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="bg-white primary-text w-full placeholder:primary-text text-sm sm:text-base !h-[46px] min-h-[46px]">
                                            <SelectValue placeholder="権限を選択してください *" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roleOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className="py-3"
                                                >
                                                    <div className="flex flex-col items-start">
                                                        <div className="font-medium text-sm">{option.label}</div>

                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* メッセージ（任意） */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    招待メッセージ（任意）
                                </label>
                                <div className="relative group">
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="招待する際の個人的なメッセージを入力してください"
                                        className="bg-white primary-text min-h-[100px] w-full placeholder:primary-text text-sm sm:text-base resize-none"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="text-xs text-gray-500">
                                    このメッセージは招待メールに含まれます
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="hidden sm:flex justify-center items-center gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    className="w-[151px] h-[50px] sm:h-12 text-sm sm:text-base primary-text"
                                    disabled={isLoading}
                                >
                                    キャンセル
                                </Button>

                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={isLoading}
                                    className="w-[151px] h-[50px] sm:h-12 text-sm sm:text-base text-white border-0"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            送信中...
                                        </>
                                    ) : (
                                        <>

                                            招待を送信
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Mobile Buttons */}
                            <div className="flex sm:hidden flex-col gap-3 pt-4">
                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={isLoading}
                                    className="w-full h-12 text-sm text-white"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            送信中...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4 mr-2" />
                                            招待を送信
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    className="w-full h-12 text-sm primary-text"
                                    disabled={isLoading}
                                >
                                    キャンセル
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}