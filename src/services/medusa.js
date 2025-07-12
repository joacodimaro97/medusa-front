import Medusa from "@medusajs/medusa-js"
import { mockProductAPI, mockCartAPI } from './mockData.js'

// Configuración del cliente de Medusa
const MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"

// Variable para controlar si usar datos reales o ficticios
const USE_MOCK_DATA = !import.meta.env.VITE_MEDUSA_BACKEND_URL || import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const medusaClient = USE_MOCK_DATA ? null : new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})

// Funciones helper para productos
export const getProducts = async (limit = 20, offset = 0) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockProductAPI.getProducts(limit, offset)
    }
    
    const { products, count } = await medusaClient.products.list({
      limit,
      offset,
    })
    return { products, count }
  } catch (error) {
    console.error('Error fetching products:', error)
    // Fallback a datos ficticios si hay error
    return await mockProductAPI.getProducts(limit, offset)
  }
}

export const getProduct = async (id) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockProductAPI.getProduct(id)
    }
    
    const { product } = await medusaClient.products.retrieve(id)
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    // Fallback a datos ficticios si hay error
    return await mockProductAPI.getProduct(id)
  }
}

// Funciones helper para carrito
export const createCart = async () => {
  try {
    if (USE_MOCK_DATA) {
      return await mockCartAPI.createCart()
    }
    
    const { cart } = await medusaClient.carts.create()
    return cart
  } catch (error) {
    console.error('Error creating cart:', error)
    // Fallback a datos ficticios si hay error
    return await mockCartAPI.createCart()
  }
}

export const addToCart = async (cartId, variantId, quantity = 1) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockCartAPI.addToCart(cartId, variantId, quantity)
    }
    
    const { cart } = await medusaClient.carts.lineItems.create(cartId, {
      variant_id: variantId,
      quantity,
    })
    return cart
  } catch (error) {
    console.error('Error adding to cart:', error)
    // Fallback a datos ficticios si hay error
    return await mockCartAPI.addToCart(cartId, variantId, quantity)
  }
}

export const updateCartItem = async (cartId, lineItemId, quantity) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockCartAPI.updateCartItem(cartId, lineItemId, quantity)
    }
    
    const { cart } = await medusaClient.carts.lineItems.update(cartId, lineItemId, {
      quantity,
    })
    return cart
  } catch (error) {
    console.error('Error updating cart item:', error)
    // Fallback a datos ficticios si hay error
    return await mockCartAPI.updateCartItem(cartId, lineItemId, quantity)
  }
}

export const removeFromCart = async (cartId, lineItemId) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockCartAPI.removeFromCart(cartId, lineItemId)
    }
    
    const { cart } = await medusaClient.carts.lineItems.delete(cartId, lineItemId)
    return cart
  } catch (error) {
    console.error('Error removing from cart:', error)
    // Fallback a datos ficticios si hay error
    return await mockCartAPI.removeFromCart(cartId, lineItemId)
  }
}

export const getCart = async (cartId) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockCartAPI.getCart(cartId)
    }
    
    const { cart } = await medusaClient.carts.retrieve(cartId)
    return cart
  } catch (error) {
    console.error('Error fetching cart:', error)
    // Fallback a datos ficticios si hay error
    return await mockCartAPI.getCart(cartId)
  }
} 