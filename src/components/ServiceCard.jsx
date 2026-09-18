import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ServiceCard({ service }) {
  const { addItem } = useCart()

  const handleBook = () => {
    addItem(service)
    toast.success(`${service.name} booked!`)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">{service.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">&#8377;{service.price.toLocaleString('en-IN')}</span>
          <button
            onClick={handleBook}
            className="bg-maroon-500 hover:bg-maroon-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
