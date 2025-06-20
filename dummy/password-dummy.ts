import { AuthResponse, LoginCredentials, User, UserRole } from "@/type/type";
import {
  dummyNotifications,
  dummyPageTitles,
  dummySettings,
  dummyUserProfiles,
} from "./profiles-dummy";
import { testCredentials, UserType } from "./users-dummy";

// Helper function to create user role flags
const createUserRoleFlags = (role: UserRole) => ({
  isAdmin: role === "admin",
  isUser: role === "user",
  isOrganization: role === "organization",
  isJobseeker: role === "jobseeker",
});

// Dummy user data
export const dummyUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "管理者",
    role: "admin",
    ...createUserRoleFlags("admin"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-10"),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "田中太郎",
    role: "user",
    ...createUserRoleFlags("user"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: "3",
    email: "company@example.com",
    name: "株式会社テスト",
    role: "organization",
    ...createUserRoleFlags("organization"),
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    id: "4",
    email: "jobseeker@example.com",
    name: "佐藤花子",
    role: "jobseeker",
    ...createUserRoleFlags("jobseeker"),
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-05-15"),
  },
];

// Dummy login function - simulates API call
export const dummyLogin = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { email, password } = credentials;

  // Find user by email
  const user = dummyUsers.find((u) => u.email === email);

  if (!user) {
    return {
      success: false,
      message: "メールアドレスまたはパスワードが正しくありません。",
    };
  }

  // Simple password check (in real app, this would be hashed)
  if (password === "password123") {
    return {
      success: true,
      message: "ログインに成功しました",
      user,
      token: `dummy-jwt-token-${user.id}-${Date.now()}`,
    };
  } else {
    return {
      success: false,
      message: "パスワードが正しくありません",
    };
  }
};

// Dummy forgot password function
export const dummyForgotPassword = async (
  email: string
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = dummyUsers.find((u) => u.email === email);

  if (!user) {
    return {
      success: false,
      message: "そのメールアドレスは登録されていません",
    };
  }

  return {
    success: true,
    message: "パスワードリセットのメールを送信しました",
  };
};

// Helper function to get user data by email
export function getUserByEmail(email: string) {
  const userType = Object.entries(testCredentials).find(
    ([_, cred]) => cred.email === email
  )?.[0] as UserType | undefined;

  if (!userType) return null;

  return {
    userType,
    profile: dummyUserProfiles[userType],
    notifications: dummyNotifications[userType],
    settings: dummySettings[userType],
    pageTitles: dummyPageTitles[userType],
  };
}

// Helper function to get notification count
export function getNotificationCount(userType: UserType): number {
  return dummyNotifications[userType].filter((notif) => !notif.isRead).length;
}

// Helper function to simulate login
export function simulateLogin(email: string, password: string) {
  const credentials = Object.values(testCredentials).find(
    (cred) => cred.email === email && cred.password === password
  );

  if (!credentials) {
    return { success: false, error: "Invalid credentials" };
  }

  const userData = getUserByEmail(email);
  return {
    success: true,
    user: userData,
  };
}
