export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <img src="/favicon.svg" alt="SPH Logo" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">About Sanatan Pooja Hub</h1>
          <p className="text-gray-500 mt-2">Preserving ancient wisdom, serving modern seekers</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-saffron-50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At Sanatan Pooja Hub, we are dedicated to making authentic spiritual products and expert guidance accessible to everyone.
              We believe that the ancient wisdom of Sanatan Dharma has the power to transform lives, and we are committed to bringing
              these sacred traditions to your doorstep.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">🔬 Certified Products</h3>
              <p className="text-sm text-gray-600">
                Every crystal, Rudraksha, and spiritual product is lab-tested and certified for authenticity.
                We source directly from trusted suppliers.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">🙏 Energized with Mantras</h3>
              <p className="text-sm text-gray-600">
                All our products are energized with proper Vedic mantras and rituals before shipping,
                ensuring you receive maximum spiritual benefits.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">👨‍🏫 Expert Consultants</h3>
              <p className="text-sm text-gray-600">
                Our team includes experienced astrologers, Vastu experts, tarot readers, and Rudraksha specialists
                with years of practice.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">💝 Customer First</h3>
              <p className="text-sm text-gray-600">
                With a 4.9-star rating, we prioritize your satisfaction and
                spiritual growth above everything.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Connect With Us</h2>
            <p className="text-saffron-100 mb-4">Have questions? We would love to help you on your spiritual journey.</p>
            <a href="mailto:info@sanatanpoojahub.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-saffron-600 font-semibold px-6 py-2 rounded-full hover:bg-saffron-50 transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
