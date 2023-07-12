import { Product } from "../../../models/product"
import ProductList from "../../../features/catalog/ProductList";
import { useState, useEffect } from "react";
import agent from "../../../api/agent";
import Loading from "../../../common/Loading/Loading";

const  Catalog = () => {

  const [products,setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    agent.Product.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, []) // [] that meaning endless loop blocking

  if(loading) return <Loading message="Loading..."/>

  return (
    <>
    <ProductList products={products} />
    </>
  )
}

export default Catalog