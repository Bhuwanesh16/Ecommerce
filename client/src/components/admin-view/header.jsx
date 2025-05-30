import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({ setOpen })
{
    return(
        <header className="flex item-center justify-between px-4 py-6 bg-background border-b">
            <Button onClick={()=> setOpen(true)} className="justify-start lg:hidden sm:block">
                <Menu />
                <span className="sr-only">Toggle only</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2  cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    )
}
export default AdminHeader;