import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import '../styles/ProductGrid.css'

function ProductGrid({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('tutti')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const desc = `desc.`

  const products = [
    
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