
import { Dialog, DialogContent } from "../ui/dialog";



function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[60vw] sm:max-w-[50vw] lg:max-w-[40vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={300}
                        height={300}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="grid gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description}
                        </p>
                    </div>
                </div>

            </DialogContent>

        </Dialog>
    )
}
export default ProductDetailsDialog;