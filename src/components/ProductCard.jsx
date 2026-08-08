import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} added to cart!`)
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 right-3 bg-saffron-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-saffron-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-saffron-400 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-gray-900">&#8377;{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through ml-2">&#8377;{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="bg-saffron-500 hover:bg-saffron-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}
