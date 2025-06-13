'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserRole } from '@/type/type';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface InvitationFormData {
    emails: string;
    role: UserRole | '';
    message?: string;
}

export default function InvitationPage() {
    const router = useRouter();

    // State management
    const [formData, setFormData] = useState<InvitationFormData>({
        emails: '',
        role: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [emailList, setEmailList] = useState<string[]>([]);

    // Handle input changes
    const handleChange = (field: keyof InvitationFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Parse emails when email field changes
        if (field === 'emails') {
            const emails = value
                .split(',')
                .map(email => email.trim())
                .filter(email => email.length > 0);
            setEmailList(emails);
        }

        // Clear messages when user starts typing
        if (error) setError('');
        if (success) setSuccess('');
    };

    // Validate email format
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate form
    const validateForm = (): string | null => {
        if (!formData.emails.trim()) {
            return 'メールアドレスを入力してください';
        }

        if (!formData.role) {
            return '権限を選択してください';
        }

        // Validate all email addresses
        const invalidEmails = emailList.filter(email => !isValidEmail(email));
        if (invalidEmails.length > 0) {
            return `無効なメールアドレス: ${invalidEmails.join(', ')}`;
        }

        return null;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const validationError = validateForm();
            if (validationError) {
                setError(validationError);
                return;
            }

            console.log('Sending invitations:', {
                emails: emailList,
                role: formData.role,
                message: formData.message,
            });

            // TODO: Replace with actual API call
            // const response = await apiService.sendInvitations({
            //   emails: emailList,
            //   role: formData.role as UserRole,
            //   message: formData.message,
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(`${emailList.length}件の招待メールを送信しました`);

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({ emails: '', role: '', message: '' });
                setEmailList([]);
                setSuccess('');
            }, 3000);

        } catch (error) {
            console.error('Invitation error:', error);
            setError('招待メールの送信に失敗しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        router.push('/dashboard');
    };

    // Role options with Japanese labels
    const roleOptions = [
        { value: 'admin', label: '管理者', description: 'システム全体の管理権限' },
        { value: 'user', label: '一般ユーザー', description: '基本的な利用権限' },
        { value: 'organization', label: '企業', description: '求人投稿・管理権限' },
        { value: 'jobseeker', label: '求職者', description: '求職活動・応募権限' },
    ];

    return (
        <div className="min-h-screen bg-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <Card className="shadow-xl border-0 sm:border">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-center text-xl sm:text-2xl font-bold text-primary flex items-center justify-center gap-2">
                            YUIMEアカウント招待
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Success Message */}
                        {success && (
                            <Alert className="border-green-200 bg-green-50">
                                <Mail className="w-4 h-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Error Message */}
                        {error && (
                            <Alert className="border-red-200 bg-red-50">
                                <AlertDescription className="text-red-800">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Textarea
                                    id="emails"
                                    value={formData.emails}
                                    onChange={(e) => handleChange('emails', e.target.value)}
                                    placeholder=" メールアドレス (複数入力可、カンマ区切り) *
                                    example1@company.com, example2@company.com"
                                    className="min-h-[80px] resize-none"
                                    disabled={isLoading}
                                />
                                {emailList.length > 0 && (
                                    <div className="text-xs text-muted-foreground">
                                        {emailList.length}件のメールアドレスが入力されています
                                    </div>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">

                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => handleChange('role', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className='primary-text w-full '>
                                        <SelectValue placeholder="権限 *" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{option.label}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {option.description}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Optional Message */}
                            <div className="space-y-2">

                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    placeholder="招待に関する追加メッセージがあれば入力してください"
                                    className="min-h-[60px] resize-none"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >

                                    キャンセル
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            送信中...
                                        </>
                                    ) : (
                                        <>

                                            招待を送信
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}