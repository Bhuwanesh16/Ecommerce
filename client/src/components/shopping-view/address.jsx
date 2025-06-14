import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, fetchAllAddress } from "@/store/shop/address-slice";
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  async function handleManageAddress(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      );

      if (result?.payload?.success) {
        await dispatch(fetchAllAddress(user?.id));
        setFormData(initialAddressFormData);
        setCurrentEditedId(null);
        toast.success(currentEditedId ? "Address updated successfully" : "Address added successfully");
      }
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteAddress(getCurrentAddress) {
    try {
      const result = await dispatch(
        deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
      );

      if (result?.payload?.success) {
        await dispatch(fetchAllAddress(user?.id));
        toast.success("Address deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete address");
    }
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address || "",
      city: getCurrentAddress?.city || "",
      phone: getCurrentAddress?.phone || "",
      pincode: getCurrentAddress?.pincode || "",
      notes: getCurrentAddress?.notes || "",
    });
  }

  function isFormValid() {
    return (
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.pincode.trim() !== ""
    );
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddress(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              addressInfo={singleAddressItem}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              selectedId={selectedId}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-4 text-gray-500">
            No addresses found. Add your first address!
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Update" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid() || isLoading}
        />
      </CardContent>
    </Card>
  );
}

export default Address;