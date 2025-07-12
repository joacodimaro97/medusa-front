import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, Star, Zap, Shield, Truck, ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'

const ProductCard = ({ product, index = 0 }) => {
  // Estados individuales para cada carta
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)

  const { addItemToCart, loading: globalLoading } = useCart()

  // Memoizar datos calculados para evitar recálculos innecesarios
  const productData = useMemo(() => {
    const firstVariant = product.variants?.[0]
    const firstVariantId = firstVariant?.id
    const price = firstVariant?.prices?.[0]?.amount
    
    // Datos simulados para cada producto individual
    const rating = 4.5 + (Math.random() * 0.5) // 4.5 - 5.0
    const reviewCount = Math.floor(Math.random() * 300) + 50
    const isNew = Math.random() > 0.7
    const isOnSale = Math.random() > 0.8
    const originalPrice = price ? Math.floor(price * 1.15) : null
    const isOutOfStock = Math.random() > 0.95
    const discountPercentage = isOnSale ? Math.floor(Math.random() * 30) + 10 : 0

    return {
      firstVariant,
      firstVariantId,
      price,
      rating: rating.toFixed(1),
      reviewCount,
      isNew,
      isOnSale,
      originalPrice,
      isOutOfStock,
      discountPercentage
    }
  }, [product])

  // Formatear precio
  const formatPrice = useCallback((price) => {
    if (!price) return 'Precio no disponible'
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price / 100)
  }, [])

  // Obtener imagen con fallback
  const getImage = useCallback((index = 0) => {
    if (product.images && product.images.length > index) {
      return product.images[index].url
    }
    return 'https://via.placeholder.com/400x400?text=Sin+Imagen'
  }, [product.images])

  // Handlers individuales
  const handleWishlist = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(prev => !prev)
    toast.success(isWishlisted ? 'Eliminado de favoritos' : 'Añadido a favoritos')
  }, [isWishlisted])

  const handleImageHover = useCallback(() => {
    if (product.images && product.images.length > 1) {
      setImageIndex(1)
    }
  }, [product.images])

  const handleImageLeave = useCallback(() => {
    setImageIndex(0)
  }, [])

  const handleAddToCart = useCallback(async () => {
    if (!productData.firstVariantId || productData.isOutOfStock || isAddingToCart || globalLoading) {
      return
    }

    setIsAddingToCart(true)
    try {
      await addItemToCart(productData.firstVariantId, 1)
      toast.success('Producto añadido al carrito')
    } catch (error) {
      toast.error('Error al añadir al carrito')
    } finally {
      setIsAddingToCart(false)
    }
  }, [productData.firstVariantId, productData.isOutOfStock, isAddingToCart, globalLoading, addItemToCart])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setShowQuickActions(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setShowQuickActions(false)
  }, [])

  // Animaciones individuales
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  }

  const quickActionsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <AnimatePresence>
          {productData.isNew && (
            <motion.div
              key="new"
              className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              NUEVO
            </motion.div>
          )}
          {productData.isOnSale && (
            <motion.div
              key="sale"
              className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              -{productData.discountPercentage}%
            </motion.div>
          )}
          {productData.isOutOfStock && (
            <motion.div
              key="outofstock"
              className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              AGOTADO
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        {/* Wishlist Button */}
        <motion.button
          onClick={handleWishlist}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-200 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </motion.button>

        {/* Quick View Button */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              variants={quickActionsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/products/${product.id}`}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 block"
              >
                <Eye size={18} className="text-gray-600 hover:text-blue-600" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Image Container */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <motion.img
            src={getImage(imageIndex)}
            alt={product.title}
            className="w-full h-full object-cover"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            variants={imageVariants}
            initial="initial"
            whileHover="hover"
            transition={{ duration: 0.3 }}
          />
          
          {/* Image Gallery Dots */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.slice(0, 3).map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                />
              ))}
            </div>
          )}

          {/* Stock Status Overlay */}
          {productData.isOutOfStock && (
            <motion.div 
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-gray-800 font-semibold">Agotado</span>
              </div>
            </motion.div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
            {product.collection?.title || 'Categoría'}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">{productData.rating}</span>
            <span className="text-xs text-gray-400">({productData.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Truck size={12} />
            <span>Envío gratis</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={12} />
            <span>Garantía</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={12} />
            <span>Rápido</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {productData.price && (
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(productData.price)}
                </span>
              )}
              {productData.isOnSale && productData.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(productData.originalPrice)}
                </span>
              )}
            </div>
            
            {product.variants && product.variants.length > 1 && (
              <span className="text-xs text-gray-500 mt-1">
                +{product.variants.length - 1} variantes disponibles
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            disabled={!productData.firstVariantId || productData.isOutOfStock || isAddingToCart || globalLoading}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              productData.isOutOfStock || !productData.firstVariantId
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
            }`}
            whileHover={!productData.isOutOfStock && productData.firstVariantId ? { scale: 1.02 } : {}}
            whileTap={!productData.isOutOfStock && productData.firstVariantId ? { scale: 0.98 } : {}}
          >
            <motion.div
              animate={isAddingToCart ? { rotate: 360 } : {}}
              transition={{ duration: 0.6, repeat: isAddingToCart ? Infinity : 0 }}
            >
              <ShoppingCart size={16} />
            </motion.div>
            <span>
              {productData.isOutOfStock 
                ? 'Agotado' 
                : isAddingToCart 
                  ? 'Añadiendo...' 
                  : 'Agregar'
              }
            </span>
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

export default ProductCard 