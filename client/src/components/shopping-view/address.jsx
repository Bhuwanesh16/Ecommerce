import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, fetchAllAddress, updateAddress } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";


const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

    function Address({ setCurrentSelectedAddress, selectedId }) {
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
   

    function handleManageAddress(event) {
        event.preventDefault();
        
        if(addressList.length >=3 && currentEditedId===null)
        {
          setFormData(initialAddressFormData);
          toast.error("You can't add more than 3 addresses");
          return;
        }



        currentEditedId!==null?
        dispatch(updateAddress({userId :user?.id, addressId :currentEditedId, formData:formData})).then((data)=>{
          if(data?.payload?.success)
          {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address Updated Successfully");
          }
        })
        :dispatch(
            addNewAddress({
                ...formData,
                userId: user?.id,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                setFormData(initialAddressFormData);
                console.log(formData);
                toast.success( "Address added successfully");
                
            }
        });
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
            deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                toast.success("Address deleted successfully");
                
            }
        });
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id));
    }, [dispatch]);

    

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((singleAddressItem) => (
                        <AddressCard
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                            selectedId={selectedId}
                            handleDeleteAddress={handleDeleteAddress}
                            addressInfo={singleAddressItem}
                            handleEditAddress={handleEditAddress}
                            
                        />
                    ))
                    : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {currentEditedId !== null ? "Edit Address" : "Add New Address"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Edit" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
}

export default Address;