import Layout from "@/components/layout";
import DashboardPage from "@/features/organization/dashboard/DashboardPage";

export default function Dashboard() {
    return (
        <>

            <Layout

            >
                <div className="container mx-auto sm:px-6 !p-0">
                    <DashboardPage />
                </div>
            </Layout>

        </>
    )
}