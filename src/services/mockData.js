// Datos ficticios para simular la API de Medusa

export const mockProducts = [
  {
    id: "prod_1",
    title: "iPhone 15 Pro",
    description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y diseño en titanio. Disponible en varios colores y capacidades.",
    handle: "iphone-15-pro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
      },
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_1",
        title: "128GB - Natural Titanio",
        prices: [{ amount: 119900 }]
      },
      {
        id: "var_2", 
        title: "256GB - Natural Titanio",
        prices: [{ amount: 129900 }]
      },
      {
        id: "var_3",
        title: "512GB - Natural Titanio", 
        prices: [{ amount: 149900 }]
      }
    ]
  },
  {
    id: "prod_2",
    title: "MacBook Air M2",
    description: "Portátil ultraligero con chip M2, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería.",
    handle: "macbook-air-m2",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_4",
        title: "8GB RAM - 256GB SSD",
        prices: [{ amount: 129900 }]
      },
      {
        id: "var_5",
        title: "8GB RAM - 512GB SSD",
        prices: [{ amount: 149900 }]
      }
    ]
  },
  {
    id: "prod_3",
    title: "AirPods Pro",
    description: "Auriculares inalámbricos con cancelación activa de ruido, audio espacial y resistencia al agua.",
    handle: "airpods-pro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_6",
        title: "Estándar",
        prices: [{ amount: 27900 }]
      }
    ]
  },
  {
    id: "prod_4",
    title: "iPad Air",
    description: "Tablet versátil con chip M1, pantalla Liquid Retina de 10.9 pulgadas y compatibilidad con Apple Pencil.",
    handle: "ipad-air",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_7",
        title: "64GB - WiFi",
        prices: [{ amount: 69900 }]
      },
      {
        id: "var_8",
        title: "256GB - WiFi",
        prices: [{ amount: 89900 }]
      }
    ]
  },
  {
    id: "prod_5",
    title: "Apple Watch Series 9",
    description: "Reloj inteligente con monitor cardíaco, GPS y hasta 18 horas de batería. Disponible en varios tamaños.",
    handle: "apple-watch-series-9",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca359?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_9",
        title: "41mm - Aluminio",
        prices: [{ amount: 39900 }]
      },
      {
        id: "var_10",
        title: "45mm - Aluminio",
        prices: [{ amount: 42900 }]
      }
    ]
  },
  {
    id: "prod_6",
    title: "iMac 24\"",
    description: "Todo en uno con chip M3, pantalla Retina 4.5K y siete colores vibrantes para elegir.",
    handle: "imac-24",
    images: [
      {
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_11",
        title: "8GB RAM - 256GB SSD",
        prices: [{ amount: 149900 }]
      },
      {
        id: "var_12",
        title: "8GB RAM - 512GB SSD",
        prices: [{ amount: 169900 }]
      }
    ]
  },
  {
    id: "prod_7",
    title: "Magic Keyboard",
    description: "Teclado inalámbrico con diseño minimalista, teclas de tijera y hasta un mes de batería.",
    handle: "magic-keyboard",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_13",
        title: "Español",
        prices: [{ amount: 9900 }]
      },
      {
        id: "var_14",
        title: "Inglés",
        prices: [{ amount: 9900 }]
      }
    ]
  },
  {
    id: "prod_8",
    title: "HomePod mini",
    description: "Altavoz inteligente con Siri, audio de 360 grados y control de accesorios domóticos.",
    handle: "homepod-mini",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_15",
        title: "Blanco",
        prices: [{ amount: 9900 }]
      },
      {
        id: "var_16",
        title: "Gris Espacial",
        prices: [{ amount: 9900 }]
      }
    ]
  }
]

// Función para simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Simular API de productos
export const mockProductAPI = {
  async getProducts(limit = 20, offset = 0) {
    await delay(500) // Simular delay de red
    const products = mockProducts.slice(offset, offset + limit)
    return {
      products,
      count: mockProducts.length
    }
  },

  async getProduct(id) {
    await delay(300)
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }
    return product
  }
}

// Simular API de carrito
export const mockCartAPI = {
  async createCart() {
    await delay(200)
    return {
      id: `cart_${Date.now()}`,
      items: [],
      subtotal: 0,
      total: 0,
      shipping_total: 0,
      tax_total: 0
    }
  },

  async addToCart(cartId, variantId, quantity = 1) {
    await delay(300)
    const variant = mockProducts
      .flatMap(p => p.variants)
      .find(v => v.id === variantId)
    
    if (!variant) {
      throw new Error('Variante no encontrada')
    }

    const product = mockProducts.find(p => 
      p.variants.some(v => v.id === variantId)
    )

    const newItem = {
      id: `item_${Date.now()}`,
      title: product.title,
      quantity,
      unit_price: variant.prices[0].amount,
      variant: {
        id: variant.id,
        title: variant.title,
        product: {
          title: product.title,
          images: product.images
        }
      }
    }

    return {
      id: cartId,
      items: [newItem],
      subtotal: newItem.unit_price * quantity,
      total: newItem.unit_price * quantity,
      shipping_total: 0,
      tax_total: 0
    }
  },

  async updateCartItem(cartId, lineItemId, quantity) {
    await delay(300)
    // Simular actualización del carrito
    return {
      id: cartId,
      items: [],
      subtotal: 0,
      total: 0,
      shipping_total: 0,
      tax_total: 0
    }
  },

  async removeFromCart(cartId, lineItemId) {
    await delay(300)
    // Simular eliminación del carrito
    return {
      id: cartId,
      items: [],
      subtotal: 0,
      total: 0,
      shipping_total: 0,
      tax_total: 0
    }
  },

  async getCart(cartId) {
    await delay(200)
    // Simular carrito vacío
    return {
      id: cartId,
      items: [],
      subtotal: 0,
      total: 0,
      shipping_total: 0,
      tax_total: 0
    }
  }
} 