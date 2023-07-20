import { Remove, Add, Delete } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material'
import { removeBasketItemAsync, addBasketItemAsync } from '../../../store/shopping-cart/basketSlice'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore'
import { BasketItem } from '../../../models/basket'

interface Props {
    items: BasketItem[];
    isBasket? : boolean;
}

const BasketTable = ({items, isBasket = true}:Props) => {
    const { status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
        <TableCell>Product</TableCell>
        <TableCell align="right">Price</TableCell>
        <TableCell align="center">Quantity</TableCell>
        <TableCell align="right">Subtotal</TableCell>
        {isBasket && 
        <TableCell align="right"></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {items?.map(item => (
                        <TableRow
                        key={item.productID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img style={{ height: 50, marginRight: 20 }} src={item.pictureURL} alt={item.name} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                        <TableCell align="center">
                            {isBasket &&
                                <LoadingButton
                                    loading={status === 'pendingRemoveItem' + item.productID + 'rem'}
                                    onClick={() => dispatch(removeBasketItemAsync({
                                        productID: item.productID, quantity: 1, name: 'rem'
                                    }))}
                                    color='error'>
                                    <Remove />
                                </LoadingButton>}
                            {item.quantity}
                            {isBasket &&
                                <LoadingButton
                                    loading={status === 'pendingAddItem' + item.productID}
                                    onClick={() => dispatch(addBasketItemAsync({ productID: item.productID }))}
                                    color='secondary'>
                                    <Add />
                                </LoadingButton>}
                        </TableCell>
                        <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                        {isBasket &&
                            <TableCell align="right">
                                <LoadingButton
                                    loading={status === 'pendingRemoveItem' + item.productID + 'del'}
                                    onClick={() => dispatch(removeBasketItemAsync({
                                        productID: item.productID, quantity: item.quantity, name: 'del'
                                    }))}
                                    color='error'>
                                    <Delete />
                                </LoadingButton>
                            </TableCell>}
                    </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  )
}

export default BasketTable