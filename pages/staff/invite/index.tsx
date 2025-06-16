// Now your StaffInvite page becomes much simpler:

import Layout from "@/components/layout";
import InvitationPage from "@/features/invitation/InvitationPage";

export default function StaffInvite() {
    return (
        <Layout
            adminName="カスタム管理者"
            notificationCount={5}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <InvitationPage />
            </div>
        </Layout>


    );
}