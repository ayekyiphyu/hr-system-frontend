import Drawer from "@/components/drawer";
import InvitationPage from "@/features/invitation/InvitationPage";

export default function StaffInvite() {
    return (
        <div className="flex flex-col min-h-screen">
            <Drawer />
            <div className="flex-1 pt-16 overflow-auto"> {/* Add padding for fixed header */}
                <InvitationPage />
            </div>
        </div>
    );
}