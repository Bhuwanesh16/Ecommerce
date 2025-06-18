
import Address from '@/components/shopping-view/address';
import image from '../../assets/image.png';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemContent from "@/components/shopping-view/cart-items-content";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { Navigate } from 'react-router-dom';


function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  

  console.log(currentSelectedAddress, "cartItems");

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

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed");

      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Please select one address to proceed.");

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "sangam");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;

// function ShoppingCheckout() {
//     const { cartItems } = useSelector((state) => state.shopCart);
//     const { user } = useSelector((state) => state.auth);
//     const [currentSelectedAddress,setCurrentSelectedAddress]=useState(null);
//     const [isPaymentStart,setIsPaymentStart]=useState(false);
//     const { approvalURL } = useSelector((state) => state.shopOrder);
//     const dispatch = useDispatch();

//     function handleInitiatePaypalPayment() {
//         const orderData = {

//             userId: user?.id,
//             cartId: cartItems?._id,
//             cartItems: cartItems.items.map(singleCartItem => ({
//                 productId: singleCartItem?.productId,
//                 title: singleCartItem?.title,
//                 image: singleCartItem?.image,
//                 price: singleCartItem?.salePrice > 0
//                     ? singleCartItem?.salePrice
//                     : singleCartItem?.price,
//                 quantity: singleCartItem?.quantity,
//             })),
//             addressInfo: {
//                 addressId: currentSelectedAddress?._id,
//                 address: currentSelectedAddress?.address,
//                 city: currentSelectedAddress?.city,
//                 pincode: currentSelectedAddress?.pincode,
//                 phone: currentSelectedAddress?.phone,
//                 notes: currentSelectedAddress?.notes,
//             },
//             orderStatus: "pending",
//             paymentMethod: "paypal",
//             paymentStatus: "pending",
//             totalAmount: totalCartAmount,
//             orderDate: new Date(),
//             orderUpdateDate: new Date(),
//             paymentId: "",
//             payerId: "",
//         }
//         console.log(orderData);
//         dispatch(createNewOrder(orderData)).then((data)=>{
//             console.log(data, "Data");
//             if(data?.payload?.success)
//             {
//                 setIsPaymentStart(true);
//             }
//             else{
//                 setIsPaymentStart(false);
//             }
//         })
//     }
//    if(approvalURL)
//    {
    
//     window.location.href=approvalURL;
//    }

//     const totalCartAmount =
//         cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.reduce(
//                 (sum, currentItem) =>
//                     sum +
//                     (currentItem?.salePrice > 0
//                         ? currentItem?.salePrice
//                         : currentItem?.price) *
//                     currentItem?.quantity,
//                 0
//             )
//             : 0;
//     return (
//         <div className='flex flex-col'>
//             <div className='relative h-[300px] w-full overflow-hidden'>
//                 <img
//                     src={image}
//                     className='h-full w-full object-cover object-center' />

//             </div>
//             <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
//                 <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
//                 <div className='flex flex-col gap-4'>
//                     {cartItems && cartItems.items && cartItems.items.length > 0
//                         ? cartItems.items.map((item) => (
//                             <UserCartItemsContent cartItem={item} />
//                         ))
//                         : null}
//                     <div className="mt-8 space-y-4">
//                         <div className="flex justify-between">
//                             <span className="font-bold">Total</span>
//                             <span className="font-bold mr-4">${totalCartAmount}</span>
//                         </div>
//                     </div>
//                     <div className='mt-4 w-full'>
//                         <Button onClick={handleInitiatePaypalPayment} className="cursor-pointer w-full">Checkout with Paypal</Button>
//                     </div>

//                 </div>

//             </div>

//         </div>
//     )
// }
// export default ShoppingCheckout;