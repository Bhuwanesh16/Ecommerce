import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={() => setCurrentSelectedAddress?.(addressInfo)}
      className={`cursor-pointer transition-all ${
        selectedId === addressInfo?._id
          ? "border-2 border-primary shadow-lg"
          : "border border-gray-200"
      }`}
    >
      <CardContent className="grid p-4 gap-2">
        <Label className="font-semibold">Address: {addressInfo?.address || "-"}</Label>
        <Label>City: {addressInfo?.city || "-"}</Label>
        <Label>Pincode: {addressInfo?.pincode || "-"}</Label>
        <Label>Phone: {addressInfo?.phone || "-"}</Label>
        {addressInfo?.notes && <Label>Notes: {addressInfo.notes}</Label>}
      </CardContent>
      <CardFooter className="p-3 flex justify-between gap-2">
        <Button 
          variant="outline" 
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button 
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;