import { Grid, List } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../store/configureStore";
import ProductCardSkeleton from "../../components/UI/ProductCardSkeleton/ProductCardSkeleton";

interface Props {
    products?: Product[];
}

export default function ProductList({products} : Props){
    const {productsLoaded} = useAppSelector(state => state.product)
    return (
        <List>
            <Grid container spacing={4}>
                {products?.map(product => (
                    <Grid item xs={4} key={product.id}>
                        {!productsLoaded ? (
                            <ProductCardSkeleton/>
                        ) : (
                            <ProductCard product={product} />
                        )}
                    </Grid>
                ))}
            </Grid>
     </List>
    )
}