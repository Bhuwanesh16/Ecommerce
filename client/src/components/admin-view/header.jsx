import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen })
{

    const dispatch=useDispatch();
    function handleLogout(){
        dispatch(logoutUser());
    }

    return(
        <header className="flex item-center justify-between px-4 py-6 bg-background border-b">
            <Button onClick={()=> setOpen(true)} className="justify-start lg:hidden sm:block cursor-pointer">
                <Menu />
                <span className="sr-only">Toggle only</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button onClick={handleLogout} className="inline-flex gap-2  cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    )
}
export default AdminHeader;