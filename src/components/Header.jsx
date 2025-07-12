import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useState } from 'react'

const Header = () => {
  const { getCartItemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemCount = getCartItemCount()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Medusa Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Productos
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-black transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-black transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 