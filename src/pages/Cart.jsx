import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Explore our products and add something sacred to your cart.</p>
        <Link to="/products" className="inline-block mt-6 bg-saffron-500 hover:bg-saffron-600 text-white font-medium px-8 py-3 rounded-full transition-colors">
          Browse Products
        </Link>
      </div>
    )
  }

  const shipping = totalPrice >= 499 ? 0 : 49
  const grandTotal = totalPrice + shipping

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900 mt-1">&#8377;{item.price}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.id)
                      toast.success('Item removed from cart')
                    }}
                    className="text-red-500 text-sm hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">&#8377;{item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              clearCart()
              toast.success('Cart cleared')
            }}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">&#8377;{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-saffron-600">Add &#8377;{499 - totalPrice} more for free shipping</p>
              )}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">&#8377;{grandTotal}</span>
              </div>
            </div>

            <button className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-semibold py-3 rounded-lg mt-6 transition-colors cursor-pointer">
              Proceed to Checkout
            </button>

            <Link to="/products" className="block text-center text-sm text-saffron-600 hover:underline mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
