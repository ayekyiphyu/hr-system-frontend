import Layout from "@/components/layout";
import OrganizationListPage from "@/features/organization/organization-lists/OrganizationLists";

export default function OrganizationLists() {
    return (
        <>

            <Layout

            >
                <div className="container mx-auto sm:px-6 !p-0">
                    <OrganizationListPage />
                </div>
            </Layout>

        </>
    )
}