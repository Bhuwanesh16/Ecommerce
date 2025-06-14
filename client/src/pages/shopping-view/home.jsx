import { Button } from "@/components/ui/button";
import banner1 from "../../assets/image5.png";
import banner2 from "../../assets/image1.png";
import banner3 from "../../assets/image2.png";
import banner4 from "../../assets/image3.png";
import banner5 from "../../assets/image4.png";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, FootprintsIcon, Shirt, ShirtIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GiRunningShoe } from "react-icons/gi";
import { IoMan, IoWoman } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { SiNike, SiPuma, SiZara } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import { FaEdgeLegacy } from "react-icons/fa";
import { RiAttachmentFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToCart } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: IoMan },
  { id: "women", label: "Women", icon: IoWoman },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: GiRunningShoe  },
];
const  brandsWithIcon = [
    { id: "nike", label: "Nike", icon : SiNike},
    { id: "adidas", label: "Adidas",icon : CgAdidas },
    { id: "puma", label: "Puma" , icon : SiPuma },
    { id: "levi", label: "Levi's",icon : FaEdgeLegacy},
    { id: "zara", label: "Zara" ,icon : SiZara },
    { id: "h&m", label: "H&M" ,icon : RiAttachmentFill },
  ];
function ShoppingHome() {
  const [currentSlide,setCurrentSlide]=useState(0);
  const {productList, productDetails}=useSelector((state)=>state.shopProducts);
  const { user } =useSelector((state)=>state.auth);
    const [openDetailsDialog,setOpenDetailsDialog]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const slides = [banner1, banner2, banner3, banner4, banner5];

  function handleNavigateToListingPage(getCurrentItem, section)
  {
    sessionStorage.removeItem('filters');
    const currentFilter={
      [section]:[getCurrentItem.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate(`/shop/listing`)

  }

  function handleGetProductDetails(getCurrentProductId)
     {
      console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId));
  
     }
  
     function handleAddtoCart(getCurrentProductId)
     {
      console.log(getCurrentProductId);
      dispatch(addToCart({userId : user?.id,productId : getCurrentProductId,quantity :1})
       ).then((data)=>{
          if(data?.payload?.success)
          {
              dispatch(fetchCartItems(user?.id));
              toast.success("Product added to Cart Successfully");
          }
       });
     }

     useEffect(()=>{
       if(productDetails!==null)
        setOpenDetailsDialog(true);
    },[productDetails])
  

  useEffect(()=>{
    const timer=setInterval(()=>{setCurrentSlide((prevSlide)=>(prevSlide + 1 )%slides.length)},5000)

    return()=> clearInterval(timer);
  },[]);

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams : 'price-lowtohigh'}))
  },[dispatch]);

  console.log(productList,'productList');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden ">
        {
          slides.map((slide, index) => <img
            src={slide}
            index={index}
             className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />)
        }
        <Button
         variant="outline" size="icon"
         onClick={()=>setCurrentSlide(prevSlide=>(prevSlide - 1 + slides.length)%slides.length)}
         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className="w-4 h-4" />

        </Button>
        <Button 
        variant="outline" size="icon" 
         onClick={()=>setCurrentSlide(nextSlide=>(nextSlide + 1 + slides.length)%slides.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
          <ChevronRightIcon className="w-4 h-4" />

        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:translate-x-2 transition-transform position-sticky"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(brandItem, "brand")
                }
                className="cursor-pointer hover:translate-x-2 transition-transform  position-sticky"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
           Feature Products
          </h2>
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {
              productList && productList.length>0 ?
              productList.map(productItem=>
              <ShoppingProductTile
              handleGetProductDetails={handleGetProductDetails}
               product={productItem}
               handleAddtoCart={handleAddtoCart}/>
            ) : null
            }

          </div>
          </div>
          </section>
           <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}
export default ShoppingHome;