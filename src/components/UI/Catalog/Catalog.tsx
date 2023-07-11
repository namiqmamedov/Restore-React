import { Product } from "../../../models/product"
import ProductList from "../../../features/catalog/ProductList";
import { useState, useEffect } from "react";

const  Catalog = () => {

  const [products,setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/product')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, []) // [] that meaning endless loop blocking


  return (
    <>
    <ProductList products={products} />
    </>
  )
}

export default Catalog