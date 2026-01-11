import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
    userName: "",
    email: "",
    password: "",
    role: "user"

}
function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message || "Success"); // prefer toast.success

            } else {
                toast.error(data?.payload?.message || "Something went wrong");
            }

            console.log(data);
        }).catch((err) => {
            console.error('Login action failed:', err);
            toast.error(err?.message || 'Something went wrong during login');
        })

    }

    return (
        <div className="mx-auto w-full max-w-md space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                <p className="mt-2">Don't have an account
                    <Link className="text-primary ml-2 font-medium hover:underline" to="/auth/register">Register</Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={"Sign In"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthLogin;