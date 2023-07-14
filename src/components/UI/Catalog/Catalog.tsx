import ProductList from "../../../features/catalog/ProductList";
import { useEffect } from "react";
import Loading from "../../../common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { fetchProductsAsync, productSelectors } from "../../../store/shopping-cart/productSlice";

const  Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded,status} = useAppSelector(state => state.product)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded]) // [] that meaning endless loop blocking

   if(status.includes('pending')) return <Loading message="Loading..."/>

  return (
    <>
    <ProductList products={products} />
    </>
  )
}

export default Catalog