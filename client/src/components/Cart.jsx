import '../styles/Cart.css'

function Cart({
  cart,
  cartOpen,
  onClose,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <div
      className={`cart-backdrop ${
        cartOpen ? 'open' : ''
      }`}
      onClick={onClose}
    >
      <aside
        className={`cart-panel ${
          cartOpen ? 'open' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Carrello</h2>

          <button
            className="cart-close"
            type="button"
            onClick={onClose}
            aria-label="Chiudi carrello"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Il tuo carrello è vuoto.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article
                  className="cart-item"
                  key={item.id}
                >
                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h3>{item.name}</h3>

                      <p>
                        €{(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    <p className="cart-single-price">
                      €{item.price.toFixed(2)} cad.
                    </p>

                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="cart-remove"
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotale</span>

                <strong>
                  €{subtotal.toFixed(2)}
                </strong>
              </div>

              <p className="cart-shipping-note">
                Spedizione calcolata al checkout.
              </p>

              <button
                className="cart-checkout"
                type="button"
              >
                Vai al checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default Cart