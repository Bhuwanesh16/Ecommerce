import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl }) {
    const inputRef = useRef(null);
    function handleImageFileChange(event) {
        console.log(event.target.files, "event.target.files");
        const selectedFile = event.target.files?.[0];
        console.log(selectedFile);

        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    console.log(imageFile);
    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-lined border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange} />
                {
                    !imageFile ?
                        (
                            <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 ">
                                <UploadCloudIcon className="w-10 h-10 text-muted-foreground " />
                                <span >Click or drag to upload</span>

                            </Label>
                        ) : (
                            <div className="flex items-center justify-center h-32">
                                <div className="flex items-center">
                                    <FileIcon className="w-8 h-8 mr-2 text-primary" />
                                </div>
                                <p className="text-primary font-medium">{imageFile.name}</p>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                    <XIcon className="w-4 h-4" />
                                    <span className="sr-only">Remove Files</span>
                                </Button>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
export default ProductImageUpload;