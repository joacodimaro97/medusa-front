import { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'
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
    case 'TOGGLE_CART_SIDEBAR':
      return { ...state, isCartOpen: action.payload }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    loading: false,
    error: null,
    isCartOpen: false
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
      toast.error('Error al crear el carrito')
    }
  }

  const addItemToCart = async (variantId, quantity = 1) => {
    if (!state.cart) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedCart = await addToCart(state.cart.id, variantId, quantity)
      dispatch({ type: 'SET_CART', payload: updatedCart })
      
      // Mostrar toast de éxito más sutil
      toast.success('Producto añadido al carrito', {
        duration: 2000,
        icon: '✓',
      })
      
      // NO abrir automáticamente el carrito - dejar que el usuario decida
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      toast.error('Error al añadir el producto')
    }
  }

  const updateCartItemQuantity = async (lineItemId, quantity) => {
    if (!state.cart) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedCart = await updateCartItem(state.cart.id, lineItemId, quantity)
      dispatch({ type: 'SET_CART', payload: updatedCart })
      
      if (quantity === 0) {
        toast.success('Producto eliminado', { duration: 2000 })
      } else {
        toast.success('Cantidad actualizada', { duration: 1500 })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      toast.error('Error al actualizar la cantidad')
    }
  }

  const removeItemFromCart = async (lineItemId) => {
    if (!state.cart) return

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedCart = await removeFromCart(state.cart.id, lineItemId)
      dispatch({ type: 'SET_CART', payload: updatedCart })
      toast.success('Producto eliminado', { duration: 2000 })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      toast.error('Error al eliminar el producto')
    }
  }

  const clearCart = () => {
    localStorage.removeItem('cartId')
    dispatch({ type: 'CLEAR_CART' })
    toast.success('Carrito vaciado', { duration: 2000 })
  }

  const getCartItemCount = () => {
    if (!state.cart?.items) return 0
    return state.cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    if (!state.cart?.total) return 0
    return state.cart.total / 100 // Convertir de centavos a la moneda principal
  }

  const toggleCartSidebar = (isOpen) => {
    dispatch({ type: 'TOGGLE_CART_SIDEBAR', payload: isOpen })
  }

  const openCartSidebar = () => {
    dispatch({ type: 'TOGGLE_CART_SIDEBAR', payload: true })
  }

  const closeCartSidebar = () => {
    dispatch({ type: 'TOGGLE_CART_SIDEBAR', payload: false })
  }

  const value = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    isCartOpen: state.isCartOpen,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    clearCart,
    getCartItemCount,
    getCartTotal,
    toggleCartSidebar,
    openCartSidebar,
    closeCartSidebar
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