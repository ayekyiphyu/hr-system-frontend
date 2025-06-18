


'use client';

import { StaffMember } from "@/type/type";
import { ChevronDown, Download, Edit, Eye, Filter, Mails, MoreVertical, Search, Trash2 } from "lucide-react";
import { useState } from "react";



export default function StaffListPage() {
    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState('すべてのステータス');
    const [roleFilter, setRoleFilter] = useState('すべての権限');

    // Sample data
    const staffMembers: StaffMember[] = [
        { id: 1, name: '山田太郎', email: 'yamada@example.com', role: 'admin', status: 'active', lastLogin: '2024-05-20 14:30' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com', role: 'operator', status: 'active', lastLogin: '2024-05-21 09:15' },
        { id: 3, name: '鈴木健太', email: 'suzuki@example.com', role: 'viewer', status: 'inactive', lastLogin: '2024-04-15 11:20' },
        { id: 4, name: '花子渡辺', email: 'hanako@example.com', role: 'viewer', status: 'inactive', lastLogin: '2024-04-15 11:20' }
    ];

    const handleInviteClick = () => {
        // router.push('/staff/invite')
        console.log('Navigate to invite page');
    };

    // StatusBadge component
    const StatusBadge = ({ status }: { status: string }) => {
        const statusClasses = {
            active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            inactive: 'bg-gray-100 text-gray-800 border-gray-200',
            admin: 'bg-purple-100 text-purple-800 border-purple-200',
            operator: 'bg-blue-100 text-blue-800 border-blue-200',
            viewer: 'bg-amber-100 text-amber-800 border-amber-200',
            owner: 'bg-red-100 text-red-800 border-red-200'
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
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                {getStatusText(status)}
            </span>
        );
    };

    // Action buttons component
    const ActionButtons = ({ staff }: { staff: StaffMember }) => {
        const [showMenu, setShowMenu] = useState(false);

        return (
            <div className="relative">
                <div className="flex items-center space-x-1">
                    <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </button>
                </div>

                {showMenu && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            編集
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            データエクスポート
                        </button>
                        <hr className="my-1" />
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center">
                            <Trash2 className="h-4 w-4 mr-2" />
                            削除
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // Staff Management Component
    const StaffManagement = () => (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Background Pattern */}
                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-2xl"></div>

                    <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Left Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">


                            <button
                                onClick={handleInviteClick}
                                className="group relative inline-flex items-center px-6 py-3 common-bg text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <Mails className="h-4 w-4 mr-2 !text-white" />
                                YUIMEアカウント招待
                            </button>
                        </div>

                        {/* Right Section - Filters */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            {/* Search Input */}
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="スタッフを検索..."
                                    className="w-full sm:w-72 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Filter Dropdowns */}
                            <div className="flex gap-3">
                                <div className="relative">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                                    >
                                        <option>すべてのステータス</option>
                                        <option>有効</option>
                                        <option>無効</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>

                                <div className="relative">
                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                                    >
                                        <option>すべての権限</option>
                                        <option>オーナー</option>
                                        <option>管理者</option>
                                        <option>オペレーター</option>
                                        <option>ビューアー</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(searchValue || statusFilter !== 'すべてのステータス' || roleFilter !== 'すべての権限') && (
                        <div className="relative mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">フィルター:</span>

                                {searchValue && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        検索: "{searchValue}"
                                        <button onClick={() => setSearchValue('')} className="ml-1 text-blue-600">×</button>
                                    </span>
                                )}

                                {statusFilter !== 'すべてのステータス' && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        {statusFilter}
                                        <button onClick={() => setStatusFilter('すべてのステータス')} className="ml-1 text-emerald-600">×</button>
                                    </span>
                                )}

                                {roleFilter !== 'すべての権限' && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        {roleFilter}
                                        <button onClick={() => setRoleFilter('すべての権限')} className="ml-1 text-purple-600">×</button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="common-bg from-gray-50 to-gray-100">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                    氏名
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                    メールアドレス
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                    権限
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                    ステータス
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                    最終ログイン
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {staffMembers.map((staff, index) => (
                                <tr key={staff.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center text-white font-medium text-sm">
                                                    {staff.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {staff.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={staff.role} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={staff.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {staff.lastLogin}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ActionButtons staff={staff} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                        <span>合計 {staffMembers.length} 名のスタッフ</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            前へ
                        </button>
                        <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                            1
                        </span>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            次へ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-6">
            <StaffManagement />

            {/* CSS for grid pattern */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-image: url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%236366f1' fill-opacity='0.1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
                }
            `}</style>
        </div>
    );
}