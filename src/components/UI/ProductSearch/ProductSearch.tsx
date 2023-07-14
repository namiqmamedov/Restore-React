import { TextField, debounce } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../store/configureStore"
import { setProductParams } from "../../../store/shopping-cart/productSlice";
import { useState } from "react";

const ProductSearch = () => {
    const {productParams} = useAppSelector(state => state.product)
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm)
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)

  return (
    <TextField
    label='Search products'
    variant='outlined'
    fullWidth
    value={searchTerm || ''}
    onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
    }}
  />
  )
}

export default ProductSearch