import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { productSelectors, fetchProductsAsync, fetchFilters } from "../store/shopping-cart/productSlice";

const useProducts = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded,filtersLoaded,brands,types,metaData} = useAppSelector(state => state.product)
    const dispatch = useAppDispatch();
    
  
    useEffect(() => {
      if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded,dispatch]) // [] that meaning endless loop blocking
  
    useEffect(() => {
      if(!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch,filtersLoaded])


  return (
    {products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData
}
  )
}

export default useProducts