'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {

    //handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        console.log("submit")
    };


    return (
        <div className='flex item-center justify-center min-h-screen'>
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">ログイン</CardTitle>
                </CardHeader>
                <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={[]}
                                onChange={[]}
                                required
                                className="bg-white"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">パスワード</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={[]}
                                onChange={[]}
                                required
                                className="bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2"

                        >

                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    )

}