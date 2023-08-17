import ProductList from "../../../features/catalog/ProductList";
import Loading from "../../../common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { setPageNumber, setProductParams } from "../../../store/shopping-cart/productSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "../ProductSearch/ProductSearch";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import CheckboxButtons from "../CheckboxButtons/CheckboxButtons";
import AppPagination from "../AppPagination/AppPagination";
import useProducts from "../../../hooks/useProducts";


const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'},
]

const  Catalog = () => {
  const {products,filtersLoaded,brands,types,metaData} = useProducts()
  const {productParams} = useAppSelector(state => state.product)
  const dispatch = useAppDispatch();

  if(!filtersLoaded) return <Loading message="Loading..." />

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb: 2}}>
        <ProductSearch/>
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
          />
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
        <CheckboxButtons
          items={brands}
          checked={productParams.brands}
          onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
        />
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
        <CheckboxButtons
          items={types}
          checked={productParams.types}
          onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
        />
        </Paper>
      </Grid>
      <Grid item xs={9}>
      <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{mb: 2}}>
        {metaData && 
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) =>
              dispatch(setPageNumber({pageNumber: page}))}
            />}
      </Grid>
    </Grid>
  )
}

export default Catalog