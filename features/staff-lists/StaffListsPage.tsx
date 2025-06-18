'use client';

import { Edit, Eye, Mails, Search, Trash2 } from "lucide-react";
import { useState } from "react";

export default function StaffListPage() {
    const [activeTab, setActiveTab] = useState('staff-management');

    type StaffMember = {
        id: number;
        name: string;
        email: string;
        role: 'owner' | 'admin' | 'operator' | 'viewer';
        status: 'active' | 'inactive';
        lastLogin: string;
    };

    // Sample data - fixed duplicate id
    const staffMembers: StaffMember[] = [
        { id: 1, name: '山田太郎', email: 'yamada@example.com', role: 'admin', status: 'active', lastLogin: '2024-05-20 14:30' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com', role: 'operator', status: 'active', lastLogin: '2024-05-21 09:15' },
        { id: 3, name: '鈴木健太', email: 'suzuki@example.com', role: 'viewer', status: 'inactive', lastLogin: '2024-04-15 11:20' },
        { id: 4, name: '花子渡辺', email: 'hanako@example.com', role: 'viewer', status: 'inactive', lastLogin: '2024-04-15 11:20' }
    ];

    // Fixed StatusBadge component
    const StatusBadge = ({ status }: { status: string }) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            admin: 'bg-purple-100 text-purple-800',
            operator: 'bg-blue-100 text-blue-800',
            viewer: 'bg-yellow-100 text-yellow-800',
            owner: 'bg-red-100 text-red-800'
        };

        const getStatusText = (status: string) => {
            switch (status) {
                case 'active': return '有効';
                case 'inactive': return '無効';
                case 'admin': return '管理者';
                case 'operator': return 'オペレーター';
                case 'viewer': return 'ビューアー';
                case 'owner': return 'オーナー';
                default: return status;
            }
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
                {getStatusText(status)}
            </span>
        );
    };

    // Staff Management Component
    const StaffManagement = () => (
        <div className="p-0">

            <div className="p-4 border-b flex justify-between items-center border border-red-500 rounded-[10px]">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center">
                    <Mails className="h-4 w-4 mr-2 !text-white" />
                    YUIMEアカウント招待
                </button>
                <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="スタッフを検索..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>すべてのステータス</option>
                        <option>有効</option>
                        <option>無効</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>すべての権限</option>
                        <option>オーナー</option>
                        <option>管理者</option>
                        <option>オペレーター</option>
                        <option>ビューアー</option>
                    </select>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden mt-[40px]">

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    氏名
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    メールアドレス
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    権限
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ステータス
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    最終ログイン
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {staffMembers.map((staff) => (
                                <tr key={staff.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {staff.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {staff.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={staff.role} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={staff.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {staff.lastLogin}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="text-yellow-600 hover:text-yellow-900">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        1-4 of 4 staff members
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen  via-emerald-50 to-teal-50">
            <StaffManagement />
        </div>
    );
}