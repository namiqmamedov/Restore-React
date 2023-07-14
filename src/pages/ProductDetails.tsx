import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NotFound from "../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../store/shopping-cart/basketSlice";
import { fetchProductAsync, productSelectors } from "../store/shopping-cart/productSlice";
import Loading from "../common/Loading/Loading";

const ProductDetails = () => {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch() 
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!))
    const {status: productStatus} = useAppSelector(state => state.product)
    const [quantity,setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productID === product?.id);

    useEffect(() => {
      if(item) setQuantity(item.quantity)
      if(!product) dispatch(fetchProductAsync(parseInt((!product && id!))))
    }, [id,item,dispatch,product]) 
            // Bir bağımlılık belirttiğimiz (id) durumda,
            // kullanım efekti bileşen bağlandığında çağrılacak
            // ve ayrıca bağımlılığın (id) parametresi değişirse bnile tekrar çağrılacaktır.

    function handleInputChange(event:any){
      if(event.target.value >= 0){
        setQuantity(parseInt(event.target.value));
      }
    }

    function handleUpdateCart(){
      if(!item || quantity > item.quantity){
          const updatedQuantity = item ? quantity - item.quantity : quantity
          dispatch(addBasketItemAsync({productID: product?.id!, quantity: updatedQuantity}))
      }
      else{
        const updatedQuantity = item.quantity - quantity;
        dispatch(removeBasketItemAsync({productID: product?.id!,quantity: updatedQuantity}))
      }
    }

     if(productStatus.includes('pending')) return <Loading/>
    
    if(!product) return <NotFound/>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
          <img src={product.pictureURL} alt={product.name} style={{width: '100%'}} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">
          {product.name}
        </Typography>
        <Divider sx={{mb: 2}} />  
        <Typography variant="h3" color='secondary'>
          {(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField onChange={handleInputChange} variant="outlined" type="number" label='Quantity in Cart' fullWidth value={quantity} />
          </Grid>
          <Grid item xs={6}>
              <LoadingButton
              disabled={item?.quantity === quantity || !item && quantity === 0}
              loading={status.includes('pendingRemoveItem' + item?.productID)}
              onClick={handleUpdateCart}
                sx={{height: '55px'}}
                color="primary"
                size='large'
                variant='contained'
                fullWidth
              >
                {item ? 'Update Quantity' : 'Add to Cart'}
              </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductDetails