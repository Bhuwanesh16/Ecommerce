
import Address from '@/components/shopping-view/address';
import image from '../../assets/image.png';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

function ShoppingCheckout() {
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const { approvedURL}=useSelector((state)=>state.shopOrder);
    const dispatch=useDispatch();

    function handleInitiatePaypalPayment() {
        const orderData = {

            userId: user?.id,
            cartItems: cartItems.items.map(singleCartItem => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                price: singleCartItem?.salePrice > 0
                    ? singleCartItem?.salePrice
                    : singleCartItem?.price,
                quantity: singleCartItem?.quantity,
            })),
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        }
    }

    const totalCartAmount =
        cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.reduce(
                (sum, currentItem) =>
                    sum +
                    (currentItem?.salePrice > 0
                        ? currentItem?.salePrice
                        : currentItem?.price) *
                    currentItem?.quantity,
                0
            )
            : 0;
    return (
        <div className='flex flex-col'>
            <div className='relative h-[300px] w-full overflow-hidden'>
                <img
                    src={image}
                    className='h-full w-full object-cover object-center' />

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
                <Address />
                <div className='flex flex-col gap-4'>
                    {cartItems && cartItems.items && cartItems.items.length > 0
                        ? cartItems.items.map((item) => (
                            <UserCartItemsContent cartItem={item} />
                        ))
                        : null}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold mr-4">${totalCartAmount}</span>
                        </div>
                    </div>
                    <div className='mt-4 w-full'>
                        <Button onClick={handleInitiatePaypalPayment} className="cursor-pointer w-full">Checkout with Paypal</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default ShoppingCheckout;