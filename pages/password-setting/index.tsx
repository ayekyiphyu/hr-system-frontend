
import Layout from "@/components/layout";
import PasswordSettingPage from "@/features/password/PasswordSettingPage";


export default function PasswordSetting() {
    return (
        <>

            <Layout
                adminName="花子 太郎"
                notificationCount={5}
            >
                <div className="container mx-auto sm:px-6 !p-0">
                    <PasswordSettingPage />
                </div>
            </Layout>
        </>
    )
}