import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemContent from "./cart-items-content";



function UserCartWrapper({cartItems, setOpenCartSheet})
{
    const navigate=useNavigate();
    const totalCartAmount=cartItems && cartItems.length>0 ?
    cartItems.reduce((sum,currentItem)=>sum+
      (currentItem.salePrice>0 ? currentItem?.salePrice : currentItem?.price )* currentItem?.quantity,0):0;
    return(
        <SheetContent className="sm:max-w-md mx-auto">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-4 ml-5 space-y-4">
                {
                    cartItems && cartItems.length>0 ?
                    cartItems.map(item=><UserCartItemContent cartItem={item}/>) : null
                }
            </div>
            <div className="mt-4 ml-5 mr-5 space-y-4">
                <div className="flex justify-between mx-auto">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <Button onClick={()=>{
                navigate('/shop/checkout')
                setOpenCartSheet(false);
                }} className="w-full justify-center item-center mr-5 mt-6 cursor-pointer rounded-lg">Checkout</Button>
        </SheetContent>
    )
}
export default UserCartWrapper;