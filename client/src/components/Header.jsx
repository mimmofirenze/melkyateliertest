import { useEffect, useState } from 'react'
import '../styles/Header.css'

function Header({ cart, onCartClick  }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.pageYOffset

      if (currentScroll > lastScroll) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
    )

  return (
    <header>
      <div
        className={`top-navbar
          ${scrolled ? 'scrolled' : ''}
          ${menuOpen ? 'menu-open' : ''}
        `}
      >
        <div className="top-navbar-left">
          <a href="/" className="top-navbar-logo">
            <img
              src="/images/melkyatelierlogo.png"
              alt="Melky Atelier logo"
            />
          </a>
        </div>

        <nav
          className={`top-navbar-menu ${menuOpen ? 'open' : ''}`}
          id="menu"
        >
          <ul className="lato-regular">
            <li>
              <a href="/#bio">Bio</a>
            </li>

            <li>
              <a href="/#galleria">Galleria</a>
            </li>

            <li>
              <a href="/shop">Shop</a>
            </li>

            <li>
              <a href="/#su-misura">Su misura</a>
            </li>

            <li>
              <a href="/#contatti">Contatti</a>
            </li>
          </ul>
        </nav>

        <div className="top-navbar-right">
          <button
            className="top-navbar-cart"
            type="button"
            onClick={onCartClick}
            aria-label="Apri carrello"
            >
            <img
                src="/images/shoppingbag.png"
                className="cart-icon normal"
                alt=""
            />

            <img
                src="/images/shoppingbag-hover.png"
                className="cart-icon hover"
                alt=""
            />

            {cartQuantity > 0 && (
                <span className="cart-count">
                {cartQuantity}
                </span>
            )}
            </button>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            id="hamburger"
            type="button"
            aria-label="Apri menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header