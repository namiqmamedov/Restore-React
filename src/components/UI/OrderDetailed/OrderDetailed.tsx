import { Box, Typography, Button, Grid } from "@mui/material";
import BasketTable from "../BasketTable/BasketTable";
import BasketSummary from "../Basket/BasketSummary";
import { Order } from "../../../models/order";
import { BasketItem } from "../../../models/basket";


interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus}</Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Back to orders</Button>
            </Box>
            {/* sepette yaptığımız sipariş ürününde tüm özelliklere sahip değiliz bu yüzden as kullanıyoruz */}
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />  
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    )
}