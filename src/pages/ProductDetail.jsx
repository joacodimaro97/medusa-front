import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react'
import { getProduct } from '../services/medusa'
import { useCart } from '../contexts/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addItemToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const productData = await getProduct(id)
      setProduct(productData)
      if (productData.variants && productData.variants.length > 0) {
        setSelectedVariant(productData.variants[0])
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addItemToCart(selectedVariant.id, quantity)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price / 100)
  }

  const getFirstImage = () => {
    if (product?.images && product.images.length > 0) {
      return product.images[0].url
    }
    return 'https://via.placeholder.com/600x600?text=Sin+Imagen'
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Producto no encontrado
        </h2>
        <Link to="/products" className="btn-primary">
          Volver a productos
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/" className="hover:text-black">Inicio</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-black">Productos</Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={getFirstImage()}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Additional Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(4.8)</span>
              </div>
              <span className="text-sm text-gray-500">
                SKU: {product.handle}
              </span>
            </div>
          </div>

          {/* Price */}
          {selectedVariant && selectedVariant.prices && selectedVariant.prices.length > 0 && (
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(selectedVariant.prices[0].amount)}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Variantes</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 border rounded-lg text-left ${
                      selectedVariant?.id === variant.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{variant.title}</div>
                    {variant.prices && variant.prices.length > 0 && (
                      <div className="text-sm text-gray-600">
                        {formatPrice(variant.prices[0].amount)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Cantidad:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Agregar al Carrito</span>
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>✓ Envío gratis en pedidos superiores a 50€</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>✓ Garantía de 30 días</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>✓ Devolución gratuita</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 