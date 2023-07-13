import {Avatar, CardHeader } from "@mui/material";
import { Product } from "../../models/product";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../context/StoreContext";
import { currencyFormat } from "../../util/util";

interface Props { 
    product: Product;
}

export default function ProductCard({product} : Props){
  const [loading,setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productID: number){
    setLoading(true);
    agent.Basket.addItem(productID)
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }

    return (
      <Card>
        <CardHeader 
          avatar={
            <Avatar sx={{bgcolor: 'secondary.main'}}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: {fontWeight: 'bold',  
            color: 'primary.main'}
          }}
        />
      <CardMedia
        sx={{ height: 140,
               backgroundSize: 'contain',
              bgcolor: 'primary.light' }}
        image={product.pictureURL}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton  loading={loading} onClick={() => handleAddItem(product.id)} size="small" >Add to cart</LoadingButton>
        <Button component={Link} to={`/product/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}