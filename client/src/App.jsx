import { useState } from 'react'

import Header from './components/Header'
import ShopHero from './components/ShopHero'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'

import './styles/CartToast.css'

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartMessage, setCartMessage] = useState('')

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })

    setCartMessage(product.name)

    setTimeout(() => {
      setCartMessage('')
    }, 2000)
  }

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
  }

  return (
    <>
      <Header
        cart={cart}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <ShopHero />

        <ProductGrid
          addToCart={addToCart}
        />
      </main>

      <Cart
        cart={cart}
        cartOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      {cartMessage && (
        <div className="cart-toast">
          <span className="cart-toast-check">
            ✓
          </span>

          <div>
            <strong>Aggiunto al carrello</strong>
            <p>{cartMessage}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App