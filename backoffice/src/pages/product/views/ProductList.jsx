import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../../store/products'

export default function ProductList() {
  const products = useSelector((state) => state.products.products.items)
  const dispatch = useDispatch()
useEffect(()=>{
dispatch(fetchProducts())
},[dispatch])
console.log(products,"state");
  return (
    <div>
      product list
    </div>
  )
}