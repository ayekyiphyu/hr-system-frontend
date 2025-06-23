'use client';

import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Eye, Filter, Mails, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// Updated type definition for Organization
interface Organization {
    id: number;
    name: string;
    category: string;
    phone: string;
    country: string;
    registrationDate: string;
}

export default function OrganizationListPage() {
    const [searchValue, setSearchValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('すべての組織区分');
    const [countryFilter, setCountryFilter] = useState('すべての国');

    // Debounced search update
    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchTerm(searchValue.trim().toLowerCase());
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchValue]);

    // Sample organization data
    const organizations: Organization[] = [
        { id: 1, name: '株式会社グローバル人材', category: 'sending', phone: '03-1234-5678', country: 'ベトナム', registrationDate: '2024-01-15' },
        { id: 2, name: '東京製造業協同組合', category: 'receiving', phone: '03-9876-5432', country: '日本', registrationDate: '2024-02-20' },
        { id: 3, name: 'インターナショナルサポート', category: 'support', phone: '06-1111-2222', country: 'フィリピン', registrationDate: '2024-03-10' },
        { id: 4, name: '人材紹介センター', category: 'referral', phone: '052-3333-4444', country: 'インドネシア', registrationDate: '2024-04-05' }
    ];

    // Filter function
    const filteredOrganizations = organizations.filter(org => {
        // Search filter
        const matchesSearch = !searchTerm ||
            org.name.toLowerCase().includes(searchTerm) ||
            org.phone.toLowerCase().includes(searchTerm) ||
            org.country.toLowerCase().includes(searchTerm) ||
            org.category.toLowerCase().includes(searchTerm) ||
            (org.category === 'sending' && '送出機関'.includes(searchTerm)) ||
            (org.category === 'receiving' && '受入機関'.includes(searchTerm)) ||
            (org.category === 'support' && '登録支援機関'.includes(searchTerm)) ||
            (org.category === 'referral' && '紹介事業者'.includes(searchTerm));

        // Category filter
        const matchesCategory = categoryFilter === 'すべての組織区分' ||
            (categoryFilter === '送出機関' && org.category === 'sending') ||
            (categoryFilter === '受入機関' && org.category === 'receiving') ||
            (categoryFilter === '登録支援機関' && org.category === 'support') ||
            (categoryFilter === '紹介事業者' && org.category === 'referral');

        // Country filter
        const matchesCountry = countryFilter === 'すべての国' ||
            countryFilter === org.country;

        return matchesSearch && matchesCategory && matchesCountry;
    });

    const handleInviteClick = () => {
        // router.push('/organization/invite') // Uncomment when router is available
        console.log('Navigate to organization invite page');
    };

    // Clear all filters function
    const clearAllFilters = () => {
        setSearchValue('');
        setCategoryFilter('すべての組織区分');
        setCountryFilter('すべての国');
    };

    // CategoryBadge component
    const CategoryBadge = ({ category }: { category: string }) => {
        const categoryClasses = {
            sending: 'bg-blue-100 text-blue-800 border-blue-200',
            receiving: 'bg-green-100 text-green-800 border-green-200',
            support: 'bg-purple-100 text-purple-800 border-purple-200',
            referral: 'bg-orange-100 text-orange-800 border-orange-200'
        };

        const getCategoryText = (category: string) => {
            switch (category) {
                case 'sending': return '送出機関';
                case 'receiving': return '受入機関';
                case 'support': return '登録支援機関';
                case 'referral': return '紹介事業者';
                default: return category;
            }
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${categoryClasses[category as keyof typeof categoryClasses] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                {getCategoryText(category)}
            </span>
        );
    };

    // Action buttons component
    const ActionButtons = ({ organization }: { organization: Organization }) => {
        return (
            <div className="flex items-center space-x-1">
                <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-6">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative bg-gradient-to-br from-red-50 via-red-50 to-red-50 p-6">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-2xl"></div>

                        <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                            {/* Left Section */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <button
                                    onClick={handleInviteClick}
                                    className="group relative inline-flex items-center gap-2 p-[8px] w-[px] common-bg text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <Mails className="h-4 !text-white" />
                                    ユーザー招待
                                </button>
                            </div>


                            {/* Right Section - Filters */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                                {/* Search Input */}
                                <div className="relative group flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder="組織名、電話番号、国で検索..."
                                        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm caret-blue-600"
                                        autoComplete="off"
                                    />
                                    {searchValue && (
                                        <button
                                            onClick={() => setSearchValue('')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>

                                {/* Filter Dropdowns */}
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option>すべての組織区分</option>
                                            <option>送出機関</option>
                                            <option>受入機関</option>
                                            <option>登録支援機関</option>
                                            <option>紹介事業者</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={countryFilter}
                                            onChange={(e) => setCountryFilter(e.target.value)}
                                            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option>すべての国</option>
                                            <option>日本</option>
                                            <option>ベトナム</option>
                                            <option>フィリピン</option>
                                            <option>インドネシア</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>

                                    <div className="relative">
                                        <div>

                                            <Button
                                                variant="secondary"
                                                onClick={() => {

                                                }}
                                                className="w-full sm:h-12 text-sm sm:text-base tracking-wide text-red"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                新規登録
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(searchValue || categoryFilter !== 'すべての組織区分' || countryFilter !== 'すべての国') && (
                            <div className="relative mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Filter className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">フィルター:</span>

                                    {searchValue && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            検索: {searchValue}
                                            <button onClick={() => setSearchValue('')} className="ml-1 text-blue-600 hover:text-blue-800 text-sm font-bold">×</button>
                                        </span>
                                    )}

                                    {categoryFilter !== 'すべての組織区分' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {categoryFilter}
                                            <button onClick={() => setCategoryFilter('すべての組織区分')} className="ml-1 text-green-600 hover:text-green-800">×</button>
                                        </span>
                                    )}

                                    {countryFilter !== 'すべての国' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {countryFilter}
                                            <button onClick={() => setCountryFilter('すべての国')} className="ml-1 text-purple-600 hover:text-purple-800">×</button>
                                        </span>
                                    )}

                                    <button
                                        onClick={clearAllFilters}
                                        className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
                                    >
                                        すべてクリア
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden !p-0">
                    <div className="overflow-x-auto overscroll-x-contain">
                        <table className="w-full min-w-[800px] divide-y divide-gray-200">
                            <thead className="sticky top-0 z-10">
                                <tr className="common-bg">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[180px]">
                                        組織名
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[180px]">
                                        組織区分
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[180px]">
                                        代表電話
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[180px]">
                                        国
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[180px]">
                                        登録日
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-white min-w-[180px]">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrganizations.length > 0 ? (
                                    filteredOrganizations.map((org, index) => (
                                        <tr key={org.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8">
                                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center text-white font-medium text-xs">
                                                            {org.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">{org.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <CategoryBadge category={org.category} />
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {org.phone}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {org.country}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {org.registrationDate}
                                            </td>
                                            <td className="px-4 py-3">
                                                <ActionButtons organization={org} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <Search className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {searchValue || categoryFilter !== 'すべての組織区分' || countryFilter !== 'すべての国'
                                                        ? '検索条件に一致する組織が見つかりません'
                                                        : '組織が登録されていません'}
                                                </div>
                                                {(searchValue || categoryFilter !== 'すべての組織区分' || countryFilter !== 'すべての国') && (
                                                    <button
                                                        onClick={clearAllFilters}
                                                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        フィルターをクリア
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}