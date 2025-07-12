import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useEffect } from 'react'

const CartSidebar = () => {
  const { 
    cart, 
    loading, 
    isCartOpen,
    updateCartItemQuantity, 
    removeItemFromCart, 
    getCartTotal,
    closeCartSidebar
  } = useCart()

  // Prevenir scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }

    return () => {
      document.body.classList.remove('sidebar-open')
    }
  }, [isCartOpen])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price / 100)
  }

  const getItemImage = (item) => {
    if (item.variant?.product?.images && item.variant.product.images.length > 0) {
      return item.variant.product.images[0].url
    }
    return 'https://via.placeholder.com/100x100?text=Sin+Imagen'
  }

  // Overlay para cerrar el carrito al hacer clic fuera
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCartSidebar()
    }
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="cart-sidebar-overlay"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Sidebar */}
          <motion.div 
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Carrito de Compras
                </h2>
                <button
                  onClick={closeCartSidebar}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-6 space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex space-x-3 animate-pulse">
                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !cart || !cart.items || cart.items.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Añade algunos productos para empezar
                    </p>
                    <button
                      onClick={closeCartSidebar}
                      className="btn-primary"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex space-x-3 pb-4 border-b border-gray-100">
                        {/* Product Image */}
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={getItemImage(item)}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">
                            {item.variant?.title}
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.unit_price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 py-1 text-sm border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItemFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 flex items-center space-x-1 transition-colors"
                          >
                            <Trash2 size={12} />
                            <span className="text-xs">Eliminar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart && cart.items && cart.items.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cart.items.length} productos)</span>
                      <span>{formatPrice(cart.subtotal || 0)}</span>
                    </div>

                    {cart.shipping_total > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Envío</span>
                        <span>{formatPrice(cart.shipping_total)}</span>
                      </div>
                    )}

                    {cart.tax_total > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Impuestos</span>
                        <span>{formatPrice(cart.tax_total)}</span>
                      </div>
                    )}

                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(cart.total || 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      onClick={closeCartSidebar}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <span>Proceder al Checkout</span>
                      <ArrowRight size={16} />
                    </Link>

                    <button
                      onClick={closeCartSidebar}
                      className="btn-secondary w-full"
                    >
                      Continuar Comprando
                    </button>
                  </div>

                  {/* Shipping Info */}
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Envío gratis en pedidos superiores a 50€</p>
                    <p>✓ Entrega en 2-3 días hábiles</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar 