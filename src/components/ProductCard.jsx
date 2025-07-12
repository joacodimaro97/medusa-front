import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (product.variants && product.variants.length > 0) {
      await addItemToCart(product.variants[0].id, 1)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price / 100)
  }

  const getFirstImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url
    }
    return 'https://via.placeholder.com/300x300?text=Sin+Imagen'
  }

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={getFirstImage()}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
                  <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-black transition-colors duration-200">
              {product.title}
            </h3>
          </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.variants && product.variants.length > 0 && (
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.variants[0].prices[0]?.amount)}
              </span>
            )}
            {product.variants && product.variants.length > 1 && (
              <span className="text-xs text-gray-500">
                +{product.variants.length - 1} variantes
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center space-x-2"
            disabled={!product.variants || product.variants.length === 0}
          >
            <ShoppingCart size={16} />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 