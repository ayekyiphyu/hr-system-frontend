export const dummyUserProfiles = {
  admin: {
    id: "admin_001",
    name: "田中 太郎",
    email: "admin@example.com",
    role: "システム管理者",
    avatar: "/images/avatars/admin.jpg",
    department: "IT部門",
    joinDate: "2020-04-01",
    lastLogin: "2025-06-20T09:30:00Z",
    permissions: ["all"],
    notificationCount: 5,
    status: "online",
  },
  user: {
    id: "user_001",
    name: "佐藤 花子",
    email: "user@example.com",
    role: "一般ユーザー",
    avatar: "/images/avatars/user.jpg",
    department: "営業部",
    joinDate: "2022-03-15",
    lastLogin: "2025-06-20T08:45:00Z",
    permissions: ["read", "write"],
    notificationCount: 2,
    status: "online",
  },
  organization: {
    id: "org_001",
    name: "ABC株式会社",
    email: "company@example.com",
    role: "企業担当者",
    avatar: "/images/avatars/company.jpg",
    companySize: "500-1000名",
    industry: "IT・ソフトウェア",
    establishedYear: "1995",
    lastLogin: "2025-06-20T10:15:00Z",
    permissions: ["company_manage", "job_post"],
    notificationCount: 8,
    status: "online",
  },
  jobseeker: {
    id: "job_001",
    name: "山田 太郎",
    email: "jobseeker@example.com",
    role: "求職者",
    avatar: "/images/avatars/jobseeker.jpg",
    experience: "3年",
    skills: ["React", "Node.js", "TypeScript"],
    desiredPosition: "フロントエンドエンジニア",
    lastLogin: "2025-06-20T07:20:00Z",
    permissions: ["job_search", "profile_edit"],
    notificationCount: 3,
    status: "online",
  },
};

export const dummyPageTitles = {
  admin: {
    dashboard: "管理者ダッシュボード",
    users: "ユーザー管理",
    settings: "システム設定",
    reports: "レポート・分析",
    logs: "システムログ",
  },
  user: {
    dashboard: "ユーザーダッシュボード",
    profile: "プロフィール",
    documents: "ドキュメント",
    tasks: "タスク管理",
    calendar: "スケジュール",
  },
  organization: {
    dashboard: "企業管理画面",
    jobs: "求人管理",
    candidates: "応募者管理",
    company: "企業情報",
    analytics: "採用分析",
  },
  jobseeker: {
    dashboard: "求職者ダッシュボード",
    search: "求人検索",
    applications: "応募履歴",
    profile: "プロフィール編集",
    messages: "メッセージ",
  },
};

export const dummyNotifications = {
  admin: [
    {
      id: "notif_admin_1",
      title: "新規ユーザー登録",
      message: "5件の新規ユーザー登録があります",
      type: "info",
      timestamp: "2025-06-20T09:00:00Z",
      isRead: false,
    },
    {
      id: "notif_admin_2",
      title: "システムアップデート",
      message: "メンテナンス予定: 6/25 2:00-4:00",
      type: "warning",
      timestamp: "2025-06-19T15:30:00Z",
      isRead: false,
    },
    {
      id: "notif_admin_3",
      title: "セキュリティアラート",
      message: "不正なログイン試行を検出しました",
      type: "error",
      timestamp: "2025-06-19T11:20:00Z",
      isRead: true,
    },
  ],
  user: [
    {
      id: "notif_user_1",
      title: "新しいタスク",
      message: "プロジェクトAのレビューが割り当てられました",
      type: "info",
      timestamp: "2025-06-20T08:30:00Z",
      isRead: false,
    },
    {
      id: "notif_user_2",
      title: "会議のリマインダー",
      message: "14:00からチームミーティングです",
      type: "reminder",
      timestamp: "2025-06-20T07:00:00Z",
      isRead: false,
    },
  ],
  organization: [
    {
      id: "notif_org_1",
      title: "新しい応募者",
      message: "フロントエンドエンジニア職に3名の応募がありました",
      type: "info",
      timestamp: "2025-06-20T09:45:00Z",
      isRead: false,
    },
    {
      id: "notif_org_2",
      title: "求人の期限切れ",
      message: "2件の求人が明日期限切れになります",
      type: "warning",
      timestamp: "2025-06-19T16:00:00Z",
      isRead: false,
    },
  ],
  jobseeker: [
    {
      id: "notif_job_1",
      title: "応募結果",
      message: "XYZ会社から書類選考通過のお知らせ",
      type: "success",
      timestamp: "2025-06-20T06:30:00Z",
      isRead: false,
    },
    {
      id: "notif_job_2",
      title: "新着求人",
      message: "あなたにマッチする求人が5件追加されました",
      type: "info",
      timestamp: "2025-06-19T18:00:00Z",
      isRead: false,
    },
  ],
};

// Settings data for each user type
export const dummySettings = {
  admin: {
    theme: "light",
    language: "ja",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
    },
    permissions: {
      canManageUsers: true,
      canViewReports: true,
      canModifySettings: true,
    },
  },
  user: {
    theme: "light",
    language: "ja",
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      profileVisible: true,
      activityTracking: false,
    },
  },
  organization: {
    theme: "light",
    language: "ja",
    notifications: {
      email: true,
      push: true,
      sms: true,
    },
    company: {
      autoPublishJobs: false,
      candidateAutoMatch: true,
    },
  },
  jobseeker: {
    theme: "dark",
    language: "ja",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    jobPreferences: {
      remoteWork: true,
      salaryRange: "400-600万円",
      location: "東京都",
    },
  },
};
