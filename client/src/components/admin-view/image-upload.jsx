import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl,imageLoadingState, setImageLoadingState , isEditMode}) {
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
    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        const response=await axios.post('http://localhost:5000/api/admin/products/image-upload', data, { withCredentials: true });
        console.log(response, "response");
        if(response.data.success)
        {
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
        
        
    }

    useEffect(()=>{
        if(imageFile!==null)
            uploadImageToCloudinary();

    },[imageFile]);
    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={` ${ isEditMode ? " Opacity-70 text-primary  ": ""}border-2 border-lined border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors`}>
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode}/>
                {
                    !imageFile ?
                        (
                            <Label htmlFor="image-upload" className={`${ isEditMode ? "cursor-not-allowed" : " "}flex flex-col items-center justify-center h-32 `}>
                                <UploadCloudIcon className="w-10 h-10 text-muted-foreground " />
                                <span >Click or drag to upload</span>

                            </Label>
                        ) : (

                            imageLoadingState ? <Skeleton className='h-10 bg-gray-100'/> : 

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