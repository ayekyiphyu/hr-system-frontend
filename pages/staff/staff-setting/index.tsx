import Layout from "@/components/layout";
import StaffSettingPage from "@/features/staff-setting/StaffSettingPage";

export default function StaffSetting() {
    return (
        <Layout
            adminName="花子 太郎"
            notificationCount={5}
        >
            <div className="container mx-auto sm:px-6 !p-0">
                <StaffSettingPage />
            </div>
        </Layout>

    )

}