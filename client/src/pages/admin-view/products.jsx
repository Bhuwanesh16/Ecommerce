import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, fetchAllProduct } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
};

function AdminProducts() {
    const [openProductModal, setOpenProductModal] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);


    const { productList } = useSelector(state => state.adminProducts || {});

    const dispatch = useDispatch();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image: uploadedImageUrl,
        })).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAllProduct());
                setOpenProductModal(false);
                setImageFile(null);
                setFormData(initialFormData);
                toast.success("Product added successfully");
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    console.log(productList, uploadedImageUrl, "productList");

    return (
        <Fragment>
            <div className="flex mb-5 w-full justify-end">
                <Button
                    onClick={() => setOpenProductModal(true)}
                    className="bg-primary cursor-pointer text-white w-40 hover:bg-primary/90"
                >
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                {
                    productList && productList.length > 0 ?
                        productList.map(productItem => <AdminProductTile product={productItem} />) : null

                }
            </div>
            <Sheet
                open={openProductModal}
                onOpenChange={() => setOpenProductModal(false)}
            >
                <SheetContent side="right" className="overflow-auto px-4 py-6 space-y-2">
                    <SheetHeader>
                        <SheetTitle className="text-center text-lg font-bold">
                            Add New Product
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />
                    <div>
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Add"
                            formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;