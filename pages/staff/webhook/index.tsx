
import Layout from "@/components/layout";
import WebhookPage from "@/features/webhook/WebhookPage";

export default function WebHook() {
    return (
        <Layout
            adminName="花子 太郎"
            notificationCount={5}
        >
            <div className="container mx-auto sm:px-6 !p-0">
                <WebhookPage />
            </div>
        </Layout>


    );
}