import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../models/product";
import agent from "../api/agent";
import NotFound from "../errors/NotFound";
import Loading from "../common/Loading/Loading";

const ProductDetails = () => {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null)
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        id && agent.Product.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [id]) // Bir bağımlılık belirttiğimiz (id) durumda,
            // kullanım efekti bileşen bağlandığında çağrılacak
            // ve ayrıca bağımlılığın (id) parametresi değişirse bnile tekrar çağrılacaktır.

    if(loading) return <Loading/>
    
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
      </Grid>
    </Grid>
  )
}

export default ProductDetails