'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Mail } from 'lucide-react';
import { useState } from 'react';

interface InvitationResult {
    email: string;
    status: 'success' | 'failed';
    message?: string;
}

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
    const [invitationResults, setInvitationResults] = useState<InvitationResult[]>([]);

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

    // Email validation function
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    // Parse and validate emails
    const parseEmails = (emailString: string): string[] => {
        return emailString
            .split(',')
            .map(email => email.trim())
            .filter(email => email.length > 0);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, emails: value });

        const emails = parseEmails(value);
        setEmailCount(emails.length);

        if (error) setError('');
    };

    // Simulate sending invitation to a single email
    const sendSingleInvitation = async (email: string, role: string, message: string): Promise<InvitationResult> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

        // Simulate some failures (10% failure rate)
        const success = Math.random() > 0.1;

        if (success) {
            return {
                email,
                status: 'success'
            };
        } else {
            return {
                email,
                status: 'failed',
                message: 'メール送信エラー'
            };
        }
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

        const emails = parseEmails(formData.emails);

        // Validate email formats
        const invalidEmails = emails.filter(email => !isValidEmail(email));
        if (invalidEmails.length > 0) {
            setError(`無効なメールアドレス形式: ${invalidEmails.join(', ')}`);
            return;
        }

        // Check for duplicate emails
        const uniqueEmails = Array.from(new Set(emails));
        if (uniqueEmails.length !== emails.length) {
            setError('重複したメールアドレスがあります');
            return;
        }

        setIsLoading(true);

        try {
            // Send invitations one by one
            const results: InvitationResult[] = [];

            for (const email of uniqueEmails) {
                const result = await sendSingleInvitation(email, formData.role, formData.message);
                results.push(result);
            }

            setInvitationResults(results);
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
        setInvitationResults([]);
    };

    if (isSuccess) {
        const successCount = invitationResults.filter(result => result.status === 'success').length;
        const failedCount = invitationResults.filter(result => result.status === 'failed').length;

        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                <div className="w-full max-w-md">
                    <Card className="shadow-md border border-gray-200 bg-white">
                        <CardContent className="p-8 text-center">
                            <div className="flex justify-center mb-6">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            </div>

                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                招待を送信しました
                            </h2>

                            <div className="text-gray-600 mb-6 space-y-2">
                                <div>
                                    <span className="font-semibold text-green-600">
                                        {successCount}件
                                    </span>
                                    のアカウント招待が正常に送信されました。
                                </div>
                                {failedCount > 0 && (
                                    <div>
                                        <span className="font-semibold text-red-600">
                                            {failedCount}件
                                        </span>
                                        の送信に失敗しました。
                                    </div>
                                )}
                                <div className="text-sm">
                                    招待されたユーザーにメールが届きます。
                                </div>
                            </div>

                            {/* Show detailed results if there are failures */}
                            {failedCount > 0 && (
                                <div className="mb-6 text-left">
                                    <div className="text-sm font-medium text-gray-700 mb-2">送信結果:</div>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                        {invitationResults.map((result, index) => (
                                            <div
                                                key={index}
                                                className={`text-xs p-2 rounded border flex items-center justify-between ${result.status === 'success'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                                    }`}
                                            >
                                                <span className="truncate">{result.email}</span>
                                                <span className="ml-2 font-medium">
                                                    {result.status === 'success' ? '✓' : '✗'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleReset}
                                className="w-full h-12 bg-blue-600 text-white"
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
        <div className="min-h-screen bg-gray-50">
            <div className="w-full">
                <Card className="w-full border border-gray-200 bg-white">
                    <CardHeader className="text-center border-b border-gray-100">
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            アカウント招待
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert className="border-red-200 bg-red-50">
                                    <AlertDescription className="text-sm text-red-700">{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* メールアドレス */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    value={formData.emails}
                                    onChange={handleEmailChange}
                                    placeholder="例: user1@example.com, user2@example.com"
                                    className="bg-white border-gray-300 min-h-[120px] w-full text-sm resize-none"
                                    disabled={isLoading}
                                />
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">カンマ区切りで複数のメールアドレスを入力</span>
                                    {emailCount > 0 && (
                                        <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                            {emailCount}件のアドレス
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 権限選択 */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    権限 <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="bg-white border-gray-300 w-full text-sm h-[46px]">
                                        <SelectValue placeholder="権限を選択してください" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="py-3"
                                            >
                                                <div className="font-medium text-sm">{option.label}</div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* メッセージ（任意） */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    招待メッセージ（任意）
                                </label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="招待する際の個人的なメッセージを入力してください"
                                    className="bg-white border-gray-300 min-h-[100px] w-full text-sm resize-none"
                                    disabled={isLoading}
                                />
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
                                    className="w-[151px] h-12 text-sm border-gray-300 text-gray-700"
                                    disabled={isLoading}
                                >
                                    キャンセル
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-[151px] h-12 text-sm bg-blue-600 text-white border-0"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            送信中...
                                        </>
                                    ) : (
                                        '招待を送信'
                                    )}
                                </Button>
                            </div>

                            {/* Mobile Buttons */}
                            <div className="flex sm:hidden flex-col gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 text-sm bg-blue-600 text-white"
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
                                    className="w-full h-12 text-sm border-gray-300 text-gray-700"
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