// Now your StaffInvite page becomes much simpler:

import Layout from "@/components/layout";
import InvitationPage from "@/features/invitation/InvitationPage";

export default function StaffInvite() {
    return (
        <Layout
            adminName="花子 太郎"
            notificationCount={5}
        >
            <div className="container mx-auto sm:px-6 !p-0">
                <InvitationPage />
            </div>
        </Layout>


    );
}