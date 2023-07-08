import ClientOnly from "@/components/ClientOnly";
import SignUpForm from "./components/sign-up-form";

const SignUp = () => {
    return (
        <ClientOnly>
            <div className="w-full h-full flex justify-center items-center">
                <SignUpForm />
            </div>
        </ClientOnly>

    );
}

export default SignUp;