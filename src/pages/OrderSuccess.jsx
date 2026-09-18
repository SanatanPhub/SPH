import { Link, useLocation } from 'react-router-dom'

export default function OrderSuccess() {
  const { state } = useLocation()
  const orderId = state?.orderId

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md mx-auto">
        <p className="text-6xl mb-4">🎉</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-gray-500 mt-3">
          Thank you for your purchase. We will prepare and ship your order soon.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mt-2">Payment ID: {orderId}</p>
        )}

        <div className="bg-saffron-50 rounded-xl p-6 mt-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>1. You will receive an order confirmation email</li>
            <li>2. We will energize your products with Vedic mantras</li>
            <li>3. Your order will be shipped within 2-3 business days</li>
            <li>4. You will receive tracking details via WhatsApp/SMS</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/products"
            className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
