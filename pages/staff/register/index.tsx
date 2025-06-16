
import Drawer from "@/components/drawer";
import RegisterPage from "@/features/register/RegisterPage";


export default function register() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Drawer />
                <div className="flex-1 pt-16 overflow-auto">
                    <RegisterPage />
                </div>
            </div>
        </>
    );
}