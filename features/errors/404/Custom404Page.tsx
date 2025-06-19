// app/not-found.js (Next.js 13+ App Router)
'use client';

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {/* Logo section */}
                <div className="flex justify-center mb-2">
                    <img
                        src="/assest/images/logo01.png"
                        alt="Logo"
                        className="w-[120px] h-auto"
                    />
                </div>

                {/* Error content */}
                <div className="text-center">
                    <h1 className="!text-[50px] font-bold primary-text primary-text !mb-[0px]">404</h1>
                    <h2 className="font-semibold mb-4 secondary-text">Page Not Found</h2>

                    <div className="text-gray-600 space-y-1 mb-6 text-[12px]">
                        <p>アクセスいただいたページは検索されたが、</p>
                        <p>公開期限を過ぎた可能性があります。</p>
                        <p>お手数ですがトップページより再度お探しください。</p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                    <Button
                        variant="default"
                        onClick={() => router.push('/dashboard')}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        トップページ
                    </Button>


                </div>
            </div>
        </div>
    );
}