import { configureStore } from '@reduxjs/toolkit'
import products from './products'
import order from './order'

export const store = configureStore({
  reducer: {products,order},
})