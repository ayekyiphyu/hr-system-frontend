// User role types
export type UserRole = "admin" | "user" | "organization" | "jobseeker";

// Authentication related types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  isAdmin: boolean;
  isUser: boolean;
  isOrganization: boolean;
  isJobseeker: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// API Response types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// for drawer menu
export interface HeaderProps {
  adminName?: string;
  adminAvatar?: string;
  adminRole?: string;
  notificationCount?: number;
  onNavigate?: (page: string) => void; // New: navigation callback
  currentPage?: string; // New: current active page
}

export interface MenuItem {
  title: string;
  icon: any; // Lucide icon component
  href?: string;
  pageKey?: string; // New: for internal page navigation
  onClick?: () => void; // New: for custom click handlers
  badge?: string;
  children?: MenuItem[];
}

//inviation
export interface InvitationFormData {
  emails: string;
  role: UserRole | "";
  message?: string;
}

//for staff-lists

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}
