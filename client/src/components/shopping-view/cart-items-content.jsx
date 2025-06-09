import {  Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";






function UserCartItemContent({ cartItem }) {
    const{user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    function handleUpdateQuantity(getCartItem,typeOfAction)
    {
        dispatch(updateCartItems({userId:user?.id,productId: getCartItem?.id,quantity:
            typeOfAction=== 'plus' ? getCartItem?.quantity+1 : getCartItem?.quantity-1
        })).then((data)=>{
            if(data?.payload?.success)
            {
                toast.success("Cart is updated successfully");
            }
        })
    }

    function handleCartItemDelete(getCartItem)
    {
        dispatch(deleteCartItems({userId: user?.id,productId: getCartItem?.productId})).then(
            (data)=>{
                if(data?.payload?.success)
                {
                    toast.success("Cart item deleted successfully");
                }
            }
        )
    }
    return (
        <div className="flex items-center space-x-4">
            <img
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        size="icon"
                        disabled={cartItem?.quantity === 1}
                        onClick={() => handleUpdateQuantity(cartItem, "minus")}
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        size="icon"
                        disabled={cartItem?.quantity === 1}
                        onClick={() => handleUpdateQuantity(cartItem, "plus")}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end mr-5">
                <p className="font-semibold">
                    $
                    {(
                        (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
                        cartItem?.quantity
                    ).toFixed(2)}
                </p>
                <Trash
                    onClick={() => handleCartItemDelete(cartItem)}
                    className="cursor-pointer mt-1"
                    size={20}
                />
               
            </div>
        </div>
    )
}
export default UserCartItemContent;