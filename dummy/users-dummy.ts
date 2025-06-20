export type UserType = "admin" | "user" | "organization" | "jobseeker";

// Test credentials for different user types
export const testCredentials = {
  admin: {
    email: "admin@example.com",
    password: "password123",
  },
  user: {
    email: "user@example.com",
    password: "password123",
  },
  organization: {
    email: "company@example.com",
    password: "password123",
  },
  jobseeker: {
    email: "jobseeker@example.com",
    password: "password123",
  },
};
