import { createContext, useContext, useReducer, useEffect } from 'react'
import { createCart, addToCart, updateCartItem, removeFromCart, getCart } from '../services/medusa'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_CART':
      return { ...state, cart: null, loading: false }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    loading: false,
    error: null
  })

  // Inicializar carrito al cargar la aplicación
  useEffect(() => {
    const initCart = async () => {
      const savedCartId = localStorage.getItem('cartId')
      
      if (savedCartId) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true })
          const cart = await getCart(savedCartId)
          dispatch({ type: 'SET_CART', payload: cart })
        } catch (error) {
          // Si el carrito guardado no existe, crear uno nuevo
          await createNewCart()
        }
      } else {
        await createNewCart()
      }
    }

    initCart()
  }, [])

  const createNewCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const cart = await createCart()
      localStorage.setItem('cartId', cart.id)
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const addItemToCart = async (variantId, quantity = 1) => {
    if (!state.cart) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedCart = await addToCart(state.cart.id, variantId, quantity)
      dispatch({ type: 'SET_CART', payload: updatedCart })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const updateCartItemQuantity = async (lineItemId, quantity) => {
    if (!state.cart) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedCart = await updateCartItem(state.cart.id, lineItemId, quantity)
      dispatch({ type: 'SET_CART', payload: updatedCart })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const removeItemFromCart = async (lineItemId) => {
    if (!state.cart) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedCart = await removeFromCart(state.cart.id, lineItemId)
      dispatch({ type: 'SET_CART', payload: updatedCart })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const clearCart = () => {
    localStorage.removeItem('cartId')
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartItemCount = () => {
    if (!state.cart?.items) return 0
    return state.cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    if (!state.cart?.total) return 0
    return state.cart.total / 100 // Convertir de centavos a la moneda principal
  }

  const value = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    clearCart,
    getCartItemCount,
    getCartTotal
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 