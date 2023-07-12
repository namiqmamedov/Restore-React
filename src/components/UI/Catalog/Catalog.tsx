import { Product } from "../../../models/product"
import ProductList from "../../../features/catalog/ProductList";
import { useState, useEffect } from "react";
import agent from "../../../api/agent";

const  Catalog = () => {

  const [products,setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Product.list().then(products => setProducts(products))
  }, []) // [] that meaning endless loop blocking


  return (
    <>
    <ProductList products={products} />
    </>
  )
}

export default Catalog