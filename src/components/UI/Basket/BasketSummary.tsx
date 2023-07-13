import { TableContainer, Paper, TableRow, TableCell, TableBody } from '@mui/material';
import { Table } from 'react-bootstrap';
import { useStoreContext } from '../../../context/StoreContext';
import { currencyFormat } from '../../../util/util';

const BasketSummary = () => {
    const {basket} = useStoreContext();
    const subtotal = basket?.items.reduce((sum,item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 1000 ? 0 : 500;

  return (
    <>
       <TableContainer component={Paper}>
        <Table>
          <TableBody>
          <TableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Delivery fee*</TableCell>
            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>*Orders over $100 qualify for free delivery</TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BasketSummary