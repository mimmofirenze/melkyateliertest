import '../styles/ProductCard.css'

function ProductCard({ product, onClick }) {
  return (
    <article
      className="product-card"
      onClick={onClick}
    >
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p>€{product.price}</p>
      </div>
    </article>
  )
}

export default ProductCard