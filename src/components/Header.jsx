import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useState } from 'react'

const Header = () => {
  const { getCartItemCount, openCartSidebar } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const cartItemCount = getCartItemCount()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Medusa Store</span>
              <div className="text-xs text-gray-500 -mt-1">Premium Tech</div>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Inicio
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Productos
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium flex items-center">
                Categorías
                <svg className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200">
                    📱 iPhone
                  </Link>
                  <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200">
                    💻 Mac
                  </Link>
                  <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200">
                    ⌚ Apple Watch
                  </Link>
                  <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200">
                    🎧 Audio
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/products" 
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Ofertas
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Heart size={20} />
            </button>

            {/* User Account */}
            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200">
              <User size={20} />
            </button>

            {/* Cart Icon */}
            <button 
              onClick={openCartSidebar}
              className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/products" 
                className="px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/products" 
                className="px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link 
                to="/products" 
                className="px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 