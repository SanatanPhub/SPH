import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import ServiceCard from '../components/ServiceCard'
import { categories } from '../data/products'
import { useProducts, useServices } from '../lib/useProducts'

export default function Home() {
  const { products } = useProducts()
  const { services } = useServices()
  const featuredProducts = products.filter(p => p.featured)

  return (
    <div>
      <HeroBanner />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 mt-2">Explore our curated collection of sacred products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative rounded-xl overflow-hidden aspect-square"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-white font-semibold mt-1">{cat.name}</h3>
                <p className="text-white/70 text-xs mt-1 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Handpicked spiritual treasures for you</p>
            </div>
            <Link to="/products" className="text-saffron-600 hover:text-saffron-700 font-medium text-sm">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Consultation Services</h2>
          <p className="text-gray-500 mt-2">Expert guidance for your spiritual journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(0, 4).map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/services" className="inline-block bg-maroon-500 hover:bg-maroon-600 text-white font-medium px-8 py-3 rounded-full transition-colors">
            View All Services
          </Link>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-saffron-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🔒', title: 'Secure Payment', desc: '100% safe transactions' },
              { icon: '📦', title: 'Free Shipping', desc: 'On orders above ₹499' },
              { icon: '✅', title: 'Certified Products', desc: 'Lab tested & authentic' },
              { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
