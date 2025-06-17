import Layout from "@/components/layout";
import StaffListsPage from "@/features/stafflists/StaffListsPage";

export default function StaffLists() {
    return (
        <Layout
            adminName="花子 太郎"
            notificationCount={5}
        >
            <div className="container mx-auto sm:px-6 !p-0">
                <StaffListsPage />
            </div>
        </Layout>

    )

}