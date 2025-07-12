import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const { 
    cart, 
    loading, 
    updateCartItemQuantity, 
    removeItemFromCart, 
    getCartTotal 
  } = useCart()

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

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex space-x-4 p-4 border rounded-lg">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-8">
          Parece que aún no has agregado ningún producto a tu carrito.
        </p>
        <Link to="/products" className="btn-primary">
          Continuar Comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="card p-6">
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={getItemImage(item)}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.variant?.title}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(item.unit_price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-gray-600 hover:text-black flex items-center space-x-1"
                  >
                    <Trash2 size={16} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Subtotal: {formatPrice(item.unit_price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4">
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

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cart.total || 0)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Link
                to="/checkout"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/products"
                className="btn-secondary w-full text-center"
              >
                Continuar Comprando
              </Link>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Información de Envío
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>✓ Envío gratis en pedidos superiores a 50€</p>
                <p>✓ Entrega en 2-3 días hábiles</p>
                <p>✓ Devolución gratuita</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 