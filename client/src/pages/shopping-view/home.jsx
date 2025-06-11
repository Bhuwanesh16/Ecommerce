import { Button } from "@/components/ui/button";
import banner1 from "../../assets/image.png";
import banner2 from "../../assets/image1.png";
import banner3 from "../../assets/image2.png";
import banner4 from "../../assets/image3.png";
import banner5 from "../../assets/image4.png";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, FootprintsIcon, Shirt, ShirtIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function ShoppingHome() {
  const slides = [banner1, banner2, banner3, banner4, banner5];
  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: Shirt },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: FootprintsIcon },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden ">
        {
          slides.map((slide, index) => <img
            src={slide}
            index={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />)
        }
        <Button variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className="w-4 h-4" />

        </Button>
        <Button variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
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
                // onClick={() =>
                //   handleNavigateToListingPage(categoryItem, "category")
                // }
                className="cursor-pointer hover:shadow-lg transition-translate"
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
    </div>
  )
}
export default ShoppingHome;