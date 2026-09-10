const express = require('express')
const path = require('path')

const app = express()

// Normal website
app.use(express.static(path.join(__dirname, 'public')))

// React shop build
app.use(
  '/shop',
  express.static(path.join(__dirname, 'client', 'dist'))
)

// Homepage
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  )
})

// React shop
app.get('/shop', (req, res) => {
  res.redirect('/shop/')
})

app.get('/shop/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'client', 'dist', 'index.html')
  )
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
