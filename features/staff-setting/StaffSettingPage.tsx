import router from 'next/router';
import { useState } from 'react';

export default function UserEditForm() {
    const [formData, setFormData] = useState({
        name: '田中太郎',
        authority: '管理者',
        password: '',
        group: '開発部',
        email: 'tanaka@yuimecompany.com',
        phone: '090-1234-5678'
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            alert('更新が完了しました');
            setIsLoading(false);
        }, 1500);
    };



    return (
        <div className="w-full mx-auto secondary-background p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6 primary-text text-center">スタッフ設定</h2>

            <div className="space-y-4">
                {/* 氏名 */}
                <div className="flex flex-row items-center gap-3">
                    <div className="w-[120px] text-sm font-medium text-gray-700 text-left">
                        氏名
                    </div>
                    <div className="text-gray-500 font-bold">:</div>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                    />
                </div>

                {/* 権限 */}
                <div className="flex flex-row items-center gap-3">
                    <div className="w-[120px] text-sm font-medium text-gray-700 text-left">
                        権限
                    </div>
                    <div className="text-gray-500 font-bold">:</div>
                    <input
                        type="text"
                        value={formData.authority}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                    />
                </div>

                {/* パスワード */}
                <div className="flex flex-row items-center gap-3">
                    <div className="w-[120px] text-sm font-medium text-gray-700 text-left">
                        パスワード
                    </div>
                    <div className="text-gray-500 font-bold">:</div>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="******"
                        disabled
                    />
                </div>

                {/* 所属グループ */}
                <div className="flex flex-row items-center gap-3">
                    <div className="w-[120px] text-sm font-medium text-gray-700 text-left">
                        所属グループ
                    </div>
                    <div className="text-gray-500 font-bold">:</div>
                    <input
                        type="text"
                        value={formData.group}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                    />

                </div>

                {/* メールアドレス */}
                <div className="flex flex-row items-center gap-3">
                    <div className="w-[120px] text-sm font-medium text-gray-700 text-left">
                        メールアドレス
                    </div>
                    <div className="text-gray-500 font-bold">:</div>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                    />
                </div>

                {/* 電話番号 - Only editable field */}
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-3">
                        <div className="w-[120px] text-sm font-medium text-gray-700 text-left">
                            電話番号
                        </div>
                        <div className="text-gray-500 font-bold">:</div>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                            placeholder="電話番号を入力"
                        />
                    </div>
                    <p className="text-xs primary-text ml-[140px] font-bold">※ 電話番号のみ編集可能です</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                    type="button"
                    onClick={() =>
                        router.push('/dashboard')
                    }
                    className="w-[150px] h-[46px] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                >
                    戻る
                </button>
                <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="w-[150px] h-[46px] px-4 py-2 primary-background text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? "更新中..." : "更新する"}
                </button>
            </div>
        </div>
    );
}