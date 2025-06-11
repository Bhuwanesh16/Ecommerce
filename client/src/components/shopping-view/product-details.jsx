
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";



function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth);

    function handleAddToCart(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product added to Cart Successfully");
            }
        });
    }

    function handleDialogClose()
    {
        setOpen(false);
        dispatch(setProductDetails());
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-4 sm:p-10 max-w-[40vw] sm:max-w-[40vw] lg:max-w-[50vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={300}
                        height={300}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="grid gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                                }`}
                        >
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button className="cursor-pointer w-full" onClick={() => handleAddToCart(productDetails?._id)}>Add to Cart</Button>
                    </div>
                    <Separator />
                    <div className="max-h-[200px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Review</h2>
                        <div className="grid gap-4">
                            <div className="flex gap-3">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>MB</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Bhuwanesh M</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>

                                    <p className="text-muted-foreground">This is an awesome product</p>
                                </div>

                            </div>
                        </div>
                        <div className="mt-6 flex gap-1">
                            <Input placeholder="Write a review..." />
                            <Button>Submit</Button>

                        </div>
                    </div>
                </div>

            </DialogContent>

        </Dialog>
    )
}
export default ProductDetailsDialog;