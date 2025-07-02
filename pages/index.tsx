import MainHeader from "@/components/mainheader";
import LoginPage from "@/features/login/LoginPage";

export default function Home() {
    return (
        <>
            <div>
                <MainHeader />
                <div className="container mx-auto sm:px-6 !p-0">
                    <LoginPage />
                </div>
            </div>
        </>
    )
}