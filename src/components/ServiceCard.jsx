import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ServiceCard({ service }) {
  const { addItem } = useCart()

  const handleBook = () => {
    addItem(service)
    toast.success(`${service.name} booked!`)
  }

  const discount = Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="text-3xl">{service.icon}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {service.duration}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>

        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-saffron-400 text-sm">{'★'.repeat(Math.floor(service.rating))}</div>
          <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {service.features.map((f, i) => (
            <span key={i} className="text-xs bg-saffron-50 text-saffron-700 px-2 py-1 rounded-full">{f}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-gray-900">&#8377;{service.price}</span>
            <span className="text-sm text-gray-400 line-through ml-2">&#8377;{service.originalPrice}</span>
            <span className="text-xs text-green-600 font-medium ml-2">{discount}% off</span>
          </div>
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
