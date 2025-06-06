import { Card } from "../ui/card";

function ShoppingProductTile({product})
{
    return(
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"/>

                </div>
            </div>

        </Card>

    );
}
export default ShoppingProductTile;