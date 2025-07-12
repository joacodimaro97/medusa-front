import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, TrendingUp, Zap, Shield, Truck, Clock, Users, Award, ShoppingBag } from 'lucide-react'
import { getProducts } from '../services/medusa'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { products } = await getProducts(8)
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="space-y-12">
      {/* Hero Section Mejorado */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="relative px-8 py-20 md:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  <TrendingUp size={16} className="mr-2" />
                  <span>🔥 Ofertas Especiales - Hasta 50% OFF</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Tecnología
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    de Vanguardia
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 text-primary-100 leading-relaxed">
                  Descubre la última tecnología Apple con precios increíbles. 
                  Envío gratis y garantía extendida en todos los productos.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/products" 
                    className="group bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Explorar Productos</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/cart" 
                    className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm hover:backdrop-blur-none"
                  >
                    <ShoppingBag size={20} />
                    <span>Ver Carrito</span>
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-primary-200">Clientes Satisfechos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-primary-200">Soporte Técnico</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-primary-200">Garantía</div>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-4">🎉</div>
                      <h3 className="text-xl font-semibold mb-2">Oferta Especial</h3>
                      <p className="text-gray-300 mb-4">iPhone 15 Pro</p>
                      <div className="text-3xl font-bold text-white">€1,199</div>
                      <div className="text-sm text-gray-300 line-through">€1,399</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Mejorado */}
      <section className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia de compra con garantías únicas y servicios premium
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Truck size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Envío Gratis</h3>
            <p className="text-gray-600">En pedidos superiores a 50€ con entrega en 24h</p>
          </div>
          
          <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Garantía Extendida</h3>
            <p className="text-gray-600">2 años de garantía en todos los productos Apple</p>
          </div>
          
          <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Soporte Premium</h3>
            <p className="text-gray-600">Asistencia técnica especializada 24/7</p>
          </div>
          
          <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Devolución Gratuita</h3>
            <p className="text-gray-600">30 días para cambiar de opinión sin preguntas</p>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explora por Categoría
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra exactamente lo que buscas en nuestras categorías especializadas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/products" className="group">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">iPhone</h3>
              <p className="text-gray-300">Los últimos modelos</p>
            </div>
          </Link>
          
          <Link to="/products" className="group">
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Mac</h3>
              <p className="text-gray-300">Portátiles y de escritorio</p>
            </div>
          </Link>
          
          <Link to="/products" className="group">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">⌚</div>
              <h3 className="text-xl font-semibold mb-2">Apple Watch</h3>
              <p className="text-gray-300">Salud y fitness</p>
            </div>
          </Link>
          
          <Link to="/products" className="group">
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-semibold mb-2">Audio</h3>
              <p className="text-gray-300">AirPods y más</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
            <Zap size={16} className="mr-2" />
            <span>🔥 OFERTAS LIMITADAS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Descuentos Especiales
          </h2>
          <p className="text-xl text-gray-300">
            Aprovecha estas ofertas antes de que se agoten
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">iPhone 15 Pro</h3>
              <div className="text-3xl font-bold mb-2">€1,199</div>
              <div className="text-gray-300 line-through mb-4">€1,399</div>
              <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                -14% OFF
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">MacBook Air M2</h3>
              <div className="text-3xl font-bold mb-2">€1,199</div>
              <div className="text-gray-300 line-through mb-4">€1,499</div>
              <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                -20% OFF
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-semibold mb-2">AirPods Pro</h3>
              <div className="text-3xl font-bold mb-2">€249</div>
              <div className="text-gray-300 line-through mb-4">€299</div>
              <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                -17% OFF
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/products" 
            className="inline-flex items-center bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            <span>Ver Todas las Ofertas</span>
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Productos Destacados</h2>
            <p className="text-lg text-gray-600">Los productos más populares de nuestros clientes</p>
          </div>
          <Link 
            to="/products" 
            className="text-black hover:text-gray-700 font-semibold flex items-center space-x-2"
          >
            <span>Ver todos</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Mejorado */}
      <section className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
            <Users size={16} className="mr-2" />
            <span>+10,000 Clientes Satisfechos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600">
            Descubre por qué miles de clientes confían en nosotros
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              "Excelente calidad y envío súper rápido. El iPhone 15 Pro llegó perfecto y el soporte post-venta es increíble. Definitivamente volveré a comprar aquí."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center text-white font-semibold mr-4">
                MG
              </div>
              <div>
                <p className="font-semibold text-gray-900">María García</p>
                <p className="text-sm text-gray-500">Cliente Verificado</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              "La atención al cliente es increíble y los productos son exactamente como se describen. El MacBook Air M2 superó todas mis expectativas."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center text-white font-semibold mr-4">
                CL
              </div>
              <div>
                <p className="font-semibold text-gray-900">Carlos López</p>
                <p className="text-sm text-gray-500">Cliente Verificado</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              "Precios competitivos y una experiencia de compra muy fluida. Los AirPods Pro son perfectos y la garantía extendida me da total tranquilidad."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center text-white font-semibold mr-4">
                AM
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ana Martínez</p>
                <p className="text-sm text-gray-500">Cliente Verificado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Award size={16} className="mr-2" />
            <span>EXCLUSIVO PARA SUSCRIPTORES</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¡No te pierdas las mejores ofertas!
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas, descuentos especiales y las últimas novedades en tecnología Apple.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
              Suscribirse
            </button>
          </div>
          
          <p className="text-sm text-gray-300 mt-4">
            🔒 Tu privacidad está protegida. No compartimos tu información.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home 