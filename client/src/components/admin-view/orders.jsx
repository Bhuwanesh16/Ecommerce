import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrdersDetailView from "./order-details";



function AdminOrdersView()
{
    return(
    <Card>
        <CardHeader>
            <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>123456</TableCell>
                            <TableCell>15/06/2025</TableCell>
                            <TableCell>In Process</TableCell>
                            <TableCell>$1000</TableCell>
                            <TableCell>
                                <Button onClick={()=>{AdminOrdersDetailView()}}>View Details</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>

    </Card>
    );
}
export default AdminOrdersView;