import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import '../styles/ProductGrid.css'

function ProductGrid({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('tutti')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const desc = `Hey amico questa merda spacca. Si proprio cosi' fai 
  come mimmo l'esibitore ed assicurati questo articolo prima che vada esaurito. Amico questa e'
  merda di qualita' capito non e' robetta cinese che trovi su shein.`

  const products = [
    {
      id: 1,
      name: 'Vestito Rosa',
      price: 89,
      category: 'abiti',
      image: '/shop/images/vestitoRosa.webp',
      description: desc,
    },
    {
      id: 2,
      name: 'Borsa Melky',
      price: 59,
      category: 'accessori',
      image: '/shop/images/borsa.webp',
      description: desc,
    },
    {
      id: 3,
      name: 'Set Intimo',
      price: 49,
      category: 'intimo',
      image: '/shop/images/intimoBlu.webp',
      description: desc,
    },
    {
      id: 4,
      name: 'Vestito Lungo',
      price: 119,
      category: 'abiti',
      image: '/shop/images/vestitoNero.webp',
      description: desc,
    },
    {
      id: 5,
      name: 'Vestito giallo',
      price: 109,
      category: 'abiti',
      image: '/shop/images/vestitoGiallo.webp',
      description: desc,
    },
    {
      id: 6,
      name: 'Borsa Mimmo',
      price: 89,
      category: 'accessori',
      image: '/shop/images/borsaRosa.webp',
      description: desc,
    },
    {
      id: 7,
      name: 'Set Intimo ecco Mimmo',
      price: 79,
      category: 'intimo',
      image: '/shop/images/intimoRosa.webp',
      description: desc,
    },
    {
      id: 8,
      name: 'Vestito Mimmo esibitore',
      price: 149,
      category: 'abiti',
      image: '/shop/images/vestito.webp',
      description: desc,
    },
  ]

  const filteredProducts =
    selectedCategory === 'tutti'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        )

  return (
    <section className="shop-products">
      <div className="category-selector">
        <button
          className={selectedCategory === 'tutti' ? 'active' : ''}
          onClick={() => setSelectedCategory('tutti')}
        >
          Tutti
        </button>

        <button
          className={selectedCategory === 'abiti' ? 'active' : ''}
          onClick={() => setSelectedCategory('abiti')}
        >
          Abiti
        </button>

        <button
          className={selectedCategory === 'accessori' ? 'active' : ''}
          onClick={() => setSelectedCategory('accessori')}
        >
          Accessori
        </button>

        <button
          className={selectedCategory === 'intimo' ? 'active' : ''}
          onClick={() => setSelectedCategory('intimo')}
        >
          Intimo
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}
    </section>
  )
}

export default ProductGrid
