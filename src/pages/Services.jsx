import ServiceCard from '../components/ServiceCard'
import { services } from '../data/products'

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Consultation Services</h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Connect with our expert consultants for personalized spiritual guidance. All sessions are conducted online via video call.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* How it works */}
      <section className="mt-16 bg-saffron-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Book a Session', desc: 'Choose your consultation type and book a convenient time slot.' },
            { step: '2', title: 'Share Details', desc: 'Provide your birth details and specific questions for the session.' },
            { step: '3', title: 'Get Guidance', desc: 'Connect with our expert via video call and receive personalized advice.' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-saffron-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mt-4">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
