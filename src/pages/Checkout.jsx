import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const shipping = totalPrice >= 499 ? 0 : 49
  const grandTotal = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add products before checking out.</p>
        <Link to="/products" className="inline-block mt-6 bg-saffron-500 hover:bg-saffron-600 text-white font-medium px-8 py-3 rounded-full transition-colors">
          Browse Products
        </Link>
      </div>
    )
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const loaded = await loadRazorpay()
    if (!loaded) {
      toast.error('Payment gateway failed to load. Please try again.')
      setProcessing(false)
      return
    }

    // Step 1: Create order on backend
    let orderData
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal * 100,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      })
      orderData = await res.json()
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order')
    } catch (err) {
      toast.error(err.message || 'Could not create order. Please try again.')
      setProcessing(false)
      return
    }

    // Step 2: Open Razorpay checkout modal
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.order_id,
      name: 'Sanatan Pooja Hub',
      description: `Order of ${items.length} item(s)`,
      prefill: {
        name: info.name,
        email: info.email,
        contact: info.phone,
      },
      theme: { color: '#e8860c' },
      handler: async (response) => {
        // Step 3: Verify payment signature on backend
        try {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          const verifyData = await verifyRes.json()

          if (!verifyData.verified) {
            toast.error('Payment verification failed. Contact support if amount was deducted.')
            setProcessing(false)
            return
          }
        } catch {
          toast.error('Payment verification failed. Contact support.')
          setProcessing(false)
          return
        }

        // Step 4: Save order to Supabase
        if (supabase) {
          const order = {
            customer_name: info.name,
            customer_email: info.email,
            customer_phone: info.phone,
            shipping_address: `${info.address}, ${info.city}, ${info.state} - ${info.pincode}`,
            items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
            total_amount: grandTotal,
            status: 'paid',
            razorpay_payment_id: response.razorpay_payment_id,
          }
          const { error } = await supabase.from('orders').insert([order])
          if (error) console.error('Order save error:', error)
        }

        clearCart()
        toast.success('Payment successful!')
        navigate('/order-success', { state: { orderId: response.razorpay_payment_id } })
      },
      modal: {
        ondismiss: () => {
          setProcessing(false)
          toast.error('Payment cancelled')
        },
      },
    }

    try {
      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', (response) => {
        setProcessing(false)
        toast.error(response.error?.description || 'Payment failed. Please try again.')
      })
      razorpay.open()
    } catch {
      setProcessing(false)
      toast.error('Could not open payment gateway. Please try again.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handlePayment} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={info.name}
                    onChange={e => setInfo({ ...info, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={info.phone}
                    onChange={e => setInfo({ ...info, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={info.email}
                  onChange={e => setInfo({ ...info, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  required
                  rows={2}
                  value={info.address}
                  onChange={e => setInfo({ ...info, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent resize-none"
                  placeholder="House/Flat number, Street, Landmark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={info.city}
                    onChange={e => setInfo({ ...info, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={info.state}
                    onChange={e => setInfo({ ...info, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    value={info.pincode}
                    onChange={e => setInfo({ ...info, pincode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors cursor-pointer text-lg"
          >
            {processing ? 'Processing...' : `Pay ₹${grandTotal}`}
          </button>
        </form>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">&#8377;{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">&#8377;{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping}`}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">&#8377;{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
