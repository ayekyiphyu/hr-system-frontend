import Layout from "@/components/layout";
import RegisterStaffPage from "@/features/register/RegisterStaffPage";

export default function register() {
    return (
        <>


            <Layout
                adminName="花子 太郎"
                notificationCount={5}
            >
                <div className="container mx-auto sm:px-6 !p-0">
                    <RegisterStaffPage />
                </div>
            </Layout>
        </>
    );
}