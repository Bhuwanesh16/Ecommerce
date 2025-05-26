import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState={
   userName:"",
    email:"",
    password:""
    
}
function AuthRegister()
{
    const [formdata,setFormData]=useState(initialState);
    function onSubmit()
    {

    }
    return(
        <div className="mx-auto w-full max-w-md space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
                <p className="mt-2">Already have an account
                    <Link className="text-primary ml-2 font-medium hover:underline" to="/auth/login">Login</Link>
                </p>
            </div>
             <CommonForm 
            formControls={registerFormControls}
            buttonText={'Sign In'}
            formdata={formdata}
            setFormData={setFormData}
            onSubmit={onSubmit}
            /> 
        </div>
    )
}

export default AuthRegister;