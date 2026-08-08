import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../lib/useProducts'
import ProductCard from '../components/ProductCard'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const { products } = useProducts()
  const { addItem } = useCart()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">😔</p>
        <h2 className="text-xl font-semibold text-gray-800">Product not found</h2>
        <Link to="/products" className="text-saffron-600 hover:underline mt-2 inline-block">Browse all products</Link>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAdd = () => {
    addItem(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-saffron-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-saffron-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-[400px] object-cover" />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-saffron-400">{'★'.repeat(Math.floor(product.rating))}</div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">&#8377;{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through ml-3">&#8377;{product.originalPrice}</span>
                <span className="text-sm text-green-600 font-medium ml-2">Save &#8377;{product.originalPrice - product.price}</span>
              </>
            )}
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span> Authentic & Certified
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span> Energized with Vedic Mantras
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span> Free Shipping above &#8377;499
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span> 7-Day Easy Returns
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAdd}
              className="flex-1 bg-saffron-500 hover:bg-saffron-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={handleAdd}
              className="flex-1 border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
