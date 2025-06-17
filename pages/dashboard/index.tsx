import Layout from "@/components/layout";
import DashboardPage from "@/features/dashboard/DashboardPage";

export default function Dashboard() {
    return (
        <>

            <Layout
                adminName="花子 太郎"
                notificationCount={5}
            >
                <div className="container mx-auto sm:px-6 !p-0">
                    <DashboardPage />
                </div>
            </Layout>

        </>
    )
}