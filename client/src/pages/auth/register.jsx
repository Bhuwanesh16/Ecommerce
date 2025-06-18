import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"



const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    // Create clean payload object
    const cleanPayload = {
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      password: formData.password // Don't trim password
    };

    // Debug before sending
    console.log("Sending payload:", cleanPayload);

    dispatch(registerUser(cleanPayload))
      .then((result) => {
        if (result.payload?.success) {
          toast.success("Registration successful!");
          navigate("/login");
        } else if (result.error) {
          toast.error(result.error.payload?.message || "Registration failed");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error("An error occurred during registration");
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;