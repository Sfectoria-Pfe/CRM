import React from 'react'
import {Outlet} from "react-router-dom"
export default function Product() {
  return (
    <div>
     <h1>You are in the product</h1>
     <Outlet/>
    </div>
  )
}