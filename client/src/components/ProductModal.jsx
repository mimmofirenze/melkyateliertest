import '../styles/ProductModal.css'

function ProductModal({ product, onClose, addToCart }) {
  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="product-modal-close"
          type="button"
          onClick={onClose}
        >
          ×
        </button>

        <div className="product-modal-content">
          <div className="product-modal-info lato-regular">
            <h2>{product.name}</h2>

            <p className="product-modal-price">
              €{product.price}
            </p>

            <p className="product-modal-description">
              {product.description}
            </p>

            <button
              className="product-modal-cart"
              type="button"
              onClick={() => addToCart(product)}
            >
              Aggiungi al carrello
            </button>
          </div>

          <div className="product-modal-gallery">
            <div className="product-main-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="product-secondary-images">
              <img
                src={product.image2 || product.image}
                alt={`${product.name} dettaglio`}
              />

              <img
                src={product.image3 || product.image}
                alt={`${product.name} dettaglio`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal