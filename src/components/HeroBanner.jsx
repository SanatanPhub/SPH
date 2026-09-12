import { Link } from 'react-router-dom'

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-saffron-600 via-saffron-500 to-saffron-400 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-[200px] leading-none select-none">🕉</div>
        <div className="absolute bottom-10 right-10 text-[150px] leading-none select-none">🪷</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <img src="/favicon.svg" alt="SPH Logo" className="h-20 w-20 mx-auto drop-shadow-lg" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Sanatan Pooja Hub
          </h1>
          <p className="text-saffron-100 text-lg md:text-xl mt-2 font-light">
            Your Sacred Destination for Spiritual Products & Services
          </p>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
            Discover authentic crystal rakhis, healing bracelets, sacred Rudraksha, and expert consultation services for your spiritual journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/products"
              className="bg-white text-saffron-600 font-semibold px-8 py-3 rounded-full hover:bg-saffron-50 transition-colors shadow-lg"
            >
              Shop Products
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Book Consultation
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { num: '500+', label: 'Products' },
              { num: '50+', label: 'Expert Consultants' },
              { num: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-sm text-saffron-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" fill="none">
        <path d="M0 60L1440 60L1440 0C1440 0 1080 40 720 40C360 40 0 0 0 0L0 60Z" fill="#fffbf5" />
      </svg>
    </section>
  )
}
