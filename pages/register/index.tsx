import MainHeader from "@/components/mainheader";
import RegisterPage from "@/features/register/RegisterPage";



export default function register() {
    return (
        <>
            <div>
                <MainHeader />
                <div className="container mx-auto sm:px-6 mt-30">
                    <RegisterPage />
                </div>
            </div>
        </>
    );
}